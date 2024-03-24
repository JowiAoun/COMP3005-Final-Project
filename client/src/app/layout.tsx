import "./global.css"
import {Toaster} from "@/components/ui/sonner";
import React from "react";

export const metadata = {
  title: 'COMP 3005 - Final Project',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
        <Toaster/>
      </body>
    </html>
  )
}
