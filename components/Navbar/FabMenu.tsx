"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { EllipsisVertical, Sparkles, Layers3, BookOpenText, Image as ImageIcon, Video } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const items = [
  { label: "Get Started", href: ROUTES.ENHANCER, icon: Layers3 },
  { label: "View Chase", href: ROUTES.ABOUT, icon: BookOpenText },
  { label: "Image HD", href: ROUTES.IMAGE_HD, icon: ImageIcon },
  { label: "Video HD", href: ROUTES.VIDEO_HD, icon: Video },
];

export default function FabMenu() {
  const [open, setOpen] = useState(false);

  const quickLabel = useMemo(() => (open ? "Close quick menu" : "Open quick menu"), [open]);

  return (
    <div className="fixed bottom-5 right-5 z-[120]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="mb-4 w-[min(86vw,18rem)] overflow-hidden rounded-[1.5rem] border-[3px] border-black/90 bg-[#11111a]/96 p-3 shadow-[10px_10px_0_#000,0_0_35px_rgba(168,85,247,0.16)] backdrop-blur-2xl"
          >
            <div className="mb-3 flex items-center justify-between rounded-[1.1rem] border-2 border-black/90 bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/15 px-4 py-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-fuchsia-200/80">
                  Quick Actions
                </p>
                <p className="mt-1 text-sm font-bold text-white">NovaPixel shortcuts</p>
              </div>
              <Sparkles className="text-cyan-300" size={18} />
            </div>

            <div className="grid gap-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-[1.1rem] border-2 border-black/90 px-4 py-3 text-sm font-bold shadow-[6px_6px_0_#000] transition-all hover:-translate-y-0.5",
                    item.label === "View Chase"
                      ? "bg-white/[0.08] text-white hover:bg-white/[0.14]"
                      : "bg-white text-black hover:bg-fuchsia-300"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={16} />
                    {item.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">Open</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={quickLabel}
        className="group flex h-16 w-16 items-center justify-center rounded-[1.5rem] border-[3px] border-black/90 bg-[linear-gradient(135deg,#ffffff_0%,#f3e8ff_45%,#c4b5fd_100%)] text-black shadow-[10px_10px_0_#000,0_0_35px_rgba(168,85,247,0.2)] transition-all hover:-translate-y-0.5 hover:rotate-[-2deg]"
      >
        <EllipsisVertical size={28} className="transition-transform group-hover:scale-105" />
      </button>
    </div>
  );
}
