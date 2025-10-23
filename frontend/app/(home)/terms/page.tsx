import { FooterHome } from "@/components/layout/footers/footer-home";
import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import React from "react";

export default function TermsOfServicePage() {
  return (
    <>
      <NavbarHome />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 mb-4">
            By accessing and using EZSportsRP, you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not
            use our platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
          <p className="text-gray-700 mb-4">
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
          <p className="text-gray-700 mb-4">
            You agree not to use the platform for any unlawful purposes or to
            violate the rights of others. Prohibited activities include, but are
            not limited to, harassment, spam, and unauthorized data collection.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            4. Intellectual Property
          </h2>
          <p className="text-gray-700 mb-4">
            All content on EZSportsRP, including text, graphics, logos, and
            software, is the property of EZSportsRP and is protected by
            intellectual property laws.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            5. Disclaimer of Warranties
          </h2>
          <p className="text-gray-700 mb-4">
            EZSportsRP is provided "as is" without any warranties. We do not
            guarantee uninterrupted or error-free service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4">
            EZSportsRP shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising from your use of
            the platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to modify these Terms of Service at any time.
            Continued use of the platform constitutes acceptance of the updated
            terms.
          </p>
        </section>

        <p className="text-gray-600 italic">Last Updated: October 2025</p>
      </div>
      <FooterHome />
    </>
  );
}
