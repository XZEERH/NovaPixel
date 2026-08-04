"use client";
import { useState } from "react";
import { Menu, X, Image as ImageIcon, Video, Layers3, BookOpenText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Enhancer", href: ROUTES.ENHANCER, icon: Layers3 },
    { name: "Image HD", href: ROUTES.IMAGE_HD, icon: ImageIcon },
    { name: "Video HD", href: ROUTES.VIDEO_HD, icon: Video },
    { name: "About", href: ROUTES.ABOUT, icon: BookOpenText },
  ];

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)} className="p-2 text-gray-400">
        <Menu size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-[100] bg-[#09090f] p-6"
          >
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers3 className="text-fuchsia-400" />
                <span className="text-xl font-bold">NovaPixel</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400">
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 rounded-[1.25rem] border-2 border-black/90 bg-white/[0.06] px-4 py-4 text-lg font-bold shadow-[8px_8px_0_#000] transition-all hover:-translate-y-0.5"
                >
                  <item.icon size={20} /> {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
