"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  Image as LucideImage,
  Video,
  Layers3,
  BookOpenText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

const navLinks = [
  { name: "Enhancer", href: ROUTES.ENHANCER, icon: Layers3 },
  { name: "Image HD", href: ROUTES.IMAGE_HD, icon: LucideImage },
  { name: "Video HD", href: ROUTES.VIDEO_HD, icon: Video },
  { name: "About", href: ROUTES.ABOUT, icon: BookOpenText },
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
    <nav
      className={cn(
        "fixed top-0 w-full z-[100] border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-[#09090f]/85 py-3 backdrop-blur-2xl shadow-[0_8px_35px_rgba(0,0,0,0.35)]"
          : "border-transparent bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href={ROUTES.HOME} className="group flex items-center gap-3">
          <div className="relative h-11 w-11 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
            <Image
              src="/logo/novapixel-logo.png"
              alt="NovaPixel Logo"
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 -z-10 rounded-full bg-white/10 blur-xl transition-colors group-hover:bg-white/20" />
          </div>
          <div className="leading-none">
            <span className="block text-2xl font-black tracking-tighter text-white">
              Nova<span className="text-white">Pixel</span>
            </span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.35em] text-white/45">
              Powered By AI Enhancer
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group flex items-center gap-2 text-sm font-semibold transition-colors",
                    active ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  <link.icon size={14} className={cn("transition-transform group-hover:-translate-y-0.5", active && "text-white")} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <Link
            href={ROUTES.ENHANCER}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-black/90 bg-white px-6 py-2.5 text-sm font-black text-black shadow-[8px_8px_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white/90"
          >
            Get Started
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="rounded-full border-2 border-black/90 bg-white/95 p-3 text-black shadow-[6px_6px_0_#000] transition-transform hover:-translate-y-0.5 md:hidden"
          aria-label="Open menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="fixed right-0 top-0 z-[110] h-full w-[86%] max-w-sm border-l-[3px] border-black/90 bg-[#07070b]/98 p-6 backdrop-blur-2xl md:hidden"
          >
            <div className="mb-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.45em] text-white/70">
                  NovaPixel
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Menu</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full border-2 border-black/90 bg-white/95 p-2 text-black shadow-[6px_6px_0_#000]"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between rounded-[1.25rem] border-2 border-black/90 bg-white/[0.06] px-4 py-4 font-bold shadow-[8px_8px_0_#000] transition-all",
                    pathname === link.href ? "bg-white text-black" : "text-white hover:-translate-y-0.5 hover:bg-white/[0.12]"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <link.icon size={18} />
                    {link.name}
                  </span>
                  <ChevronRight size={16} />
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-[1.4rem] border-2 border-black/90 bg-gradient-to-br from-white/6 to-white/2 p-4 shadow-[8px_8px_0_#000]">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/70">Quick note</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Akses semua tool dari halaman Enhancer, dan baca alur pakainya di halaman About.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
