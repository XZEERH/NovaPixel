"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Ini komponen Image Next.js
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles, 
  Image as LucideImage, // GUNAKAN ALIAS INI
  Video 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Image HD", href: "/image-hd", icon: LucideImage }, // Update di sini
  { name: "Video HD", href: "/video-hd", icon: Video },
];

const comingSoonLinks = [
  { name: "AI Face Enhance", icon: Sparkles },
  { name: "AI Restore", icon: Sparkles },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-[100] transition-all duration-300 border-b",
      scrolled ? "bg-[#0a0a0c]/80 backdrop-blur-lg border-white/10 py-3" : "bg-transparent border-transparent py-5"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Image src="/logo/novapixel-logo.png" alt="NovaPixel Logo" fill className="object-contain" priority />
            <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full -z-10 group-hover:bg-purple-500/40 transition-colors" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">Nova<span className="text-purple-500">Pixel</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={cn("text-sm font-medium transition-colors hover:text-purple-400", pathname === link.href ? "text-purple-500" : "text-gray-400")}>
                {link.name}
              </Link>
            ))}
          </div>
          <Link href="/image-hd" className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-purple-600 hover:text-white transition-all">Get Started</Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-400">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-[#0a0a0c] border-l border-white/10 z-[100] p-8 md:hidden">
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold">Menu</span>
              <button onClick={() => setIsOpen(false)}><X size={24} /></button>
            </div>
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="flex items-center gap-3 text-lg font-bold">
                  <link.icon size={20} /> {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}