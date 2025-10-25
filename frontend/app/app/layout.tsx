"use client";

import { NavbarApp } from "@/components/layout/navbars/navbar-app";
import { SidebarApp } from "@/components/layout/sidebars/sidebar-app";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");
  useAuth(token ?? "");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavbarApp />

      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarApp />

        {/* Page Content */}
        <main className="flex-1 ml-48 p-6">{children}</main>
      </div>
    </div>
  );
}
