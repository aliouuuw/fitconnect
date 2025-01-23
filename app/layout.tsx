import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";
import { ClassProvider } from "@/contexts/class-context";
import { ClientProvider } from "@/contexts/client-context";
import Header from "@/components/ui/Header";
import StreamVideoProvider from "@/providers/StreamClientProvider";

// These providers are mocked for now

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitConnect - Online Gym Coaching Platform",
  description:
    "Professional online coaching platform connecting fitness trainers with clients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
              <ClassProvider>
                <ClientProvider>
                  <Header />
                  <StreamVideoProvider>
                    {children}
                  </StreamVideoProvider>
                  <Toaster />
                </ClientProvider>
              </ClassProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
