"use client";

import { LiveChat } from '@/components/chat/live-chat';
import PageTransition from '@/components/layout/page-transition';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTransition>
        {children}
      </PageTransition>
      <LiveChat />
    </>
  );
}