import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FabMenu from "@/components/Navbar/FabMenu";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "NovaPixel | Neon Brutalism AI Enhancer",
  description: "Enhance every pixel with a premium neon brutalism experience.",
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
