'use client';

import { useState } from 'react';
import Header from '../../component/Header'
import Table from '../components/Table';
import Modal from '../components/Modal';
import { format } from 'date-fns';
import Api from '../midleware/Api';


export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState('save');
  const [id, setId] = useState(0);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    perusahaan: '',
    alamatPerusahaan: '',
    active: ''
  });

  const handleInputChange = (event: any) => {
    try {
      console.log(JSON.stringify(event));
      setFormData(event);
    } catch (error) {
      const { name, value } = event.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    if (action == 'save') {
      saveData(formData); // Pass the data to the parent component
    } else if (action == 'update') {
      updateData(formData)
    } else {
      deleteData()
    }
    closeModal(); // Close the modal
  };

  const openModal = () => {
    setAction('save');
    setIsModalOpen(true);
  };

  const openModal2 = (event: string, id: number) => {
    if (event != undefined) setAction(event);
    if (id != undefined) setId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setFormData({
      username: '',
      password: '',
      perusahaan: '',
      alamatPerusahaan: '',
      active: ''
    })
    setIsModalOpen(false);
  };

  const result = Api;

  const saveData = (data: any) => {
    Api.push(
      {
        id: Math.random(),
        username: data.username,
        perusahaan: data.perusahaan,
        alamatperusahaan: data.alamatperusahaan,
        active: parseInt(data.active),
        createdAt: format(new Date(), 'dd-MMM-yyyy H:I:s')
      }
    )
  }

  const updateData = (data: any) => {
    console.log(id);

    Api[id].id = Math.random();
    Api[id].username = data.username;
    Api[id].perusahaan = data.perusahaan;
    Api[id].alamatperusahaan = data.alamatperusahaan;
    Api[id].active = parseInt(data.active);
    Api[id].createdAt = format(new Date(), 'dd-MMM-yyyy H:I:s')
  }

  const deleteData = () => {
    
    Api.splice(id, 1);
    console.log(Api);
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
            <Modal isOpen={isModalOpen} onClose={closeModal} handleInputChange={handleInputChange} formData={formData} handleSave={handleSave} action={action} />
            <Table data={result} openModal={openModal2} handleInputChange={handleInputChange} />
          </div>
        </div>
      </div>
    </main>
  )
}