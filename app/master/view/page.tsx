'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import CardLoker from '../components/cards/cardLoker';
import CardGeneral from '../components/cards/cardGeneral';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { motion } from "framer-motion";
import TabelKelurahan from '../components/table/wilayah/kelurahan/tableKelurahan';
const MySwal = withReactContent(Swal)

export default function Master() {

  return (
    <main className="flex min-h-screen bg-gray-300 flex-col">
      <Header title='Master' url='test' />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
      <TabelKelurahan />
      <CardGeneral position='float-left' />
      <CardLoker position='float-left'/>
      </motion.div>
    </main>
  )
}