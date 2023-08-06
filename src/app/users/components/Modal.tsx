'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../utils/fontawesome';

interface modalProps {
    isOpen: any,
    onClose: any,
    onSave: any
}

const Modal = ({ isOpen, onClose, onSave }: modalProps) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        perusahaan: '',
        alamatPerusahaan: '',
        active: ''
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSave = () => {
      onSave(formData); // Pass the data to the parent component
      onClose(); // Close the modal
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop transition-opacity duration-300 ${isOpen ? 'show' : 'hide'}`}>
            <div className="bg-white text-black w-1/3 rounded-lg p-6 shadow-lg">
                <div className="grid">
                    <div className="col py-3">
                        <p className="font-bold">Tambah Data</p>
                        <hr />
                    </div>
                    <div className="col py-3">
                        <form>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Username</span>
                                <input type="text" name='username' value={formData.username} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Password</span>
                                <input type="password" name='password' value={formData.password} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Perusahaan</span>
                                <input type="text" name='perusahaan' value={formData.perusahaan} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Alamat Perusahaan</span>
                                <input type="text" name='alamatPerusahaan' value={formData.alamatPerusahaan} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Active</span>
                                <input type="text" name='active' value={formData.active} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                        </form>
                    </div>
                    <div className="col py-3">
                        <hr />
                        <button onClick={handleSave} className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                            <FontAwesomeIcon className='w-4 h-4' icon='save' /> Simpan
                        </button>
                        <button onClick={onClose} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 float-right">
                            <FontAwesomeIcon className='w-4 h-4' icon='close' /> Batal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;