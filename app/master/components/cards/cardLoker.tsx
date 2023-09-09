'use client';

interface cardProps {
    showHideCard: boolean,
    position: string
}

import { motion } from "framer-motion";
import { getKategoriPekerjaan, getTipePekerjaan, getLevelPekerjaan } from '../../midleware/Api';

const CardLoker = ({ showHideCard, position }: cardProps) => {
    const showKategoriPekerjaan = () => {
        console.log(getKategoriPekerjaan());

    }
    const showTipePekerjaan = () => {
        console.log(getTipePekerjaan());

    }
    const showLevelPekerjaan = () => {
        console.log(getLevelPekerjaan());

    }
    return (
        <div className={`px-8 py-8 w-1/2 card ${position} ${showHideCard ? 'show' : 'hide'}`}>
            <div className="bg-white list rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
                <h1 className="text-lg font-bold">Lowongan Pekerjaan</h1>
                <hr className="h-1 my-3 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                <ul className="list-disc pl-5">
                    <li onClick={showKategoriPekerjaan} className="pt-2 border-b-2 border-gray-200">
                        <motion.div
                            className="cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <span className="focus:ring-blue-300 text-blue-500">Kategori Pekerjaan</span>
                        </motion.div>
                    </li>
                    <li onClick={showTipePekerjaan} className="pt-2 border-b-2 border-gray-200">
                        <motion.div
                            className="cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <span className="focus:ring-blue-300 text-blue-500">Tipe Pekerjaan</span>
                        </motion.div>
                    </li>
                    <li onClick={showLevelPekerjaan} className="pt-2 border-b-2 border-gray-200">
                        <motion.div
                            className="cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <span className="focus:ring-blue-300 text-blue-500">Level Pekerjaan</span>
                        </motion.div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CardLoker;