import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange>
            <main className="min-h-screen flex flex-col items-center">
                {children}
            </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
