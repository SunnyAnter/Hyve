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

export function LoginPage({ setUser }) {
  
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
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="firstName"type="text"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" type="text"/>
                </div>
            <div className="space-y-1">
              <Label htmlFor="e-mail">E-mail</Label>
              <Input id="e-mail" name="email" type="email"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input id="new" name="password"type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-orange-500 hover:bg-orange-600">Save changes</Button>
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
              <Input id="e-mail" name="email" type="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Password</Label>
                  <Input id="current" name="password" type="password"/>
            </div>
          </CardContent>
          <CardFooter>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={()=>setUser('sunny')}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
        </Tabs>
        <img src={circ} alt="" className="h-[300px]"/>
      </div>
    </>
  )
}

export default LoginPage
