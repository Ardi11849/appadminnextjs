'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/Header'
import { Users, columns } from "../components/table/columns"
import { DataTable } from '../components/table/Table';
import Modal from '../components/Modal';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '../../../lib/fontawesome';
import { Api } from '../midleware/Api';
import { apis } from '../../middleware/apis';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch } from 'react-redux';
import { motion } from "framer-motion";
const MySwal = withReactContent(Swal)

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState('save');
  const [id, setId] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    perusahaan: '',
    alamatperusahaan: '',
    active: ''
  });

  const datas = {
    method: 'post',
    url: 'login',
    data: {
      email: "loker.superadmin@digy.com",
      password: "12345678"
    }
  }

  // const dispatch = useDispatch();
  useEffect(() => {
    console.log('1');
    apis(datas)

  }, [100])

  const handleInputChange = (event: any) => {
    try {
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
      MySwal.fire(
        'Saved!',
        'Your file has been saved.',
        'success'
      )
      closeModal(); // Close the modal
    } else if (action == 'update') {
      MySwal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          updateData(formData)
          MySwal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          MySwal.fire('Changes are not saved', '', 'info')
        }
        closeModal(); // Close the modal
      })
    } else {
      MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteData()
          MySwal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          closeModal(); // Close the modal
        }
      })
    }
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
      alamatperusahaan: '',
      active: ''
    })
    setIsModalOpen(false);
    setRefresh(!refresh);
  };

  const result = Api;

  const saveData = (data: any) => {
    Api.push(
      {
        id: '"' + Math.random() + '"',
        username: data.username,
        perusahaan: data.perusahaan,
        alamatperusahaan: data.alamatperusahaan,
        active: parseInt(data.active),
        createdAt: format(new Date(), 'dd-MMM-yyyy H:I:s'),
        updatedAt: format(new Date(), 'dd-MMM-yyyy H:I:s')
      }
    )
    console.log(Api);
  }

  const updateData = (data: any) => {
    Api[id].id = '"' + Math.random() + '"';
    Api[id].username = data.username;
    Api[id].perusahaan = data.perusahaan;
    Api[id].alamatperusahaan = data.alamatperusahaan;
    Api[id].active = parseInt(data.active);
    Api[id].updatedAt = format(new Date(), 'dd-MMM-yyyy H:I:s')
    console.log(Api);
  }

  const deleteData = () => {

    Api.splice(id, 1);
    console.log(Api);
  }

  return (
    <main className="flex min-h-screen bg-gray-300 flex-col">
      <Header title='Users' url='test' />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <div className='px-8 py-8'>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
            <div className="p-5">
              <button className='p-2 text-white rounded-lg bg-blue-500 border hover:bg-blue-700' onClick={openModal}>
                <FontAwesomeIcon className='w-4 h-4' icon='plus-square' />
                <span className="pl-2">Tambah Data</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <Modal isOpen={isModalOpen} onClose={closeModal} handleInputChange={handleInputChange} formData={formData} handleSave={handleSave} action={action} />
              <DataTable columns={columns} data={result} openModal2={openModal2} handleInputChange={handleInputChange} refresh={refresh} />
            </div>
          </div>
        </div>
      </motion.div>
    </main >
  )
}