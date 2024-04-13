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
import {
  Tabs,
  TabsContent
} from "@/components/ui/tabs"
import {tempMembers} from "@/app/utils/tempValues";
import {useState} from "react";
import {PasswordDialog} from "@/app/member/profile/_components/passwordDialog";

export default function Page()  {
  const [password, setPassword] = useState<string>(tempMembers[0].password)

  const handleSetPassword = (currGuessedPassword: string, newPassword: string) => {
    if (currGuessedPassword == password) {
      setPassword(newPassword);
    }
  }

  return (
    <Tabs defaultValue="membership" className="w-[50rem] mx-auto my-20">
      <TabsContent value="membership">
        <Card>
          <CardHeader>
            <CardTitle>Membership</CardTitle>
            <CardDescription>
              Make changes to your membership here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex">
              <div className="flex-1">
                <p className="text-amber-700 font-medium text-center">Bronze</p>
              </div>
              <div className="flex-1">Silver</div>
              <div className="flex-1">Gold</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="mr-4">Save changes</Button>
            <PasswordDialog handleSetPassword={handleSetPassword}/>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
