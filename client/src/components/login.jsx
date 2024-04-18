import { Button } from "@/components/ui/button"
import circ from '../assets/circ-logo.png';
import { useState } from "react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import apiService from "@/services/apiServices";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "./ui/toaster";

const register = {
  email: '',
  password: '',
  name: '',
  lastName: '',
};
const login = {
  email: '',
  password: ''
}

export function LoginPage({ setUser }) {
  const { toast } = useToast();
  const [registerState, setRegisterState] = useState(register);
  const [loginState, setLoginState] = useState(login);

  const handleRegisterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value, registerState)
    setRegisterState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (isReg) => {
    if (isReg) {
      if (!registerState.name || !registerState.lastName || !registerState.email) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Please fill the missing fields"
        })
        return
      }
      if (!registerState.email.includes('@')) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Please enter a valid email."
        })
        return
      }
      const user = await apiService.register(registerState);
      if (user.name !== undefined) {
        setUser({
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
        })
      }
      if (user.error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: user.error.msg
        })
      }
    } else {
      if (!loginState.email.includes('@')) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Please enter a valid email."
        })
        return
      }
      const user = await apiService.login(loginState);
      if (user.name !== undefined) {
        setUser({
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
        })
      }
      if (user.error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: user.error.msg
        })
      }
    }
  };
  
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center gap-28 bg-slate-800">
        <img src={circ} alt="" className="h-[300px]" />
      <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-up">Sign-Up</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-up">
            <Card>
          <CardHeader>
            <CardTitle>Create new account</CardTitle>
            <CardDescription>
              Please fill the details below to create your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="firstName">Name</Label>
                  <Input id="firstName" name="name" type="text" value={registerState.name} onChange={handleRegisterChange} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" type="text" value={registerState.lastName} onChange={handleRegisterChange} required />
                </div>
            <div className="space-y-1">
              <Label htmlFor="e-mail">E-mail</Label>
                  <Input id="e-mail" name="email" type="email" value={registerState.email} onChange={handleRegisterChange} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
                  <Input id="new" name="password" type="password" value={registerState.password} onChange={handleRegisterChange} required />
            </div>
          </CardContent>
          <CardFooter>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => handleSubmit(true)}>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
             Enter details below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="e-mail">E-mail</Label>
                  <Input id="e-mail" name="email" type="email" value={loginState.email} onChange={handleLoginChange} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Password</Label>
                  <Input id="current" name="password" type="password" value={loginState.password} onChange={handleLoginChange} required />
            </div>
          </CardContent>
          <CardFooter>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={()=>handleSubmit(false)}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
        </Tabs>
        <img src={circ} alt="" className="h-[300px]" />
        <div className="absolute">
        <Toaster/>
        </div>
      </div>
    </>
  )
}

export default LoginPage
