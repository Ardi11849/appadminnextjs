import { useEffect, useState } from 'react';
import { getWilayahKelurahan } from '../../../../midleware/Api';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FontAwesomeIcon } from '../../../../../../lib/fontawesome';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from '@/components/ui/button';
import { stagger, useAnimate } from 'framer-motion';
import Form from './form';
const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

interface tableKelurahanProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    showHideTableKelurahan: boolean,
    closeTable: any
}
const TabelKelurahan = <TData, TValue>({ columns, showHideTableKelurahan, closeTable }: tableKelurahanProps<TData, TValue>) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [sorting, setSorting] = useState<SortingState>([])
    const [scope, animate] = useAnimate();
    const [openForm, setOpenForm] = useState(false)
    const [panggil, setPanggil] = useState(1)
    const [search, setSearch] = useState('')

    useEffect(() => {
        animate(
            ".content",
            {
                clipPath: showHideTableKelurahan
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)"
            },
            {
                type: "spring",
                bounce: 0,
                duration: 1
            }
        );

        animate(
            ".table",
            showHideTableKelurahan
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 1,
                delay: showHideTableKelurahan ? staggerMenuItems : 0
            }
        );
    }, [showHideTableKelurahan]);

    useEffect(() => {
        if (showHideTableKelurahan == true) {
            fetchKelurahan();
        }
    }, [perPage]);

    useEffect(() => {
        if (showHideTableKelurahan == true) {
            const delay = setTimeout(() => {
                fetchKelurahan();
            }, 1000);
            return () => clearTimeout(delay)
        }
    }, [search]);

    let fetchKelurahan = async () => {
        setPanggil(0)
        setLoading(true);

        const response = await getWilayahKelurahan(page, perPage, search);
        if (response.data == null) {
            setData([]);
        } else {
            setData(response.data.data);
            setTotalRows(response.data.total);
            setLoading(false);
        }
    };

    if (showHideTableKelurahan == true && panggil == 1) {
        fetchKelurahan();
    }

    let handlePerRowsChange = async () => {
        console.log(1);

        setLoading(true);

        const response = await getWilayahKelurahan(page, perPage, search);
        setData(response.data.data);
        setLoading(false);
    };


    const action = (id: string, dari: string) => {
        // if (dari == 'update') {
        //   openModal2('update', id);
        // } else {
        //   openModal2('delete', id);
        // }
        // const datas = $("#" + id).data('datas');
        // handleInputChange(datas);
    };

    const changePerPage = (value: any) => {
        setPerPage(value);
        table.setPageSize(value);
    }

    const kembali = () => {
        closeTable()
    }

    const form = () => {
        setOpenForm(true)
    }

    let table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    return (
        <div className={`px-8 py-8 ${showHideTableKelurahan == true ? 'show' : 'hide'}`} ref={scope}>
            <div className={`content bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out`}>
                <div className="p-5">
                    <div className="mx-auto flex items-center justify-between">
                        <button onClick={form} className='p-2 text-white rounded-lg bg-blue-500 border hover:bg-blue-700'>
                            <FontAwesomeIcon className='w-4 h-4' icon='plus-square' />
                            <span className="pl-2">Tambah Data</span>
                        </button>
                        <nav className="space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="py-2 pl-10 pr-4 text-black border rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <FontAwesomeIcon
                                    icon="search"
                                    className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                                />
                            </div>
                        </nav>
                    </div>
                </div>
                <Table className='table'>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                <TableHead>
                                    No
                                </TableHead>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    <TableCell key='no'>
                                        {(+row.id + 1) + (page * perPage) - perPage}
                                    </TableCell>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                    {/* Dropdown */}
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    onClick={() => navigator.clipboard.writeText(JSON.stringify(row))}
                                                >
                                                    <button className="bg-white-400 text-black py-2 px-4 rounded-md hover:text-blue-500" id={row.id.toString()} onClick={() => action(row.id.toString(), 'update')} data-datas={JSON.stringify(row.original)}>
                                                        <FontAwesomeIcon className='w-4 h-4' icon='pen-to-square' />
                                                        <span className="pl-2">Update</span>
                                                    </button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => navigator.clipboard.writeText(JSON.stringify(row))}
                                                >
                                                    <button className="bg-white-600 text-black py-2 px-4 rounded-md hover:text-blue-500" id={row.id.toString()} onClick={() => action(row.id.toString(), 'hapus')}>
                                                        <FontAwesomeIcon className='w-4 h-4' icon='trash' />
                                                        <span className="pl-2">Delete</span>
                                                    </button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between px-2">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {table.getFilteredRowModel().rows.length} rows.
                    </div>
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium">Rows per page</p>
                            <select onChange={e => changePerPage(e.target.value)} value={perPage}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="80">80</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                            Page {page}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => { setPage(1), handlePerRowsChange() }}
                                disabled={page == 1}
                            >
                                <span className="sr-only">Go to first page</span>
                                <FontAwesomeIcon className='w-4 h-4' icon='angles-left' />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => { setPage(page - 1), handlePerRowsChange() }}
                                disabled={page == 1}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <FontAwesomeIcon className='w-4 h-4' icon='chevron-left' />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => { setPage(page + 1), handlePerRowsChange() }}
                            >
                                <span className="sr-only">Go to next page</span>
                                <FontAwesomeIcon className='w-4 h-4' icon='chevron-right' />
                            </Button>
                            {/* <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => { setPage(table.getPageCount() - 1), handlePerRowsChange() }}
                            >
                                <span className="sr-only">Go to last page</span>
                                <FontAwesomeIcon className='w-4 h-4' icon='angles-right' />
                            </Button> */}
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    <button onClick={kembali} className='p-2 text-white rounded-lg bg-gray-500 border hover:bg-gray-700'>
                        <FontAwesomeIcon className='w-4 h-4' icon='arrow-left' />
                        <span className="pl-2">Kembali Ke Menu Master</span>
                    </button>
                </div>
            </div>
            <Form openForm={openForm} />
        </div>
    );
};

export default TabelKelurahan