import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { getWilayahKelurahan } from '../../../../midleware/Api';
interface DataRow {
    id: number;
    name: string;
    Kecamatan: any;
    Kabupaten: any;
    Provinsi: any;
    Negara: any;
}

const columns: TableColumn<DataRow>[] = [
    {
        name: 'Kelurahan',
        selector: row => row.name,
        sortable: true,
        sortField: 'Kelurahan',
    },
    {
        name: 'Kecamatan',
        selector: row => row.Kecamatan.name,
        sortable: true,
        sortField: 'Kecamatan',
    },
    {
        name: 'Kabupaten',
        selector: row => row.Kecamatan.Kabupaten.name,
        sortable: true,
        sortField: 'Kabupaten',
    },
    {
        name: 'Provinsi',
        selector: row => row.Kecamatan.Kabupaten.Provinsi.name,
        sortable: true,
        sortField: 'Provinsi',
    },
    {
        name: 'Negara',
        selector: row => row.Kecamatan.Kabupaten.Provinsi.Negara.name,
        sortable: true,
        sortField: 'Negara',
    },
];

const TabelKelurahan = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const fetchUsers = async (page: number) => {
        setLoading(true);

        const response = await getWilayahKelurahan(page, perPage);
        console.log(response.data.data);

        setData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = (page: number) => {
        fetchUsers(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setLoading(true);

        const response = await getWilayahKelurahan(page, perPage);

        setData(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(1); // fetch page 1 of users

    }, []);

    // const handleSort = (column: any, sortDirection: any) => {
    // 	// simulate server sort
    // 	console.log(column, sortDirection);
    // 	setLoading(true);

    // 	// instead of setTimeout this is where you would handle your API call.
    // 	// setTimeout(() => {
    // 		// setData(orderBy(data, column.sortField, sortDirection));
    // 	// 	setLoading(false);
    // 	// }, 100);
    // };


    return (
        <div className={`px-8 py-8`}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
                <DataTable
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    // onSort={handleSort}
                    // className='table-auto border-spacing-10 border-collapse'
                />
            </div>
        </div>
    );
};

export default TabelKelurahan