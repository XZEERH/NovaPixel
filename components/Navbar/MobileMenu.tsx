"use client";
import { useState } from "react";
import { Menu, X, Image as ImageIcon, Video, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Image HD", href: "/image-hd", icon: ImageIcon },
    { name: "Video HD", href: "/video-hd", icon: Video },
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
            className="fixed inset-0 z-[100] bg-[#0a0a0c] p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <Sparkles className="text-purple-500" />
                <span className="font-bold text-xl">NovaPixel</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400">
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {menuItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-2xl font-semibold hover:text-purple-500 transition-colors"
                >
                  <item.icon size={24} /> {item.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/10 opacity-50">
                <p className="text-sm uppercase tracking-widest mb-4">Coming Soon</p>
                <div className="flex flex-col gap-4">
                  <span className="flex items-center gap-4 text-gray-500">AI Face Enhance</span>
                  <span className="flex items-center gap-4 text-gray-500">AI Restore</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}