"use client"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {tempMember} from "@/app/utils/tempValues";
import {DatePicker} from "@/app/member/profile/_components/datePicker";
import {useState} from "react";
import {PasswordDialog} from "@/app/member/profile/_components/passwordDialog";

export default function Page()  {
  const [date, setDate] = useState<Date>(tempMember.healthMetrics.age)
  const [password, setPassword] = useState<string>(tempMember.password)

  const handleSetPassword = (currGuessedPassword: string, newPassword: string) => {
    if (currGuessedPassword == password) {
      setPassword(newPassword);
    }
  }

  return (
    <Tabs defaultValue="account" className="w-[50rem] mx-auto my-20">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Profile</TabsTrigger>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue={tempMember.firstName} />
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue={tempMember.lastName} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue={tempMember.username} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="mr-4">Save changes</Button>
            <PasswordDialog handleSetPassword={handleSetPassword}/>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="metrics">
        <Card>
          <CardHeader>
            <CardTitle>Metrics</CardTitle>
            <CardDescription>
              Change your metrics here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="age">Age</Label><br/>
              <DatePicker date={date} setDate={setDate}></DatePicker>
            </div>
            <div className="space-y-1">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" defaultValue={tempMember.healthMetrics.weight}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" defaultValue={tempMember.healthMetrics.height}/>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
