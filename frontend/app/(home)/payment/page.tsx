"use client";

import { useState } from "react";
import { Button } from "@/components/controls/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavbarHome } from "@/components/layout/navbars/navbar-home";
import { FooterHome } from "@/components/layout/footers/footer-home";
import { CreditCard, Lock } from "lucide-react";

export default function PaymentPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const formatCardNumber = (value: string) => {
    // Remove non-digits
    const cleanedValue = value.replace(/\D/g, '');
    
    // Format with spaces every 4 digits
    const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formattedValue.slice(0, 19); // Limit to 16 digits + 3 spaces
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual payment processing
    alert("Payment processing is not implemented in this demo.");
  };

  return (
    <>
      <NavbarHome />
      
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-white shadow-xl rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-primary text-center">
            Complete Your Pro Plan Purchase
          </h1>

          <div className="mb-8 bg-primary/5 rounded-lg p-4 flex items-center">
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-primary">
                EZSportsRP Pro Plan
              </h2>
              <p className="text-muted-foreground">
                {isAnnual 
                  ? "$39/mo, billed annually ($468/year)" 
                  : "$49/mo, billed monthly"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Monthly</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isAnnual}
                  onChange={() => setIsAnnual(!isAnnual)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
              <span className="text-muted-foreground">Annually</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input 
                id="cardName"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input 
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  required
                />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  maxLength={5}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Input 
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={3}
                    required
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-4 flex items-center">
              <Lock className="mr-3 text-primary" />
              <p className="text-muted-foreground text-sm">
                Your payment information is encrypted and securely processed.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              Complete Payment
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center text-muted-foreground">
          <p>
            By completing this purchase, you agree to our 
            {" "}
            <a href="/terms" className="underline hover:text-primary">
              Terms of Service
            </a>
            {" "}
            and 
            {" "}
            <a href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>

      <FooterHome />
    </>
  );
}
