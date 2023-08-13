
'use client'

import { useState, useEffect } from "react";
import FormLogin from "./components/login/login"
import FormRegister from "./components/login/register";
import { motion, LayoutGroup } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getTokenFromLocalStorage } from "./middleware/apis"


export default function Login() {

  const { push } = useRouter();

  const redirectIfAuthenticated = async () => {
      const isUserAuthenticated = await getTokenFromLocalStorage();
      if (isUserAuthenticated != null && isUserAuthenticated != 'null' && isUserAuthenticated != undefined) {
        push("/dashboard/view")
      }
  };

  useEffect(() => {
    redirectIfAuthenticated();
  }, []);

  const [isModalLogin, setIsModalLogin] = useState(true);
  const [isModalRegister, setIsModalRegister] = useState(false);

  const closeModalLogin = () => {
    setIsModalLogin(false)
    setIsModalRegister(true)
  }

  const closeModalRegister = () => {
    setIsModalRegister(false)
    setIsModalLogin(true)
  }

  return (
    <motion.div className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <LayoutGroup>
        {
          isModalLogin &&
          <FormLogin isOpen={isModalLogin} onClose={closeModalLogin} />
        }
        {
          isModalRegister &&
          <FormRegister isOpen={isModalRegister} onClose={closeModalRegister} />
        }
      </LayoutGroup>
    </motion.div>
  )
}
