'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import CardLoker from '../components/cards/cardLoker';
import CardGeneral from '../components/cards/cardGeneral';
import { colKelurahan } from '../components/table/wilayah/kelurahan/columns';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { motion, stagger, useAnimate } from "framer-motion";
import TabelKelurahan from '../components/table/wilayah/kelurahan/tableKelurahan';
const MySwal = withReactContent(Swal)

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

export default function Master() {
  const [showHideCard, setShowHideCard] = useState(true);
  const [showHideTableKelurahan ,setShowHideTableKelurahan] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
      animate(
          ".card",
          {
              clipPath: showHideCard
                  ? "inset(0% 0% 0% 0% round 10px)"
                  : "inset(10% 50% 90% 50% round 10px)"
          },
          {
              type: "spring",
              bounce: 0,
              duration: 0.3
          }
      );

      animate(
          ".list",
          showHideCard
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
          {
              duration: 0.3,
              delay: showHideCard ? staggerMenuItems : 0
          }
      );
  }, [showHideCard]);

  const closeTable = () => {
    // @ts-ignore
    setShowHideTableKelurahan(false);
    // @ts-ignore
    setShowHideCard(true);
  }
  const showTblKelurahan = () => {
    // @ts-ignore
    setShowHideTableKelurahan(true);
    // @ts-ignore
    setShowHideCard(false);
    
  }

  return (
    <main className="flex min-h-screen bg-gray-300 flex-col">
      <Header title='Master' url='test' />
      <motion.div
        ref={scope}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <TabelKelurahan
          columns={colKelurahan}
          // @ts-ignore
          showHideTableKelurahan={showHideTableKelurahan}
          closeTable={closeTable} />
        <CardGeneral
          // @ts-ignore
          showHideCard={showHideCard} 
          position='float-left'
          showTblKelurahan={showTblKelurahan} />
        <CardLoker
          // @ts-ignore
          showHideCard={showHideCard} 
          position='float-left' />
      </motion.div>
    </main>
  )
}