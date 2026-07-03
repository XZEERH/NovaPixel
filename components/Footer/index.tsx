import { Sparkles, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0c] py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-purple-500" />
              <span className="text-xl font-bold">NovaPixel</span>
            </div>
            <p className="text-gray-500 max-w-sm">
              The world's most advanced AI media enhancement suite. 
              Transform your low-quality content into cinematic masterpieces.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="/image-hd" className="hover:text-purple-400">Image HD</a></li>
              <li><a href="/video-hd" className="hover:text-purple-400">Video HD</a></li>
              <li className="opacity-50">API Access (Soon)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Connect</h4>
            <div className="flex gap-4 text-gray-500">
              <Github className="hover:text-white cursor-pointer" size={20} />
              <Twitter className="hover:text-white cursor-pointer" size={20} />
              <Instagram className="hover:text-white cursor-pointer" size={20} />
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} NovaPixel AI. All rights reserved. Built for the future of media.
        </div>
      </div>
    </footer>
  );
}