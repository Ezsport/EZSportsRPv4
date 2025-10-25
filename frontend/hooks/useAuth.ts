"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/services/auth.service";
import { toast } from "sonner";

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  role?: string;
}

export const useAuth = (token?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      await AuthService.login(email, password);
      toast.success("Login successful", {
        description: "Redirecting to dashboard...",
      });
      router.push("/app/dashboard");
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";

      toast.error("Login failed", {
        description: errorMessage,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);

    try {
      const response = await AuthService.register(data);
      
      toast.success("Registration successful", {
        description: "Redirecting to login...",
      });

      // Automatically log in after successful registration or redirect to login
      router.push("/login");
      
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";

      toast.error("Registration failed", {
        description: errorMessage,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = (provider: string) => {
    toast.info(`${provider} login simulated`, {
      description: "Social login feature is coming soon!",
    });
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      toast.success("Logged out successfully", {
        description: "Redirecting to login page...",
      });
      router.push("/login");
      return true;
    } catch (error) {
      toast.error("Logout failed", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
      return false;
    }
  };

  useEffect(() => {
    if (token === null) {
      router.replace("/login");
    }
  }, [token, router]);

  return {
    login,
    register,
    socialLogin,
    logout,
    isLoading,
  };
};
