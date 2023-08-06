// components/Table.js
'use client'
interface TableProps {
    data: any[];
}

const Table = ({ data }: TableProps) => {
    return (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-3 font-semibold uppercase bg-gray-100 text-gray-600 border border-gray-300">
                No
              </th>
              <th className="p-3 font-semibold uppercase bg-gray-100 text-gray-600 border border-gray-300">
                Username
              </th>
              <th className="p-3 font-semibold uppercase bg-gray-100 text-gray-600 border border-gray-300">
                Perusahaan
              </th>
              <th className="p-3 font-semibold uppercase bg-gray-100 text-gray-600 border border-gray-300">
                Alamat Perusahaan
              </th>
              <th className="p-3 font-semibold uppercase bg-gray-100 text-gray-600 border border-gray-300">
                Active
              </th>
              <th className="p-3 font-semibold uppercase bg-gray-100 text-gray-600 border border-gray-300">
                Tanggal Pembuatan
              </th>
              <th className="p-3 font-semibold uppercase bg-gray-100 text-gray-600 border border-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="bg-white">
                <td className="p-3 text-gray-600 border border-gray-300">{index + 1}</td>
                <td className="p-3 text-gray-600 border border-gray-300">{item.username}</td>
                <td className="p-3 text-gray-600 border border-gray-300">{item.perusahaan}</td>
                <td className="p-3 text-gray-600 border border-gray-300">{item.alamat_perusahaan}</td>
                <td className="p-3 text-gray-600 border border-gray-300">{item.active == 1 ? 'Active' : 'Tidak Aktif'}</td>
                <td className="p-3 text-gray-600 border border-gray-300">{item.createdAt}</td>
                <td className="p-3 text-gray-600 border border-gray-300">Data 3</td>
              </tr>
            ))}
          </tbody>
        </table>
    );
};

export default Table;