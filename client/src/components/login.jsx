import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useToast
} from "@ui";
import circ from '../assets/circ-logo.png';
import Background from '../assets/logo-bg.png';
import { useState } from "react";
import apiService from "@/services/apiServices";
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
  const handleKeyDownLogin = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(false)
    }
  };
  const handleKeyDownRegister = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(true)
    }
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
      <div className="w-[100vw] h-[100vh] flex flex-row justify-center items-center bg-gray-800">
        <div className="flex flex-col justify-center items-center gap-4 w-[60vw]">
        <img src={circ} alt="" className="h-[100px]" />
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
                  <Input id="firstName" name="name" type="text" value={registerState.name} onChange={handleRegisterChange} onKeyDown={handleKeyDownRegister} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" type="text" value={registerState.lastName} onChange={handleRegisterChange} onKeyDown={handleKeyDownRegister} required />
                </div>
            <div className="space-y-1">
              <Label htmlFor="e-mail">E-mail</Label>
                  <Input id="e-mail" name="email" type="email" value={registerState.email} onChange={handleRegisterChange} onKeyDown={handleKeyDownRegister} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
                  <Input id="new" name="password" type="password" value={registerState.password} onChange={handleRegisterChange} onKeyDown={handleKeyDownRegister} required />
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
                  <Input id="e-mail" name="email" type="email" value={loginState.email} onChange={handleLoginChange} onKeyDown={handleKeyDownLogin} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Password</Label>
                  <Input id="current" name="password" type="password" value={loginState.password} onChange={handleLoginChange} onKeyDown={handleKeyDownLogin} required />
            </div>
          </CardContent>
          <CardFooter>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={()=>handleSubmit(false)}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
        </Tabs>
        </div>
        <div className="bg-white h-full w-1"> 
        </div>
        <img src={Background} alt="" className="h-full w-[39vw]" />
        <div className="absolute">
        <Toaster/>
        </div>
      </div>
    </>
  )
}

export default LoginPage
