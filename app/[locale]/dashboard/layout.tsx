"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  Menu,
  X
} from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useTheme } from "next-themes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("common");
  const { user, logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/dashboard">
                <h1 className="text-2xl font-bold">{t("appName")}</h1>
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                variant="ghost"
              >
                {theme === "light" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <LanguageSwitcher />
              <Link href="/dashboard">
                <Button variant="ghost">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  {t("dashboard")}
                </Button>
              </Link>
              <Link href="/dashboard/classes">
                <Button variant="ghost">
                  <Calendar className="mr-2 h-4 w-4" />
                  {t("classes")}
                </Button>
              </Link>
              <Link href="/dashboard/clients">
                <Button variant="ghost">
                  <Users className="mr-2 h-4 w-4" />
                  {t("clients")}
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                {t("logout")}
              </Button>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {theme === "light" ? (
                    <Sun className="h-4 w-4 mr-2" />
                  ) : (
                    <Moon className="h-4 w-4 mr-2" />
                  )}
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </Button>
                <div className="py-2">
                  <LanguageSwitcher />
                </div>
                <Link href="/dashboard" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    {t("dashboard")}
                  </Button>
                </Link>
                <Link href="/dashboard/classes" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    {t("classes")}
                  </Button>
                </Link>
                <Link href="/dashboard/clients" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    {t("clients")}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
