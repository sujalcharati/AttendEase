"use client"

import { Calendar, Home, MessageSquare, Users2, BookOpen, Bell, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

interface TimetableEntry {
  time: string
  subject: string
}

const todayClasses: TimetableEntry[] = [
  { time: "9:00", subject: "Mathematics" },
  { time: "11:00", subject: "Physics" },
  { time: "14:00", subject: "Chemistry" },
  { time: "16:00", subject: "Computer Science" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-blue-600"> Attendance </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/homepage">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/search"}>
                  <Link href="/search">
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/attendance"}>
                  <Link href="/timetable">
                    <Calendar className="h-4 w-4" />
                    <span>Timetable</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/messages"}>
                  <Link href="/messages">
                    <MessageSquare className="h-4 w-4" />
                    <span>messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/classmates"}>
                  <Link href="/classmates">
                    <Users2 className="h-4 w-4" />
                    <span>Classmates</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Today&apos;s Schedule</SidebarGroupLabel>
          <SidebarGroupContent>
            <Card className="border-none shadow-none">
              <CardContent className="p-2">
                {todayClasses.map((entry, index) => (
                  <div
                    key={index}
                    className="mb-2 flex items-center justify-between rounded-lg border bg-card p-2 text-sm"
                  >
                    <span className="font-medium">{entry.time}</span>
                    <span className="text-muted-foreground">{entry.subject}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">Student Name</p>
            <p className="text-xs text-muted-foreground">Class XII-A</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

