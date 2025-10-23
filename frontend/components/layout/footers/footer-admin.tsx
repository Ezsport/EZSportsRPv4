"use client"

import Link from "next/link"

export function FooterAdmin() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} EZSportsRP Admin. All rights reserved.
        </div>
        <nav className="flex space-x-4">
          <Link 
            href="/admin/privacy" 
            className="text-sm hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/admin/terms" 
            className="text-sm hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Link 
            href="/admin/contact" 
            className="text-sm hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="text-sm text-muted-foreground">
          Version 1.0.0
        </div>
      </div>
    </footer>
  )
}
