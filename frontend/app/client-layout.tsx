"use client";

import { LiveChat } from "@/components/chat/live-chat";
import PageTransition from "@/components/layout/page-transition";
import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
      <LiveChat />
      <Toaster
        position="top-center"
        richColors={true}
        closeButton={true}
        offset={80}
        expand
      />
    </>
  );
}
