"use client"

import { NavbarApp } from "@/components/layout/navbars/navbar-app"
import { SidebarApp } from "@/components/layout/sidebars/sidebar-app"

export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavbarApp />

      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarApp />

        {/* Page Content */}
        <main className="flex-1 ml-64 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
