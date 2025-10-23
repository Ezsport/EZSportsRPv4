import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "EZSportsRP - Sports Management Platform",
  description: "Transforming sports management with seamless collaboration and communication",
  icons: {
    icon: '/logo-180.png',
  },
};

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} ${geistMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
