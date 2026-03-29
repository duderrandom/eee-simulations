import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/ui/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EEE Simulations",
  description: "Interactive physics and engineering simulations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white overflow-hidden h-screen w-screen flex`}>
        {/* Persistent Sidebar */}
        <Sidebar />
        
        {/* Dynamic Page Content */}
        <div className="flex-1 h-full relative">
          {children}
        </div>
      </body>
    </html>
  );
}