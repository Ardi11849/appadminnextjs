'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { apis, storeTokenInLocalStorage } from "../../../global/apis"
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

interface formLoginprops {
  isOpen: any,
  onClose: any
}


const FormLogin = ({ isOpen, onClose }: formLoginprops) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const actLogin = async () => {
    setLoading(true)
    const data = {
      method: 'post',
      url: '/auth/login',
      data: {
        email: email,
        password: password
      }
    }
    const result = await apis(data)
    console.log(result);

    if (result.request.status == 200) {
      MySwal.fire(
        'Berhasil',
        'Anda Berhasil Login',
        'success'
      ).then(() => {

        setLoading(false)
        console.log(result);
        storeTokenInLocalStorage(result.data.data.accessToken)
        router.replace('/dashboard/view');
      })
    } else {
      setLoading(false)
      let message = '';
      if (result.response.data.message != null) {
        message = result.response.data.message;
      } else {
        try {
          message = result.response.data.error.results.errors[0].Email.message;
        } catch (error) {
          message = result.response.data.error.results.errors[0].Password.message;
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'Failed Login',
        text: message
      })
    }
  }

  const gotoRegister = () => {
    onClose()
  }
  return (
    <>
      {loading ?
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          Loading....
        </motion.div>
        :
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            scale: isOpen ? [1, 1.2, 1.2, 1, 1] : 0,
            rotate: isOpen ? [0, 0, 10, 10, 0] : 0,
            borderRadius: isOpen ? ["0%", "0%", "50%", "50%", "0%"] : 0,
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -20
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeatDelay: 1
          }}
        >
          <Card className={`w-[350px]`}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Masukan Email Dan Password Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input id="emailLogin" type="email" placeholder="Masukan Email Disini" onChange={(e) => setEmail(e.target.value)} value={email} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Password</Label>
                    <Input id="passwordLogin" type="password" placeholder="Masukan Password Disini" onChange={(e) => setPassword(e.target.value)} value={password} />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={gotoRegister}>Register</Button>
              <Button variant="primary" onClick={actLogin}>Login</Button>
            </CardFooter>
          </Card>
        </motion.div>
      }
    </>
  )
}

export default FormLogin;