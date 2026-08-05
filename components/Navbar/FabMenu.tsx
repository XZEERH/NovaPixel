"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, Layers3, BookOpenText, Image as ImageIcon, Video, EllipsisVertical } from "lucide-react";
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
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-5 z-[120] w-[min(88vw,18rem)] overflow-hidden rounded-[1.5rem] border-[3px] border-black/90 bg-[#101018] p-3 shadow-[12px_12px_0_#000,0_0_35px_rgba(168,85,247,0.16)]"
          >
            <div className="mb-3 flex items-center justify-between rounded-[1.1rem] border-2 border-black/90 bg-gradient-to-r from-fuchsia-500/25 to-cyan-400/20 px-4 py-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-fuchsia-100">
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
        aria-expanded={open}
        className="group fixed bottom-5 right-5 z-[121] flex h-16 w-16 items-center justify-center rounded-[1.5rem] border-[3px] border-black/90 bg-white text-black shadow-[12px_12px_0_#000,0_0_30px_rgba(255,255,255,0.14)] transition-all hover:-translate-y-0.5 hover:rotate-[-2deg]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -80, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 80, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <X size={28} className="transition-transform group-hover:scale-105" />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ opacity: 0, rotate: 80, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -80, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <EllipsisVertical size={28} className="transition-transform group-hover:scale-105" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
