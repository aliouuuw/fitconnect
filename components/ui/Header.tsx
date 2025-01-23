"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from "@/contexts/auth-context";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  // Only show the UI after mounting to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show header if user is logged in or on dashboard routes
  if (user || pathname.startsWith('/dashboard')) {
    return null;
  }

  // Don't render the theme toggle until mounted
  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <header className="bg-background p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold hover:opacity-80 transition-opacity"
        >
          FitConnect
        </Link>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} variant="ghost">
            {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {pathname !== '/login' && (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
          {pathname !== '/register' && (
            <Link href="/register">
              <Button variant="outline">Sign Up</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 