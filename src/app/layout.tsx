import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TopProgress } from "@/components/ui/top-progress";
import { ServiceWorkerRegister } from "@/components/pwa/service-worker-register";
import { InstallPrompt } from "@/components/pwa/install-prompt";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZP Barber",
  description: "SaaS de gestão para barbearias",
  applicationName: "ZP Barber",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ZP Barber",
    startupImage: [{ url: "/apple-splash.svg" }],
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/symbol.png", type: "image/png" },
    ],
    apple: [
      { url: "/symbol.png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#2970ff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const initialTheme: "light" | "dark" = themeCookie === "dark" ? "dark" : "light";

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${geistMono.variable} ${initialTheme} h-full antialiased`}
      style={{ colorScheme: initialTheme }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider>
          <TopProgress />
          {children}
          <Toaster position="top-right" expand />
          <ServiceWorkerRegister />
          <InstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  );
}
