"use client";

import { NavbarAdmin } from "@/components/layout/navbars/navbar-admin";
import { SidebarAdmin } from "@/components/layout/sidebars/sidebar-admin";
import { getSectionIcon } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment && segment !== 'admin');
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavbarAdmin />

      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarAdmin />

        {/* Page Content */}
        <main className="flex-1 ml-64 p-6 pt-20">
          {/* Breadcrumb */}
          {pathSegments.length > 0 && (
            <div className="mb-4 flex items-center space-x-2 text-sm text-muted-foreground">
              <a href="/admin" className="hover:text-foreground flex items-center">
                {React.createElement(getSectionIcon("dashboard"), { className: "h-4 w-4 mr-2" })}
                Admin
              </a>
              {pathSegments.map((segment, index) => {
                const Icon = getSectionIcon(segment);
                const href = `/admin/${pathSegments.slice(0, index + 1).join('/')}`;
                return (
                  <React.Fragment key={segment}>
                    <ChevronRightIcon className="h-4 w-4" />
                    <a 
                      href={href} 
                      className="hover:text-foreground flex items-center"
                    >
                      {React.createElement(Icon, { className: "h-4 w-4 mr-2" })}
                      {segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')}
                    </a>
                  </React.Fragment>
                );
              })}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
