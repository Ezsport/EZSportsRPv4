import React from "react";
import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import { FooterHome } from "@/components/layout/footers/footer-home";

export default function PrivacyPolicyPage() {
  return (
    <>
      <NavbarHome />

      <main className="container-fluid mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            We collect information you provide directly to us, such as when you
            create an account, update your profile, or interact with our
            platform. This may include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Personal identification information (name, email, phone number)
            </li>
            <li>Sports-related information</li>
            <li>Account credentials</li>
            <li>Communication and correspondence</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Communicate with you about products, services, and events</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            3. Information Sharing
          </h2>
          <p className="text-gray-700 mb-4">
            We do not sell your personal information. We may share information
            with:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Service providers who perform services on our behalf</li>
            <li>Legal requirements (law enforcement, legal proceedings)</li>
            <li>With your consent or at your direction</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized or unlawful
            processing, accidental loss, destruction, or damage.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Access your personal information</li>
            <li>Request correction of your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
            <li>Request restriction of processing your personal information</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            6. Cookies and Tracking
          </h2>
          <p className="text-gray-700 mb-4">
            We use cookies and similar tracking technologies to enhance user
            experience, analyze trends, and administer the platform. You can
            control cookies through your browser settings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            7. Children&apos;s Privacy
          </h2>
          <p className="text-gray-700 mb-4">
            Our platform is not intended for children under 13. We do not
            knowingly collect personal information from children under 13.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            8. Changes to This Policy
          </h2>
          <p className="text-gray-700 mb-4">
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this privacy policy, please contact
            us at privacy@ezsportsrp.com.
          </p>
        </section>

        <p className="text-gray-600 italic">Last Updated: October 2025</p>
      </main>

      <FooterHome />
    </>
  );
}
