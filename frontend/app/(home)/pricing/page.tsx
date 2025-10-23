"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/controls/button";
import { Switch } from "@/components/ui/switch";
import { Check, X } from "lucide-react";
import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import { FooterHome } from "@/components/layout/footers/footer-home";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      name: "Starter",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Perfect for individuals and small teams getting started",
      features: [
        "Up to 5 Team Members",
        "Basic Performance Tracking",
        "Community Support",
        "Limited Analytics",
        "Basic Reporting"
      ],
      buttonText: "Get Started",
      featured: false,
      buttonLink: "/payment"
    },
    {
      name: "Pro",
      monthlyPrice: 49,
      annualPrice: 39 * 12, // 20% discount
      description: "Ideal for growing teams with advanced needs",
      features: [
        "Unlimited Team Members",
        "Advanced Performance Analytics",
        "Priority Support",
        "Comprehensive Reporting",
        "Team Collaboration Tools",
        "Custom Dashboards"
      ],
      buttonText: "Choose Pro",
      featured: true,
      buttonLink: "/payment"
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      description: "Tailored solutions for large organizations",
      features: [
        "Unlimited Users",
        "Full Platform Access",
        "Dedicated Support",
        "Advanced Security",
        "Custom Integrations",
        "Personalized Onboarding",
        "SLA Guarantee"
      ],
      buttonText: "Contact Sales",
      featured: false,
      buttonLink: "/contact"
    }
  ];

  return (
    <>
      <NavbarHome />
      
      <main className="container-fluid mx-auto px-4 py-16 bg-muted/5">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-primary">
            Flexible Pricing for Every Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose a plan that grows with your team. From individual coaches 
            to large organizations, we have a solution tailored to your needs.
          </p>

          {/* Pricing Toggle */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <span className={`font-medium ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch 
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`font-medium ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
              Annually
            </span>
            {isAnnual && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                Save 20%
              </span>
            )}
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name}
              className={`
                bg-white rounded-xl shadow-lg p-6 
                ${tier.featured ? 'border-2 border-primary scale-105' : 'hover:shadow-xl'}
                transition-all
              `}
            >
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {tier.name}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {tier.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {typeof tier.monthlyPrice === 'number' 
                      ? `$${isAnnual 
                          ? Math.round(tier.annualPrice / 12) 
                          : tier.monthlyPrice}` 
                      : tier.monthlyPrice}
                  </span>
                  {typeof tier.monthlyPrice === 'number' && (
                    <span className="text-muted-foreground">
                      {isAnnual ? '/mo, billed annually' : '/mo'}
                    </span>
                  )}
                  {isAnnual && typeof tier.monthlyPrice === 'number' && tier.monthlyPrice !== 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Total ${tier.annualPrice} per year
                    </p>
                  )}
                </div>
                <Link href={tier.buttonLink}>
                  <Button 
                    className={`
                      w-full 
                      ${tier.featured 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'bg-white border border-primary text-primary hover:bg-primary/10'
                      }
                    `}
                  >
                    {tier.buttonText}
                  </Button>
                </Link>
              </div>
              
              <div className="border-t my-6"></div>
              
              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li 
                    key={feature} 
                    className="flex items-center text-muted-foreground"
                  >
                    {tier.name !== "Starter" || feature !== "Limited Analytics" ? (
                      <Check className="w-5 h-5 mr-3 text-primary" />
                    ) : (
                      <X className="w-5 h-5 mr-3 text-red-500" />
                    )}
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="max-w-4xl mx-auto mt-16 text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every team is unique. Our enterprise solutions are tailored to 
            meet your specific sports management requirements.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="shadow-xl">
              Schedule Consultation
            </Button>
            <Button variant="secondary" size="lg" className="shadow-xl">
              Request Custom Pricing
            </Button>
          </div>
        </section>
      </main>

      <FooterHome />
    </>
  );
}
