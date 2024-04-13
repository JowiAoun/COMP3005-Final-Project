"use client"
import Link from "next/link"
import {
  Bell, CircleUser, Dumbbell,
  Home,
  LineChart, Menu, Package,
  Package2, Receipt, ShoppingCart,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import React, {useState} from "react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Badge} from "@/components/ui/badge";
import {tempMembers, tempTrainers} from "@/app/utils/tempValues";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Schedules from "@/app/administrator/schedules";
import Equipment from "@/app/administrator/equipment";
import Billing from "@/app/administrator/billing";

export default function Page() {
  const [selectSection, setSelectedSection] = useState(0)

  const getSection = () => {
    switch (selectSection) {
      case 0:
        return <Equipment rooms={[]}/>
      case 1:
        return <Schedules/>
      case 2:
        return <Billing/>
      default:
        return null;
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            {/* Logo name */}
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6"/>
              <span className="">Final Project</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4"/>
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                onClick={() => setSelectedSection(0)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  selectSection === 0
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <Dumbbell className="h-4 w-4"/>
                Equipment
              </Link>
              <Link
                href="#"
                onClick={() => setSelectedSection(1)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  selectSection === 1
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <Users className="h-4 w-4"/>
                Class Schedules
              </Link>
              <Link
                href="#"
                onClick={() => setSelectedSection(2)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  selectSection === 2
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <Receipt className="h-4 w-4"/>
                Billing
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5"/>
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6"/>
                  <span className="sr-only">COMP 3005 - Final Project</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5"/>
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5"/>
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5"/>
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5"/>
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5"/>
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5"/>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{tempMembers[0].username}</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <a href="/admin/profile"><DropdownMenuItem>Profile</DropdownMenuItem></a>
              <DropdownMenuItem>Membership</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {getSection()}
        </main>
      </div>
    </div>
  )
}