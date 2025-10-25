"use client";

import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import { FooterHome } from "@/components/layout/footers/footer-home";
import { Button } from "@/components/controls/button";
import { ArrowLeft, Home, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <NavbarHome />
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8 pt-50 min-h-[calc(100vh-20rem)]">
        <div className="absolute inset-0 z-[-1]">
          <Image
            src="/bg.jpg"
            alt="Background"
            fill
            className="bg-black object-cover"
            quality={10}
          />
        </div>
        <section className="text-center border rounded-2xl py-16 px-8 shadow-2xl bg-white/80">
          <h1 className="text-4xl font-bold mb-6">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you are looking for does not exist. Please check the URL or
            try again later.
          </p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Button
              size="lg"
              icon={<ArrowLeft />}
              onClick={() => router.back()}
            >
              Go Back
            </Button>
            <Button size="lg" icon={<Home />} onClick={() => router.push("/")}>
              Go Home
            </Button>
            <Button
              size="lg"
              icon={<LayoutDashboard />}
              onClick={() => router.push("/app/dashboard")}
            >
              Dashboard
            </Button>
          </div>
        </section>
      </main>
      <FooterHome />
    </>
  );
}
