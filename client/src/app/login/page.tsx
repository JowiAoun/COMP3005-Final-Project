"use client";
import Link from "next/link";
import { useState } from "react"; // Import useState hook
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/utils/api";

function getCookie(cookieName : any) {
  // Split the document.cookie string into individual cookies
  const cookies = document.cookie.split(';');

  // Loop through the cookies to find the one with the specified name
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // Trim whitespace

      // Check if the cookie starts with the specified name
      if (cookie.startsWith(cookieName + '=')) {
          // Return the value of the cookie (after the '=' sign)
          return cookie.substring(cookieName.length + 1);
      }
  }
}


export default function Page() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // console.log(formData);
    //! submit to server
   
    login(formData.username, formData.password)
      .then((result) => {
        window.location.href = "http://localhost:3000/member"
        // Log the result
        document.cookie = 'memberId='+JSON.parse(result).memberId+";"
      })
      .catch((error) => {
        console.error(error); // Log any errors
      });
  };

  return (
    <Card className="mx-auto max-w-sm mt-[6rem]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}> {/* Handle form submission */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                autoComplete="true"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="true"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
