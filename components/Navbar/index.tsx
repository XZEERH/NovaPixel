"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Sparkles, Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils"; // Pastikan Anda punya helper cn (tailwind-merge + clsx)

const navLinks = [
  { name: "Image HD", href: "/image-hd", icon: ImageIcon },
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

  // Handle effect scroll untuk ganti background navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu mobile saat pindah halaman
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-300 border-b",
        scrolled 
          ? "bg-[#0a0a0c]/80 backdrop-blur-lg border-white/10 py-3" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Image
              src="/logo/novapixel-logo.png"
              alt="NovaPixel Logo"
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full -z-10 group-hover:bg-purple-500/40 transition-colors" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            Nova<span className="text-purple-500">Pixel</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-purple-400",
                  pathname === link.href ? "text-purple-500" : "text-gray-400"
                )}
              >
                {link.name}
              </Link>
            ))}
            {comingSoonLinks.map((link) => (
              <span
                key={link.name}
                className="text-sm font-medium text-gray-600 cursor-not-allowed flex items-center gap-1"
              >
                {link.name}
                <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded uppercase tracking-tighter">Soon</span>
              </span>
            ))}
          </div>

          <Link
            href="/image-hd"
            className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-purple-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-[#0a0a0c] border-l border-white/10 z-[100] p-8 md:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setIsOpen(false)} className="text-gray-400">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Main Tools</p>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 transition-all",
                        pathname === link.href ? "border-purple-500/50 bg-purple-500/5" : ""
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <link.icon size={20} className={pathname === link.href ? "text-purple-500" : "text-gray-400"} />
                        <span className={cn("font-bold", pathname === link.href ? "text-white" : "text-gray-300")}>
                          {link.name}
                        </span>
                      </div>
                      <ChevronRight size={18} className="text-gray-600" />
                    </Link>
                  ))}
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Coming Soon</p>
                  {comingSoonLinks.map((link) => (
                    <div
                      key={link.name}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 opacity-50 grayscale"
                    >
                      <link.icon size={20} className="text-gray-600" />
                      <span className="font-bold text-gray-500">{link.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <Link
                  href="/image-hd"
                  className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                >
                  Start Now <ChevronRight size={18} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}