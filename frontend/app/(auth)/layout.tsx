"use client";

import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import Image from "next/image";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarHome />

      <main className="container mx-auto pt-32 pb-16 max-w-5xl">
        <div className="fixed inset-0 z-0">
          <Image
            src="/bg.jpg"
            alt="Background"
            fill
            className="fixed bg-black object-cover"
            // quality={10}
          />
        </div>
        {children}
      </main>
    </>
  );
}
