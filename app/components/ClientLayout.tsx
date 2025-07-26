"use client"; // Mark it as a client component

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current route
  
  // Define which pages should have the sidebar (authenticated pages)
  const pagesWithSidebar = ["/homepage", "/messages", "/timetable", "/search"];
  const shouldShowSidebar = pagesWithSidebar.some(page => pathname.startsWith(page));

  return (
    <SidebarProvider>
      {shouldShowSidebar && <AppSidebar />}  {/* Show sidebar only on authenticated pages */}
      
      <SidebarInset>
        {shouldShowSidebar && (
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
          </header>
        )}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
