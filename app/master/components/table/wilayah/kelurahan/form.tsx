'use client';

import { FontAwesomeIcon } from '../../../../../../lib/fontawesome';
import { getWilayahKecamatan } from '../../../../midleware/Api';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { deleteWilayahKelurahan, updateWilayahKelurahan, getWilayahKelurahanById, createWilayahKelurahan } from '../../../../midleware/Api';
import Select from 'react-select';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)
interface modalProps {
    openForm: boolean,
    onClose: any,
    action: string,
    code_kelurahan: string,
}

const Form = ({ openForm, onClose, action, code_kelurahan }: modalProps) => {
    const [dataKecamatan, setDataKecamatan] = useState([{
        value: "",
        label: "Pilih Kecamatan"
    }]);
    const [formData, setFormData] = useState({
        code_kelurahan: '',
        name: '',
        parent_code_kecamatan: ''
    });
    const [panggil, setPanggil] = useState(1)

    const close = () => {
        setFormData({
            code_kelurahan: '',
            name: '',
            parent_code_kecamatan: ''
        });
        setDataKecamatan([{
            value: "",
            label: "Pilih Kecamatan"
        }])
        onClose();
        setPanggil(1);
    }

    const handleSave = async () => {
        if (action == 'insert') {
            const result = await createWilayahKelurahan(formData)
            const message = result.response.data.message != undefined ? result.response.data.message : JSON.stringify(result.response.data.error.results.errors[0].message);
            console.log(message);
            if (result.response.data.code >= 200 && result.response.data.code < 300) {
                MySwal.fire(
                    'Saved!',
                    message,
                    'success'
                )
                close()
            } else {
                MySwal.fire('Failed To Save', message, 'info')
            }
        } else if (action == 'update') {
            MySwal.fire({
                title: 'Do you want to save the changes?',
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const result = await updateWilayahKelurahan(formData)

                    if (result.data != undefined) {
                        const message = result.data.message;
                        MySwal.fire(
                            'Saved!',
                            message,
                            'success'
                        )
                        close()
                    }
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        } else {
            MySwal.fire({
                title: 'Do you want to Delete the changes?',
                showCancelButton: true,
                confirmButtonText: 'Delete',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const result = await deleteWilayahKelurahan(formData)
                    console.log(result);
                    
                    if (result.data != undefined) {
                        const message = result.data.message;
                        MySwal.fire(
                            'Deleted!',
                            message,
                            'success'
                        )
                        close()
                    } else {
                        const message = result.data.message;
                        MySwal.fire('Failed To Delete', message, 'info')
                    }
                } else if (result.isDenied) {
                    Swal.fire('Changes are not Deleted', '', 'info')
                }
            })
        }
    };

    let fetchKecamatan = async () => {

        const response = await getWilayahKecamatan(1, 100);
        const json = response.data.data;
        json.map((object: any) => {
            setDataKecamatan((data) => [
                ...data,
                {
                    value: object.code_kecamatan,
                    label: object.name
                }
            ])
        })
        console.log(response.data.data);
    };

    const get_kelurahan = async () => {
        const response = await getWilayahKelurahanById(code_kelurahan);
        console.log(response.data);

        if (response.data == null) {
            setFormData({
                code_kelurahan: '',
                name: '',
                parent_code_kecamatan: ''
            });
        } else {
            setFormData({
                code_kelurahan: response.data.data.code_kelurahan,
                name: response.data.data.name,
                parent_code_kecamatan: response.data.data.parent_code_kecamatan
            });
        }
    }

    if (openForm == true && panggil == 1) {
        fetchKecamatan()
        if (action != "insert") {
            get_kelurahan()
        }
        setPanggil(0);
    }

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop transition-opacity duration-300 ${openForm ? 'show' : 'hide'}`}>
            <div className="bg-gray-300 text-black w-1/3 rounded-lg p-6 shadow-lg">
                <div className="grid">
                    <div className="col py-3">
                        <p className="font-bold">Tambah Data</p>
                        <hr />
                    </div>
                    <div className="col py-3">
                        <form>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Kode Kelurahan</span>
                                {
                                    action == 'insert' ? (
                                        <input
                                            type="text"
                                            id='code_kelurahan'
                                            name='code_kelurahan'
                                            value={formData.code_kelurahan}
                                            onChange={(e) => setFormData((prevData) => ({ ...prevData, code_kelurahan: e.target.value }))}
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                                    ) : (
                                        <>
                                            <input
                                                type="hidden"
                                                id='code_kelurahan'
                                                name='code_kelurahan'
                                                value={formData.code_kelurahan}
                                                onChange={(e) => setFormData((prevData) => ({ ...prevData, code_kelurahan: e.target.value }))}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                                            <span>{formData.code_kelurahan}</span>
                                        </>
                                    )
                                }
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Nama Kelurahan</span>
                                <input
                                    type="text"
                                    id='Name'
                                    name='Name'
                                    value={formData.name}
                                    onChange={(e) => setFormData((prevData) => ({ ...prevData, name: e.target.value.toLocaleUpperCase() }))}
                                    className="uppercase mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Kecamatan</span>
                                <Select
                                    instanceId='3'
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={
                                        dataKecamatan.filter(option => option.value === formData.parent_code_kecamatan)
                                    }
                                    defaultValue={dataKecamatan[0]}
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={true}
                                    name="color"
                                    options={dataKecamatan}
                                    onChange={(e) =>
                                        //@ts-ignore
                                        setFormData((prevData) => ({ ...prevData, parent_code_kecamatan: e.value }))
                                    }
                                />
                            </label>
                        </form>
                    </div>
                    <div className="col py-3">
                        <hr />
                        {
                            action == 'insert' ? (
                                <Button onClick={() => { handleSave() }} className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                                    <FontAwesomeIcon className='w-4 h-4' icon='save' />
                                    <span className="pl-2">Simpan</span>
                                </Button>
                            ) : action == 'update' ? (
                                <Button onClick={() => { handleSave() }} className="mt-4 bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500">
                                    <FontAwesomeIcon className='w-4 h-4' icon='pen-to-square' />
                                    <span className="pl-2">Ubah</span>
                                </Button>
                            ) : (
                                <Button onClick={() => { handleSave() }} className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                                    <FontAwesomeIcon className='w-4 h-4' icon='trash' />
                                    <span className="pl-2">Hapus</span>
                                </Button>
                            )
                        }

                        <Button onClick={() => close()} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 float-right">
                            <FontAwesomeIcon className='w-4 h-4' icon='close' /> Batal
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;