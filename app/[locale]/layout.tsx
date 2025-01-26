/* eslint-disable @typescript-eslint/no-explicit-any */
import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";
import { ClassProvider } from "@/contexts/class-context";
import { ClientProvider } from "@/contexts/client-context";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getCurrentUser } from "@/actions/auth";

// These providers are mocked for now

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitConnect - Online Gym Coaching Platform",
  description:
    "Professional online coaching platform connecting fitness trainers with clients",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const currentUser = await getCurrentUser();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${instrumentSans.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider currentUser={currentUser}>
              <ClassProvider>
                <ClientProvider>
                  <StreamVideoProvider>
                    <main>
                      {children}
                    </main>
                  </StreamVideoProvider>
                  <Toaster />
                </ClientProvider>
              </ClassProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
