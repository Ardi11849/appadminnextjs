"use client"

import { useState } from 'react';
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
import { FontAwesomeIcon } from '../../../../lib/fontawesome';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"


import $ from 'jquery';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  openModal2: any
  handleInputChange: any
  refresh: any
}

export function DataTable<TData, TValue>({
  columns,
  data,
  openModal2,
  handleInputChange,
  refresh
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
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


  const action = (id: string, dari: string) => {
    if (dari == 'update') {
      openModal2('update', id);
    } else {
      openModal2('delete', id);
    }
    const datas = $("#" + id).data('datas');
    handleInputChange(datas);
  };

  return (
    <div>
      <div className="rounded-md stripped border">
        <Table>
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
                    {+row.id + 1}
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <button
          className={`bg-blue-100 text-black py-2 px-4 rounded-md ${!table.getCanPreviousPage() ? 'hide' : ' hover:text-blue-500'}`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <FontAwesomeIcon className='w-4 h-4' icon='left-long' />
          <span className="pl-2">Previous</span>
        </button>
        <button
          className={`bg-blue-100 text-black py-2 px-4 rounded-md ${!table.getCanNextPage() ? 'hide' : ' hover:text-blue-500'}`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <FontAwesomeIcon className='w-4 h-4' icon='right-long' />
          <span className="pl-2">Next</span>

        </button>
      </div>
    </div>
  )
}