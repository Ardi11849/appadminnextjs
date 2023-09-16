'use client';

import { FontAwesomeIcon } from '../../../../../../lib/fontawesome';
import { getWilayahKabupaten } from '../../../../midleware/Api';
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from 'react';
import { deleteWilayahKecamatan, updateWilayahKecamatan, getWilayahKecamatanById, createWilayahKecamatan, getWilayahKabupatenById } from '../../../../midleware/Api';
import Select from 'react-select';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import $ from 'jquery';
const MySwal = withReactContent(Swal)
interface modalProps {
    openForm: boolean,
    onClose: any,
    action: string,
    code_kecamatan: string,
}

const Form = ({ openForm, onClose, action, code_kecamatan }: modalProps) => {
    const selectRef = useRef(null);
    const [dataKabupaten, setDataKabupaten] = useState([{
        value: "",
        label: "Pilih Kabupaten"
    }]);
    const [formData, setFormData] = useState({
        code_kecamatan: '',
        name: '',
        parent_code_kabupaten: ''
    });
    const [panggil, setPanggil] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (search != '') {
            const delay = setTimeout(() => {
                setDataKabupaten([{
                    value: "",
                    label: "Pilih Kabupaten"
                }])
                fetchKabupaten('null')
            }, 1000);
            return () => clearTimeout(delay)
        }
    }, [search]);

    const close = () => {
        setFormData({
            code_kecamatan: '',
            name: '',
            parent_code_kabupaten: ''
        });
        setDataKabupaten([{
            value: "",
            label: "Pilih Kabupaten"
        }])
        onClose();
        setPanggil(1);
    }

    const handleSave = async () => {
        if (action == 'insert') {
            const result = await createWilayahKecamatan(formData);
            console.log(result);
            
            const message = result.data.message != undefined ? result.data.message : JSON.stringify(result.data.error[0].message);
            if (result.data.code >= 200 && result.data.code < 300) {
                MySwal.fire(
                    'Saved!',
                    message,
                    'success'
                )
                close()
            } else {
                if (result.data.error[0].param == "ParentCodeKabupaten") {
                    //@ts-ignore
                    selectRef.current?.focus();
                } else {
                    console.log($("#"+result.data.error[0].param).trigger('focus'));
                    $("#"+result.data.error[0].param).trigger('focus');
                }
                MySwal.fire('Failed To Save', message, 'error')
            }
        } else if (action == 'update') {
            MySwal.fire({
                title: 'Do you want to save the changes?',
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const result = await updateWilayahKecamatan(formData)
                    const message = result.data.message != undefined ? result.data.message : JSON.stringify(result.data.error[0].message);
                    if (result.data.code >= 200 && result.data.code < 300) {
                        MySwal.fire(
                            'Saved!',
                            message,
                            'success'
                        )
                        close()
                    } else {
                        if (result.data.error[0].param == "ParentCodeKabupaten") {
                            //@ts-ignore
                            selectRef.current?.focus();
                        } else {                            
                            $("#"+result.data.error[0].param).trigger('focus');
                        }
                        MySwal.fire('Failed To Save', message, 'error')
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
                    const result = await deleteWilayahKecamatan(formData)
                    if (result.data.code >= 200 && result.data.code < 300) {
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

    let fetchKabupaten = async (id: string) => {
        let response = [];
        if (id != 'null' && id != undefined) {
            response = await getWilayahKabupatenById(id);
        } else {
            response = await getWilayahKabupaten(1, 100, search);
        }
        
        if (response.status >= 200 && response.status <= 299) {
            const json = response.data.data;
            if (Array.isArray(json)) {
                json.map((object: any) => {
                    setDataKabupaten((data) => [
                        ...data,
                        {
                            value: object.code_kabupaten,
                            label: object.name_kabupaten
                        }
                    ])
                });
            } else {
                setDataKabupaten((data) => [
                    ...data,
                    {
                        value: json.code_kabupaten,
                        label: json.name_kabupaten
                    }
                ])
            }
        } else {
            setDataKabupaten([{
                value: "",
                label: "Pilih Kabupaten"
            }])
        }
        setLoading(false);
    };

    const get_kecamatan = async () => {
        const response = await getWilayahKecamatanById(code_kecamatan);
        console.log(response.data);

        if (response.data == null) {
            setFormData({
                code_kecamatan: '',
                name: '',
                parent_code_kabupaten: ''
            });
        } else {
            setFormData({
                code_kecamatan: response.data.data.code_kecamatan,
                name: response.data.data.name,
                parent_code_kabupaten: response.data.data.parent_code_kabupaten
            });
            fetchKabupaten(response.data.data.parent_code_kabupaten);
        }
    }

    if (openForm == true && panggil == 1) {
        fetchKabupaten('null')
        if (action != "insert") {
            get_kecamatan();
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
                                <span className="block text-sm font-medium text-slate-700">Kode Kecamatan</span>
                                {
                                    action == 'insert' ? (
                                        <input
                                            type="text"
                                            id="CodeKecamatan"
                                            name='code_kecamatan'
                                            value={formData.code_kecamatan}
                                            onChange={(e) => setFormData((prevData) => ({ ...prevData, code_kecamatan: e.target.value }))}
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                                    ) : (
                                        <>
                                            <input
                                                type="hidden"
                                                id='code_kecamatan'
                                                name='code_kecamatan'
                                                value={formData.code_kecamatan}
                                                onChange={(e) => setFormData((prevData) => ({ ...prevData, code_kecamatan: e.target.value }))}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                                            <span>{formData.code_kecamatan}</span>
                                        </>
                                    )
                                }
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Nama Kecamatan</span>
                                <input
                                    type="text"
                                    id="Name"
                                    name='Name'
                                    value={formData.name}
                                    onChange={(e) => setFormData((prevData) => ({ ...prevData, name: e.target.value.toLocaleUpperCase() }))}
                                    className="uppercase mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" />
                            </label>
                            <label className="block pt-2">
                                <span className="block text-sm font-medium text-slate-700">Kabupaten</span>
                                <Select
                                    instanceId='3'
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={
                                        dataKabupaten.filter(option => option.value === formData.parent_code_kabupaten)
                                    }
                                    ref={selectRef}
                                    defaultValue={dataKabupaten[0]}
                                    isDisabled={false}
                                    isLoading={loading}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={true}
                                    name="color"
                                    options={dataKabupaten}
                                    onChange={(e) =>
                                        //@ts-ignore
                                        setFormData((prevData) => ({ ...prevData, parent_code_kabupaten: e.value }))
                                    }
                                    onInputChange={(inputValue) => { setSearch(inputValue), setLoading(true) }}
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