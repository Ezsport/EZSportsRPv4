"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/controls/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ArrowRight, CircleArrowRight, Key, LogIn, UserPlus, Wand, Wand2 } from "lucide-react";

export function NavbarHome() {
  return (
    <header className="fixed top-0 z-50 w-full shadow-xl bg-white justify-center flex">
      <div className="container max-w-7xl flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center ">
          <Image
            src="/logo-180.png"
            alt="EZSportsRP Logo"
            width={80}
            height={80}
            className="w-12 h-12"
          />
          <span className="font-bold text-2xl hover:text-primary/90 transition-colors duration-200">
            EZSportsRP
          </span>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-6">
            {/* Features */}
            <NavigationMenuItem>
              <Link
                href="/features"
                className="text-lg hover:text-primary transition-colors duration-200"
              >
                Features
              </Link>
            </NavigationMenuItem>

            {/* Pricing */}
            <NavigationMenuItem>
              <Link
                href="/pricing"
                className="text-lg hover:text-primary transition-colors duration-200"
              >
                Pricing
              </Link>
            </NavigationMenuItem>

            {/* About */}
            <NavigationMenuItem>
              <Link
                href="/about"
                className="text-lg hover:text-primary transition-colors duration-200"
              >
                About
              </Link>
            </NavigationMenuItem>

            {/* Contact */}
            <NavigationMenuItem>
              <Link
                href="/contact"
                className="text-lg hover:text-primary transition-colors duration-200"
              >
                Contact
              </Link>
            </NavigationMenuItem>

            {/* App Demo */}
            <NavigationMenuItem>
              <Link
                href="/app/dashboard"
                className="text-lg font-medium hover:text-primary transition-colors duration-200"
              >
                App Demo
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-background hover:border-primary hover:text-primary"
            icon={<Key />}
          >
            <Link href="/login">Log In</Link>
          </Button>
          <Button size="lg" icon={<Wand2 />}>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
