// components/Table.js
'use client'


import { FontAwesomeIcon } from '../../../../utils/fontawesome';
import $ from 'jquery';

interface TableProps {
  data: any[];
  openModal: any;
  handleInputChange: any;
}

const Table = ({ data, openModal,  handleInputChange }: TableProps) => {

  const update = (id: any) => {
    const datas = $("#"+id).data('datas');
    handleInputChange(datas);
    openModal('update', id);
  };

  const hapus = (id: any) => {
    openModal('delete', id);
  };


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
          <tr className="bg-white" key={ item.id }>
            <td className="p-3 text-gray-600 border border-gray-300">{index + 1}</td>
            <td className="p-3 text-gray-600 border border-gray-300">{item.username}</td>
            <td className="p-3 text-gray-600 border border-gray-300">{item.perusahaan}</td>
            <td className="p-3 text-gray-600 border border-gray-300">{item.alamatperusahaan}</td>
            <td className="p-3 text-gray-600 border border-gray-300">{item.active == 1 ? 'Active' : 'Tidak Aktif'}</td>
            <td className="p-3 text-gray-600 border border-gray-300">{item.createdAt}</td>
            <td className="p-3 text-gray-600 border border-gray-300">
              <button className="mt-4 bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500" id={index.toString()} onClick={()=>update(index)} data-datas={JSON.stringify(item)}>
                <FontAwesomeIcon className='w-4 h-4' icon='pen-to-square' />
              </button>
              <button className="float-right mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700" id={index.toString()} onClick={()=>hapus(index)}>
                <FontAwesomeIcon className='w-4 h-4' icon='trash' />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;