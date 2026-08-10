import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FabMenu from "@/components/Navbar/FabMenu";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "NovaPixel | AI Upscale Enhancer",
  description: "Enhance The Quality Of Your Images And Video With AI NovaPixel X API Kyuu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-[#09090f] text-white antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FabMenu />
      </body>
    </html>
  );
}
