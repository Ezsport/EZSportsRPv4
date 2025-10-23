"use client";

import { Button } from "@/components/controls/button";
import { FooterHome } from "@/components/layout/footers/footer-home";
import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import { Carousel } from "@/components/ui/carousel";
import { Eye, Info, Link, Play } from "lucide-react";

export default function Home() {
  return (
    <>
      <NavbarHome />

      <main className="container-fluid mx-auto space-y-8">
        <section
          className="relative mx-auto bg-cover bg-center bg-no-repeat overflow-hidden min-h-[550px] m-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/bg.jpg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-8 p-8 lg:p-16 min-h-[550px]">
            <div className="space-y-6 z-10 relative text-left">
              <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
                Manage Your Sports Teams Like Never Before
              </h1>
              <p className="text-xl text-white/90 drop-shadow-md ">
                The all-in-one platform for coaches, team managers, and
                referees. Streamline operations, analyze performance, and focus
                on what matters most - winning.
              </p>
              <div className="flex space-x-4 justify-center">
                <Button
                  size="lg"
                  className="shadow-xl bg-primary hover:bg-primary/90"
                  icon={<Play />}
                >
                  Get Started
                </Button>
                <Button
                  icon={<Eye />}
                  variant="outline"
                  size="lg"
                  className="shadow-xl"
                >
                  View Demo
                </Button>
                <Button
                  icon={<Info />}
                  variant="secondary"
                  size="lg"
                  className="shadow-xl bg-primary/30 text-white hover:bg-primary/40"
                >
                  Learn More
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.9/5</div>
                  <div className="text-sm text-white/80">User Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-sm text-white/80">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-sm text-white/80">Sports Supported</div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <video
                src="/intro.mp4"
                className="rounded-xl border-16 border-white/20 object-cover shadow-2xl"
                // autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </section>

        <section className="container-fluid mx-auto px-4 py-16 bg-muted/10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">5,000+</div>
              <div className="text-sm text-muted-foreground">Active Teams</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">50,000+</div>
              <div className="text-sm text-muted-foreground">
                Registered Players
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">1,000+</div>
              <div className="text-sm text-muted-foreground">
                Certified Coaches
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">15,000+</div>
              <div className="text-sm text-muted-foreground">Games Managed</div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Powerful Features for Sports Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              EZSports RP provides comprehensive tools to streamline team
              operations, enhance performance, and simplify sports management.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all">
              <div className="mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Performance Tracking
              </h3>
              <p className="text-muted-foreground">
                Detailed analytics and performance metrics for players and
                teams.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all">
              <div className="mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Management</h3>
              <p className="text-muted-foreground">
                Seamless roster management, scheduling, and communication tools.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all">
              <div className="mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Game Management</h3>
              <p className="text-muted-foreground">
                Comprehensive game scheduling, scoring, and reporting system.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 items-center gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Comprehensive Player Development
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Our advanced tracking and analysis tools help players understand
                their strengths, identify areas for improvement, and create
                personalized development plans.
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Personalized Performance Metrics
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Skill Progression Tracking
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Goal Setting and Tracking
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <Carousel
                images={[
                  "about_bg_1.jpg",
                  "about_bg_2.jpg",
                  "about_bg_4.jpg",
                  "about_bg_5.jpg",
                ]}
                autoPlayInterval={3000}
                className="my-8"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 text-primary">
              Trusted by Sports Professionals
            </h2>
            <div className="grid md:grid-cols-5 gap-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-16 w-16 text-muted-foreground"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-16 w-16 text-muted-foreground"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8m4-4H8" />
                </svg>
              </div>
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-16 w-16 text-muted-foreground"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-16 w-16 text-muted-foreground"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-16 w-16 text-muted-foreground"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 items-center gap-12">
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <Carousel
                images={[
                  "about_bg_1.jpg",
                  "about_bg_2.jpg",
                  "about_bg_4.jpg",
                  "about_bg_5.jpg",
                ]}
                autoPlayInterval={3000}
                className="my-8"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Seamless Team Collaboration
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Break down communication barriers and create a unified platform
                where coaches, managers, and players can interact effortlessly.
              </p>
              <div className="space-y-4">
                <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-primary mb-2">
                    Real-time Communication
                  </h3>
                  <p className="text-muted-foreground">
                    Instant messaging and notification systems
                  </p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-primary mb-2">
                    Shared Dashboards
                  </h3>
                  <p className="text-muted-foreground">
                    Transparent performance and strategy tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 text-primary">
              Pricing That Grows With You
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  Starter
                </h3>
                <p className="text-4xl font-bold mb-6">$0</p>
                <ul className="space-y-4 mb-8 text-muted-foreground">
                  <li>Up to 5 Team Members</li>
                  <li>Basic Performance Tracking</li>
                  <li>Community Support</li>
                </ul>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </div>
              <div className="bg-primary text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all scale-105">
                <h3 className="text-2xl font-semibold mb-4">Pro</h3>
                <p className="text-4xl font-bold mb-6">$49/mo</p>
                <ul className="space-y-4 mb-8">
                  <li>Unlimited Team Members</li>
                  <li>Advanced Analytics</li>
                  <li>Priority Support</li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full text-primary hover:bg-white/70"
                >
                  Choose Pro
                </Button>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  Enterprise
                </h3>
                <p className="text-4xl font-bold mb-6">Custom</p>
                <ul className="space-y-4 mb-8 text-muted-foreground">
                  <li>Unlimited Users</li>
                  <li>Full Platform Access</li>
                  <li>Dedicated Support</li>
                </ul>
                <Button className="w-full">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Ready to Transform Your Sports Management?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams, coaches, and sports professionals who are
              revolutionizing their approach to sports management.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="shadow-xl">
                <Link href="/register">Start Free Trial</Link>
              </Button>
              <Button variant="secondary" size="lg" className="shadow-xl">
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterHome />
    </>
  );
}
