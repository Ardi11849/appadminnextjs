'use client';

import { useState } from 'react';
import Header from '../../component/Header'
import Table from '../components/Table';
import Modal from '../components/Modal';
import { format } from 'date-fns';
import Api from '../midleware/Api';


export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tanggal = new Date();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const result = Api;

  // interface save {
  //   data: any
  // }
  const saveData = (data: any ) => {
    console.log(data);
    Api.push(
      {
        id: 3,
        username: data.username,
        perusahaan: data.perusahaan,
        alamat_perusahaan: data.alamatPerusahaan,
        active: parseInt(data.active),
        createdAt: format(new Date(), 'dd-MMM-yyyy H:I:s')
      }
    )

    closeModal();
  }

  return (
    <main className="flex min-h-screen bg-gray-300 flex-col">
      <Header title='Users' url='test' />
      <div className='px-8 py-8'>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
          <div className="overflow-x-auto">
            <div className="flex p-5 float-right">
              <button type='button' className='p-2 text-white rounded-lg bg-blue-500 border hover:bg-blue-700' onClick={openModal}>
                <p className='text-sm font-bold float-right'>Tambah Data</p>
              </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} onSave={saveData} />
            <Table data={result} />
          </div>
        </div>
      </div>
    </main>
  )
}