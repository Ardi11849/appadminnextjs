'use client';

import { FontAwesomeIcon } from '../../../../../../lib/fontawesome';
import { getWilayahKecamatan } from '../../../../midleware/Api';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import Select from 'react-select';
interface modalProps {
    openForm: boolean,
}

const Form = ({ openForm }: modalProps) => {
    const [dataKecamatan, setDataKecamatan] = useState([{
        value: "",
        label: "Pilih Kecamatan"
    }]);
    const [formData, setFormData] = useState({
        code_kelurahan: '',
        name_kelurahan: '',
        kecamatan: ''
    });
    const [panggil, setPanggil] = useState(1)

    let fetchUsers = async () => {

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
        setPanggil(0);
        console.log(response.data.data);
    };

    if (openForm == true && panggil == 1) {
        fetchUsers();
    }
    const id = Date.now().toString();
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
                                <input
                                    type="text"
                                    id='code_kelurahan'
                                    name='code_kelurahan'
                                    value={formData.code_kelurahan}
                                    onChange={(e) => setFormData((prevData) => ({ ...prevData, code_kelurahan: e.target.value }))}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Nama Kelurahan</span>
                                <input
                                    type="text"
                                    id='name_kelurahan'
                                    name='name_kelurahan'
                                    value={formData.name_kelurahan}
                                    onChange={(e) => setFormData((prevData) => ({ ...prevData, name_kelurahan: e.target.value }))}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Kecamatan</span>
                                <Select
                                    instanceId = '3'
                                    className="basic-single"
                                    classNamePrefix="select"
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
                                    setFormData((prevData) => ({ ...prevData, kecamatan: e.value }))
                                    }
                                />
                            </label>
                        </form>
                    </div>
                    <div className="col py-3">
                        <hr />
                        {/* {
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
                        } */}

                        {/* <Button onClick={onClose} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 float-right">
                            <FontAwesomeIcon className='w-4 h-4' icon='close' /> Batal
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;