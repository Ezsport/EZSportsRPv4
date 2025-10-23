"use client";

import { Button } from "@/components/controls/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  Headphones 
} from "lucide-react";
import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import { FooterHome } from "@/components/layout/footers/footer-home";

declare global {
  interface Window {
    $crisp?: any[];
  }
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8 text-primary" />,
      title: "Email",
      description: "support@ezsportsrp.com",
      link: "mailto:support@ezsportsrp.com"
    },
    {
      icon: <Phone className="w-8 h-8 text-primary" />,
      title: "Phone",
      description: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Address",
      description: "123 Sports Tech Lane, San Francisco, CA 94105",
      link: "https://maps.google.com/?q=123+Sports+Tech+Lane,San+Francisco,CA+94105"
    }
  ];

  const supportHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM PST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM PST" },
    { day: "Sunday", hours: "Closed" }
  ];

  const openChat = () => {
    // // @ts-ignore
    // if (window.$crisp) {
    //   // @ts-ignore
    //   window.$crisp.push(['do', 'chat:open']);
    // }
  };

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
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md mb-8">
              We're here to help you transform your sports management experience. 
              Reach out with any questions or inquiries.
            </p>
          </div>
        </section>

        <section className="container mx-auto py-16 grid md:grid-cols-2 gap-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Contact Information
            </h2>
            <div className="space-y-6">
              {contactMethods.map((method) => (
                <div 
                  key={method.title} 
                  className="flex items-center space-x-4 bg-muted/5 p-4 rounded-xl hover:bg-muted/10 transition-all"
                >
                  <div>{method.icon}</div>
                  <div>
                    <h3 className="font-semibold text-primary">{method.title}</h3>
                    <a 
                      href={method.link} 
                      className="text-muted-foreground hover:text-primary"
                    >
                      {method.description}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-4 text-primary flex items-center">
                <Clock className="mr-3 w-6 h-6" /> Support Hours
              </h3>
              <div className="space-y-2 text-muted-foreground">
                {supportHours.map((hours) => (
                  <div key={hours.day} className="flex justify-between">
                    <span>{hours.day}</span>
                    <span>{hours.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input 
                  placeholder="First Name" 
                  className="w-full" 
                />
                <Input 
                  placeholder="Last Name" 
                  className="w-full" 
                />
              </div>
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="w-full" 
              />
              <Input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full" 
              />
              <Textarea 
                placeholder="Your Message" 
                rows={6} 
                className="w-full" 
              />
              <Button 
                size="lg" 
                className="w-full"
                icon={<Send className="mr-2" />}
              >
                Send Message
              </Button>
            </form>
          </div>
        </section>

        <section className="bg-muted/5 py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">
              Our Location
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0357346378!2d-122.39730052410645!3d37.789505572051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806816f7a979%3A0x6d428b70c22aa7b3!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1697500000000!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        <section 
          className="bg-gradient-to-br from-primary/10 to-primary/5 py-16 text-center"
        >
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our support team is ready to help you with any urgent questions 
              or technical support needs.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                size="lg" 
                className="shadow-xl"
                icon={<Headphones className="mr-2" />}
                onClick={openChat}
              >
                Live Chat Support
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="shadow-xl"
              >
                Schedule a Call
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterHome />
    </>
  );
}
