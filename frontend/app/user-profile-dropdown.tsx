"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LogOut, 
  Settings, 
  User, 
  HelpCircle, 
  ShieldCheck 
} from 'lucide-react';
import { AuthService } from '@/lib/services/auth.service';

export function UserProfileDropdown() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get current user on component mount
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    try {
      // Call logout method from AuthService
      AuthService.logout();
      
      // Show success toast
      toast.success('Logged out successfully');
      
      // Redirect to login page
      router.push('/login');
    } catch (error) {
      // Handle any logout errors
      toast.error('Error logging out');
      console.error('Logout error:', error);
    }
  };

  // If no user is logged in, return null
  if (!user) return null;

  // Generate avatar fallback from first letters of first and last name
  const avatarFallback = user.firstName && user.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() 
    : user.email[0].toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage 
            src={user.avatarUrl || undefined} 
            alt={`${user.firstName} ${user.lastName}`} 
          />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => router.push('/profile')}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => router.push('/settings')}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        {user.role === 'ADMIN' && (
          <DropdownMenuItem 
            onClick={() => router.push('/admin/dashboard')}
            className="cursor-pointer"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            <span>Admin Dashboard</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => router.push('/help')}
          className="cursor-pointer"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
