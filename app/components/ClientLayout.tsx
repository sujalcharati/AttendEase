"use client"; // Mark it as a client component

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current route
  const isLandingPage = pathname === "/"; // Check if it's the landing page

  return (
    <SidebarProvider>
      {!isLandingPage && <AppSidebar />}  {/* Hide sidebar on the landing page */}
      
      <SidebarInset>
        {!isLandingPage && (
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
          </header>
        )}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
