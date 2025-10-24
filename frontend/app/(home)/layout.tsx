"use client";

import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import { FooterHome } from "@/components/layout/footers/footer-home";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarHome />
      <main className="container-fluid mx-auto py-16">{children}</main>
      <FooterHome />
    </>
  );
}
