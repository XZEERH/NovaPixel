import Link from "next/link";
import type { ComponentType } from "react";
import { Sparkles, Github, Instagram, Send } from 'lucide-react';
import { ROUTES } from "@/constants/routes";

type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/XZEERH", icon: Github },
  { label: "Telegram", href: "https://t.me/@RazeerhYa", icon: Send },
  { label: "Instagram", href: "https://www.instagram.com/@razeerh.edukasi", icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@razeerh.edukasi", icon: TikTokIcon },
];

function TikTokIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M16.5 3.5c.7 1.9 1.9 3.2 4 3.5v3.2c-1.6 0-3.1-.5-4-1.1v6.5c0 4-3.2 7.2-7.2 7.2S2.1 19.6 2.1 15.6s3.2-7.2 7.2-7.2c.3 0 .6 0 .9.1v3.4c-.3-.1-.6-.1-.9-.1-2.1 0-3.8 1.7-3.8 3.8s1.7 3.8 3.8 3.8 3.8-1.7 3.8-3.8V3.5h3.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t-[3px] border-black/90 bg-[#0b0b12] py-12 shadow-[0_-8px_0_#000]">
      <div className="container mx-auto px-6">
        <div className="mb-12 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="text-white/80" />
              <span className="text-xl font-black tracking-tight">NovaPixel</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/60">
              Tingkatkan kualitas setiap gambar dengan AI generasi terbaru. Upscale resolusi, pertajam detail, hilangkan noise, dan ubah foto biasa menjadi hasil yang lebih profesional hanya dengan satu klik.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-white/70">Product</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href={ROUTES.ENHANCER} className="hover:text-white">All Enhancers</Link></li>
              <li><Link href={ROUTES.IMAGE_HD} className="hover:text-white">Image HD</Link></li>
              <li><Link href={ROUTES.VIDEO_HD} className="hover:text-white">Video HD</Link></li>
              <li><Link href={ROUTES.ABOUT} className="hover:text-white">About / Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-white/70">Connect</h4>
            <div className="flex flex-wrap gap-3 text-white/70">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={item.label}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border-2 border-black/90 bg-white/5 shadow-[5px_5px_0_#000] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black"
                >
                  <item.icon size={20} className="transition-transform duration-200 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t-2 border-black/90 pt-8 text-center text-xs font-medium uppercase tracking-[0.35em] text-white/40">
          © {new Date().getFullYear()} NovaPixel. Powered By Razeerh.
        </div>
      </div>
    </footer>
  );
}
