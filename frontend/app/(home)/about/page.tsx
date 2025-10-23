"use client";

import { Button } from "@/components/controls/button";
import { 
  Trophy, 
  Users, 
  Target, 
  Globe, 
  Rocket, 
  Heart 
} from "lucide-react";
import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import { FooterHome } from "@/components/layout/footers/footer-home";

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Trophy className="w-12 h-12 text-primary" />,
      title: "Excellence",
      description: "Committed to delivering top-tier sports management solutions that empower teams to achieve their full potential."
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Collaboration",
      description: "Believing in the power of teamwork, both in sports and in our approach to technology and customer support."
    },
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "Innovation",
      description: "Continuously pushing boundaries to create cutting-edge tools that transform sports management."
    },
    {
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "Accessibility",
      description: "Making advanced sports management technology available to teams of all sizes and levels."
    }
  ];

  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "Founder & CEO",
      bio: "Former professional athlete with 15 years of sports management experience.",
      image: "/team/alex.jpg"
    },
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      bio: "Tech innovator with a passion for sports analytics and software development.",
      image: "/team/sarah.jpg"
    },
    {
      name: "Michael Thompson",
      role: "Head of Product",
      bio: "Sports coach turned product strategist, bridging the gap between athletes and technology.",
      image: "/team/michael.jpg"
    },
    {
      name: "Elena Petrova",
      role: "Lead Data Scientist",
      bio: "Expert in sports performance analytics and machine learning.",
      image: "/team/elena.jpg"
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
              Revolutionizing Sports Management
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md mb-8">
              EZSports RP was born from a simple belief: technology can transform 
              how sports teams operate, communicate, and achieve success.
            </p>
            <Button size="lg" className="shadow-xl">
              Our Mission
            </Button>
          </div>
        </section>

        <section className="container mx-auto py-16 px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Our Story
              </h2>
              <p className="text-xl text-muted-foreground mb-4">
                Founded in 2022, EZSports RP emerged from the frustration of coaches 
                and team managers struggling with fragmented management tools.
              </p>
              <p className="text-lg text-muted-foreground">
                Our team of athletes, coaches, and tech experts came together to 
                create a comprehensive platform that simplifies sports management, 
                enhances team performance, and brings technology and sports together.
              </p>
            </div>
            <div>
              <img 
                src="/about_bg_1.jpg" 
                alt="EZSports RP Story" 
                className="rounded-xl shadow-2xl object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </section>

        <section className="bg-muted/5 py-16">
          <div className="container mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that drive our innovation and commitment to sports management.
            </p>
          </div>
          <div className="container mx-auto grid md:grid-cols-4 gap-8">
            {coreValues.map((value) => (
              <div 
                key={value.title} 
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind EZSports RP, united by a love for 
              sports and technology.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.name} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <img 
                  src={"/about_bg_5.jpg"} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section 
          className="bg-gradient-to-br from-primary/10 to-primary/5 py-16 text-center"
        >
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Join Our Journey
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Whether you're a small local team or a professional organization, 
              we're here to support your success through innovative technology.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="shadow-xl">
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg" className="shadow-xl">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterHome />
    </>
  );
}
