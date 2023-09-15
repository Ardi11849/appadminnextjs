'use client';

import { useAnimate, stagger, motion } from "framer-motion";

import { getJenisPerusahaan, getKeahlian, getPendidikan, getTahunPengalaman, getWilayahKabupaten, getWilayahKecamatan, getWilayahKelurahan, getWilayahNegara, getWilayahProvinsi } from '../../midleware/Api';
import { useEffect, useState } from "react";

interface cardProps {
    showHideCard: boolean,
    position: string,
    showTblKelurahan: any,
    showTblKecamatan: any
}

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });
function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            "ul.wilayah",
            {
                clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)"
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5
            }
        );

        animate(
            "li.wilayah",
            isOpen
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0
            }
        );
    }, [isOpen]);

    return scope;
}

const CardGeneral = ({ showHideCard, position, showTblKelurahan, showTblKecamatan }: cardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);
    const showJenisPerusahaan = () => {
        console.log(getJenisPerusahaan());
    }
    const showKeahlian = () => {
        console.log(getKeahlian());
    }
    const showPendidikan = () => {
        console.log(getPendidikan());
    }
    const showTahunPengalaman = () => {
        console.log(getTahunPengalaman());
    }
    const showWilayahNegara = () => {
        console.log(getWilayahNegara());
    }
    const showWilayahProvinsi = () => {
        console.log(getWilayahProvinsi());
    }
    const showWilayahKabupaten = () => {
        console.log(getWilayahKabupaten(0, 10, ''));
    }
    const showWilayahKecamatan = () => {
        showTblKecamatan();
    }
    const showWilayahKelurahan = () => {
        showTblKelurahan();
    }

    return (
        <div className={`px-8 py-8 w-1/2 card ${position} ${showHideCard ? 'show' : 'hide'}`}>
            <div className="bg-white list rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
                <h1 className="text-lg font-bold">General</h1>
                <hr className="h-1 my-3 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                <ul className="list-disc pl-8">
                    <li onClick={showJenisPerusahaan} className="pt-2 border-b-2 border-gray-200">
                        <motion.div
                            className="cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <span className="focus:ring-blue-300 text-blue-500">Jenis Perusahaan</span>
                        </motion.div>
                    </li>
                    <li onClick={showKeahlian} className="pt-2 border-b-2 border-gray-200">
                        <motion.div
                            className="cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <span className="focus:ring-blue-300 text-blue-500">Keahlian</span>
                        </motion.div>
                    </li>
                    <li onClick={showPendidikan} className="pt-2 border-b-2 border-gray-200">
                        <motion.div
                            className="cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <span className="focus:ring-blue-300 text-blue-500">Pendidikan</span>
                        </motion.div>
                    </li>
                    <li onClick={showTahunPengalaman} className="pt-2 border-b-2 border-gray-200">
                        <motion.div
                            className="cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <span className="focus:ring-blue-300 text-blue-500">Tahun Pengalaman</span>
                        </motion.div>
                    </li>
                    <li className={`pt-2 border-gray-200 ${isOpen ? '' : 'border-b-2'}`} ref={scope}>
                        <motion.button
                            className='flex nav-item rounded text-slate-400 w-full'
                            whileTap={{ scale: 0.97 }}
                            onClick={() => { setIsOpen(!isOpen) }}
                        >
                            <p className='text-md text-gray-500 font-bold text-left'>Wilayah</p>
                        </motion.button>
                        <ul className="list-decimal pl-5 wilayah">
                            <li onClick={showWilayahNegara} className={`pt-2 border-b-2 border-gray-200 wilayah ${isOpen ? '' : 'hidden'}`}>
                                <motion.div
                                    className="cursor-pointer"
                                            whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                    <span className="focus:ring-blue-300 text-blue-500">Negara</span>
                                </motion.div>
                            </li>
                            <li onClick={showWilayahProvinsi} className={`pt-2 border-b-2 border-gray-200 wilayah ${isOpen ? '' : 'hidden'}`}>
                                <motion.div
                                    className="cursor-pointer"
                                            whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                    <span className="focus:ring-blue-300 text-blue-500">Provinsi</span>
                                </motion.div>
                            </li>
                            <li onClick={showWilayahKabupaten} className={`pt-2 border-b-2 border-gray-200 wilayah ${isOpen ? '' : 'hidden'}`}>
                                <motion.div
                                    className="cursor-pointer"
                                            whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                    <span className="focus:ring-blue-300 text-blue-500">Kabupaten</span>
                                </motion.div>
                            </li>
                            <li onClick={showWilayahKecamatan} className={`pt-2 border-b-2 border-gray-200 wilayah ${isOpen ? '' : 'hidden'}`}>
                                <motion.div
                                    className="cursor-pointer"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                    <span className="focus:ring-blue-300 text-blue-500">Kecamatan</span>
                                </motion.div>
                            </li>
                            <li onClick={showWilayahKelurahan} className={`pt-2 border-b-2 border-gray-200 wilayah ${isOpen ? '' : 'hidden'}`}>
                                <motion.div
                                    className="cursor-pointer"
                                            whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <span className="focus:ring-blue-300 text-blue-500">Kelurahan</span>
                                </motion.div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CardGeneral;