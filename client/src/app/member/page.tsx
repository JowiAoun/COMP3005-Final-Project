"use client"
import Exercises from "@/app/member/exercises";
import Achievements from "@/app/member/achievements";
import Analytics from "@/app/member/analytics";
import Sessions from "@/app/member/sessions";
import Billing from "@/app/member/billing";
import Link from "next/link"
import {
  Bell,
  CircleUser, Dumbbell,
  Home,
  LineChart,
  Menu,
  Package,
  Package2, ReceiptText,
  Search,
  ShoppingCart, Trophy,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import React, {useState} from "react";
import {tempBills, tempMember, tempSessions} from "@/app/utils/tempValues";

export default function Page() {
  const [selectSection, setSelectedSection] = useState(0)
  const [sessions, setSessions] = useState(tempSessions)
  const [bills, setBills] = useState(tempBills)

  const getSection = () => {
    switch(selectSection) {
      case 0:
        return <Analytics member={tempMember}/>;
      case 1:
        return <Exercises />;
      case 2:
        return <Achievements />;
      case 3:
        return <Sessions sessions={sessions} />;
      case 4:
        return <Billing bills={bills} setBills={setBills} />;
      default:
        return null;
    }
  }

  const filterSessions = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setSessions(tempSessions.filter(session =>
      session.name.toLowerCase().includes(input.toLowerCase())
    ));
  }

  const getBillsUnpaid = (): number => {
    let n = 0;

    bills && bills.map((bill, index) => {
      if (!bill.paid) {
        ++n;
      }
    })

    return n;
  }

  const getMembershipDesc = () => {
    switch(tempMember.membershipType) {
      case "Bronze":
      case "Silver":
        return "Thanks for being a valued member! Upgrade for more."
      case "Gold":
        return "Thanks for being a valued member!"
      default:
        return "You do not have a membership. Upgrade to unlock many features."
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            {/* Logo name */}
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Final Project</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
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
                <LineChart className="h-4 w-4" />
                Analytics
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
                <Dumbbell className="h-4 w-4" />
                Exercises
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
                <Trophy className="h-4 w-4" />
                Achievements
              </Link>
              <Link
                href="#"
                onClick={() => setSelectedSection(3)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  selectSection === 3
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <Users className="h-4 w-4" />
                Sessions
              </Link>
              <Link
                href="#"
                onClick={() => setSelectedSection(4)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  selectSection === 4
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <ReceiptText className="h-4 w-4" />
                Billing
                {
                  getBillsUnpaid() == 0 ?
                  null
                  :
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {getBillsUnpaid()}
                  </Badge>
                }
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>{tempMember.membershipType} Membership</CardTitle>
                <CardDescription>
                  {getMembershipDesc()}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>
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
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">COMP 3005 - Final Project</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>{tempMember.membershipType} Membership</CardTitle>
                    <CardDescription>
                      {getMembershipDesc()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Manage Subscription
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  onChange={filterSessions}
                  onClick={() => setSelectedSection(3)}
                  type="search"
                  placeholder="Search sessions..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
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