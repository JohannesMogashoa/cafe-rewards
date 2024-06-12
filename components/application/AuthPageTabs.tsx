"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from 'react'
import { SubmitButton } from "@/components/application/SubmitButton"

type Props = {
    signIn: (formData: FormData) => Promise<void>
    signUp: (formData: FormData) => Promise<void>
}

const AuthPageTabs = ({signIn, signUp}: Props) => {
  return (
    <Tabs defaultValue="signIn" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signIn">Sign In</TabsTrigger>
        <TabsTrigger value="signUp">Register Business</TabsTrigger>
      </TabsList>
      <TabsContent value="signIn">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Sign in to Rewaaards to start earning points and seeing your progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="Pedro Duarte" autoComplete="username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="password" />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton formAction={signIn}>Sign In</SubmitButton>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signUp">
        <Card>
          <CardHeader>
            <CardTitle>Join Rewaaards</CardTitle>
            <CardDescription>
              Register your business to start rewarding your customers and growing your business.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="compName">Company Name</Label>
              <Input id="compName" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton formAction={signUp}>Save password</SubmitButton>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default AuthPageTabs