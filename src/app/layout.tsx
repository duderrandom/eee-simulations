import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/ui/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EEE Simulations | Interactive Learning Platform",
  description: "An interactive simulation platform for understanding EEE concepts like batteries, fuel cells, EVs, and energy systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#0a0f1a] text-slate-100 overflow-hidden h-screen w-screen flex`}>
        {/* Persistent Sidebar Navigation */}
        <Sidebar />

        {/* Dynamic Page Content */}
        <div className="flex-1 h-full relative overflow-auto">
          {children}
        </div>
      </body>
    </html>
  );
}