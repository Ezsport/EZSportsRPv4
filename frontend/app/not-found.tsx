"use client";

import { NavbarHome } from "@/components/layout/navbars/navbar-home";

export default function NotFound() {
  return (
    <>
      <NavbarHome />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-6">NotFound</h1>
          <p className="text-muted-foreground">The page you are looking for does not exist.</p>
        </section>
      </main>
    </>
  );
}
