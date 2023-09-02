'use client';

import { FontAwesomeIcon } from '../../../lib/fontawesome';
import { Button } from "@/components/ui/button";
interface modalProps {
    isOpen: boolean,
    onClose: any,
    handleInputChange: any,
    formData: any,
    handleSave: any,
    action: string
}

const Modal = ({ isOpen, onClose, handleInputChange, formData, handleSave, action }: modalProps) => {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop transition-opacity duration-300 ${isOpen ? 'show' : 'hide'}`}>
            <div className="bg-gray-300 text-black w-1/3 rounded-lg p-6 shadow-lg">
                <div className="grid">
                    <div className="col py-3">
                        <p className="font-bold">Tambah Data</p>
                        <hr />
                    </div>
                    <div className="col py-3">
                        <form>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Username</span>
                                <input type="text" id='username' name='username' value={formData.username} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Password</span>
                                <input type="password" id='password' name='password' value={formData.password} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Perusahaan</span>
                                <input type="text" id='perusahaan' name='perusahaan' value={formData.perusahaan} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Alamat Perusahaan</span>
                                <input type="text" id='alamatperusahaan' name='alamatperusahaan' value={formData.alamatperusahaan} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Active</span>
                                <input type="text" id='active' name='active' value={formData.active} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                        </form>
                    </div>
                    <div className="col py-3">
                        <hr />
                        {
                            action == 'save' ? (
                                <Button onClick={handleSave} className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                                    <FontAwesomeIcon className='w-4 h-4' icon='save' />
                                    <span className="pl-2">Simpan</span>
                                </Button>
                            ) : action == 'update' ? (
                                <Button onClick={handleSave} className="mt-4 bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500">
                                    <FontAwesomeIcon className='w-4 h-4' icon='pen-to-square' />
                                    <span className="pl-2">Ubah</span>
                                </Button>
                            ) : (
                                <Button onClick={handleSave} className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                                    <FontAwesomeIcon className='w-4 h-4' icon='trash' />
                                    <span className="pl-2">Hapus</span>
                                </Button>
                            )
                        }

                        <Button onClick={onClose} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 float-right">
                            <FontAwesomeIcon className='w-4 h-4' icon='close' /> Batal
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;