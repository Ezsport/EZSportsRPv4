"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/services/auth.service';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export function ProtectedRoute({ 
  children, 
  requiredRoles 
}: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = AuthService.isAuthenticated();
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      toast.error('Please log in to access this page');
      router.push('/login');
      return;
    }

    // If specific roles are required, check user role
    if (requiredRoles) {
      const user = AuthService.getCurrentUser();
      
      if (!user || !requiredRoles.includes(user.role)) {
        // Redirect if user doesn't have required role
        toast.error('You do not have permission to access this page');
        router.push('/dashboard');
        return;
      }
    }
  }, [router]);

  // Render children only if authenticated and authorized
  return <>{children}</>;
}
