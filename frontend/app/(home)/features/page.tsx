"use client";

import { Button } from "@/components/controls/button";
import { 
  Users, 
  BarChart2, 
  Calendar, 
  Clipboard, 
  Award, 
  Zap, 
  Shield, 
  Layers, 
  Cpu,
  Briefcase 
} from "lucide-react";
import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import { FooterHome } from "@/components/layout/footers/footer-home";

export default function FeaturesPage() {
  const featureCategories = [
    {
      title: "Team Management",
      icon: <Users className="w-12 h-12 text-primary" />,
      description: "Comprehensive tools to streamline team operations and communication.",
      features: [
        {
          name: "Roster Management",
          description: "Easily add, remove, and track team members with detailed profiles.",
          icon: <Clipboard className="w-6 h-6 text-primary mr-3" />
        },
        {
          name: "Communication Hub",
          description: "Centralized messaging and notification system for seamless team interaction.",
          icon: <Zap className="w-6 h-6 text-primary mr-3" />
        },
        {
          name: "Role-Based Access",
          description: "Customize access levels for coaches, players, managers, and staff.",
          icon: <Shield className="w-6 h-6 text-primary mr-3" />
        }
      ]
    },
    {
      title: "Performance Analytics",
      icon: <BarChart2 className="w-12 h-12 text-primary" />,
      description: "Advanced tracking and analysis to enhance individual and team performance.",
      features: [
        {
          name: "Player Metrics",
          description: "Detailed performance tracking with customizable KPIs.",
          icon: <Award className="w-6 h-6 text-primary mr-3" />
        },
        {
          name: "Comparative Analysis",
          description: "Compare player and team performance across multiple dimensions.",
          icon: <Layers className="w-6 h-6 text-primary mr-3" />
        },
        {
          name: "Predictive Insights",
          description: "AI-powered recommendations for training and strategy.",
          icon: <Cpu className="w-6 h-6 text-primary mr-3" />
        }
      ]
    },
    {
      title: "Scheduling & Planning",
      icon: <Calendar className="w-12 h-12 text-primary" />,
      description: "Comprehensive scheduling tools for games, practices, and team events.",
      features: [
        {
          name: "Game Scheduling",
          description: "Automated scheduling with conflict resolution and venue management.",
          icon: <Briefcase className="w-6 h-6 text-primary mr-3" />
        },
        {
          name: "Training Planner",
          description: "Create and track training sessions with detailed workout plans.",
          icon: <Calendar className="w-6 h-6 text-primary mr-3" />
        },
        {
          name: "Resource Allocation",
          description: "Optimize field, equipment, and staff resources efficiently.",
          icon: <Layers className="w-6 h-6 text-primary mr-3" />
        }
      ]
    }
  ];

  const additionalFeatures = [
    {
      title: "Comprehensive Reporting",
      description: "Generate detailed reports on team and individual performance.",
      icon: <BarChart2 className="w-8 h-8 text-primary mr-4" />
    },
    {
      title: "Mobile Accessibility",
      description: "Full-featured mobile app for on-the-go management.",
      icon: <Zap className="w-8 h-8 text-primary mr-4" />
    },
    {
      title: "Secure Data Management",
      description: "Enterprise-grade security and data protection.",
      icon: <Shield className="w-8 h-8 text-primary mr-4" />
    }
  ];

  return (
    <>
      <NavbarHome />
      
      <main className="container-fluid mx-auto">
        <section 
          className="relative bg-cover bg-center text-white py-24 text-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/bg.jpg")',
            backgroundSize: 'cover'
          }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
              Powerful Features for Sports Management
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md mb-8">
              EZSports RP provides a comprehensive suite of tools designed to 
              transform how sports teams operate, communicate, and succeed.
            </p>
            <Button size="lg" className="shadow-xl">
              Explore Features
            </Button>
          </div>
        </section>

        <section className="container mx-auto py-16">
          {featureCategories.map((category, index) => (
            <div 
              key={category.title} 
              className={`
                grid md:grid-cols-2 gap-12 items-center 
                ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} 
                mb-16
              `}
            >
              <div className={`
                flex justify-center items-center 
                ${index % 2 !== 0 ? 'md:order-last' : ''}
              `}>
                <div className="bg-muted/5 rounded-full p-8">
                  {category.icon}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">
                  {category.title}
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  {category.description}
                </p>
                <div className="space-y-6">
                  {category.features.map((feature) => (
                    <div 
                      key={feature.name} 
                      className="flex items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      {feature.icon}
                      <div>
                        <h3 className="font-semibold text-primary mb-1">
                          {feature.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-muted/5 py-16">
          <div className="container mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Additional Platform Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Beyond core features, EZSports RP offers a range of advanced 
              tools to support your sports management needs.
            </p>
          </div>
          <div className="container mx-auto grid md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature) => (
              <div 
                key={feature.title}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all"
              >
                <div className="flex justify-center items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-primary ml-4">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section 
          className="bg-gradient-to-br from-primary/10 to-primary/5 py-16 text-center"
        >
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Ready to Elevate Your Sports Management?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the power of comprehensive sports management technology. 
              Start your journey with EZSports RP today.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="shadow-xl">
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg" className="shadow-xl">
                Request Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterHome />
    </>
  );
}
