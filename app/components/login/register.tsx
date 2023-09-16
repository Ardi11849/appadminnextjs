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
import { apis } from "../../../global/apis"
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import $ from 'jquery';
const MySwal = withReactContent(Swal)

interface formRegisterprops {
  isOpen: any,
  onClose: any
}


const FormRegister = ({ isOpen, onClose }: formRegisterprops) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const actLogin = async () => {
    const data = {
      method: 'post',
      url: '/auth/register',
      data: {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        active: true,
        role: 'user',
      }
    }
    const result = await apis(data);
    if (result.request.status == 200) {
      MySwal.fire(
        'Berhasil',
        'Anda Berhasil Login',
        'success'
      ).then(() => {
        router.replace('/dashboard');
      })
    } else {
      let message = '';
      if (result.data.message != null) {
        message = result.data.message;
      } else {
          message = result.data.error[0].message;
          $("#"+result.data.error[0].param).trigger('focus');
      }
      Swal.fire({
        icon: 'error',
        title: 'Failed Login',
        text: message
      })
    }
  }


  const gotoLogin = () => {
    onClose()
  }
  return (
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
          <CardTitle>Register</CardTitle>
          <CardDescription>Mohon Masukan Biodata Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="Email" type="email" placeholder="Please Insert Your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">First Name</Label>
                <Input className="lowercase" id="FirstName" type="text" placeholder="Please Insert Your First Name" onChange={(e) => setFirstName(e.target.value.toLocaleLowerCase())} value={firstName} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Last Name</Label>
                <Input className="lowercase" id="LastName" type="text" placeholder="Please Insert Your Last Name" onChange={(e) => setLastName(e.target.value.toLocaleLowerCase())} value={lastName} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Password</Label>
                <Input id="passwordRegister" type="password" placeholder="Please Insert Your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={gotoLogin}>Back To Login</Button>
          <Button variant="primary" onClick={actLogin}>Register</Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default FormRegister;