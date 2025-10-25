"use client";

import Link from "next/link";
import { Button } from "@/components/controls/button";
import { Form, FormItem } from "@/components/controls/form";
import { Input } from "@/components/ui/input";
import { Password } from "@/components/controls/password";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import { PanelSocialButtons } from "@/components/panels/panel-social-buttons";

export default function LoginPage() {
  const { login, socialLogin, isLoading } = useAuth();

  const loginSchema = {
    email: {
      label: "Email Address",
      schema: z.string().email("Invalid email address"),
      control: <Input type="email" placeholder="your@email.com" />,
      required: true,
    },
    password: {
      label: "Password",
      schema: z.string().min(6, "Password must be at least 6 characters"),
      control: <Password showToggle={true} />,
      required: true,
    },
  };

  const handleSubmit = async (data: { email: string; password: string }) => {
    await login(data.email, data.password);
  };

  return (
    <div className="relative z-10 bg-white/90 shadow-2xl rounded-2xl overflow-hidden max-w-5xl mx-4">
      <div className="grid md:grid-cols-2">
        {/* Left Column - Text Section */}
        <div
          className="bg-gradient-to-br from-primary to-primary/70 
            text-white p-12 flex flex-col justify-center
            hidden md:flex"
        >
          <h1 className="text-4xl font-bold mb-6">
            Welcome Back to EZSportsRP
          </h1>
          <p className="text-xl mb-6">
            Manage your sports teams, track performance, and streamline
            communication with our comprehensive platform.
          </p>
        </div>

        {/* Right Column - Login Form */}
        <div className="p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary">
            Login to Your Account
          </h2>

          <Form
            config={loginSchema}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <FormItem key="email" />
            <FormItem key="password" />

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2 text-primary focus:ring-primary"
                />
                <label htmlFor="remember" className="text-primary">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </Button>
          </Form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-muted-foreground">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <PanelSocialButtons
            onGoogleClick={() => socialLogin("Google")}
            onFacebookClick={() => socialLogin("Facebook")}
            onLinkedinClick={() => socialLogin("LinkedIn")}
            onGithubClick={() => socialLogin("GitHub")}
            isLoading={isLoading}
          />

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
