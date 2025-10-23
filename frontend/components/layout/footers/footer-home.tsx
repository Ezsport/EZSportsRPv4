"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function FooterHome() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-4 gap-12">
        <div>
          <img 
            src="/logo-big.png" 
            alt="EZSports RP Logo" 
            className="h-12 mb-4"
          />
          <p className="text-gray-400 mb-4">
            Revolutionizing sports management through innovative technology 
            and comprehensive team solutions.
          </p>
          <div className="flex space-x-4">
            <Link 
              href="https://facebook.com" 
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-6 h-6" />
            </Link>
            <Link 
              href="https://twitter.com" 
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-6 h-6" />
            </Link>
            <Link 
              href="https://instagram.com" 
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6" />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-white">Platform</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                href="/features" 
                className="text-gray-400 hover:text-white"
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                href="/pricing" 
                className="text-gray-400 hover:text-white"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                href="/integrations" 
                className="text-gray-400 hover:text-white"
              >
                Integrations
              </Link>
            </li>
            <li>
              <Link 
                href="/app/dashboard" 
                className="text-gray-400 hover:text-white"
              >
                Demo
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-white">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                href="/help" 
                className="text-gray-400 hover:text-white"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="text-gray-400 hover:text-white"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link 
                href="/docs/api" 
                className="text-gray-400 hover:text-white"
              >
                API Documentation
              </Link>
            </li>
            <li>
              <Link 
                href="/status" 
                className="text-gray-400 hover:text-white"
              >
                Status
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-white">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-white"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link 
                href="/compliance" 
                className="text-gray-400 hover:text-white"
              >
                Compliance
              </Link>
            </li>
            <li>
              <Link 
                href="/cookies" 
                className="text-gray-400 hover:text-white"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} EZSports RP. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Version 1.0.0
          </p>
        </div>
      </div>
    </footer>
  );
}
