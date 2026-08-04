import Link from "next/link";
import { Sparkles, Github, Twitter, Instagram } from 'lucide-react';
import { ROUTES } from "@/constants/routes";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-[3px] border-black/90 bg-[#0b0b12] py-12 shadow-[0_-8px_0_#000]">
      <div className="container mx-auto px-6">
        <div className="mb-12 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="text-fuchsia-400" />
              <span className="text-xl font-black tracking-tight">NovaPixel</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/60">
              Premium AI enhancer untuk image dan video dengan tampilan neon brutalism, navigasi cepat, dan alur pakai yang lebih jelas.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-white/70">Product</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href={ROUTES.ENHANCER} className="hover:text-fuchsia-300">All Enhancers</Link></li>
              <li><Link href={ROUTES.IMAGE_HD} className="hover:text-fuchsia-300">Image HD</Link></li>
              <li><Link href={ROUTES.VIDEO_HD} className="hover:text-fuchsia-300">Video HD</Link></li>
              <li><Link href={ROUTES.ABOUT} className="hover:text-fuchsia-300">About / Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-white/70">Connect</h4>
            <div className="flex gap-4 text-white/60">
              <Github className="cursor-pointer transition-colors hover:text-white" size={20} />
              <Twitter className="cursor-pointer transition-colors hover:text-white" size={20} />
              <Instagram className="cursor-pointer transition-colors hover:text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="border-t-2 border-black/90 pt-8 text-center text-xs font-medium uppercase tracking-[0.35em] text-white/40">
          © {new Date().getFullYear()} NovaPixel. Built with neon brutalism.
        </div>
      </div>
    </footer>
  );
}
