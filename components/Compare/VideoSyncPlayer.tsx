"use client";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export const VideoSyncPlayer = ({ original, enhanced }: { original: string; enhanced: string }) => {
  const v1 = useRef<HTMLVideoElement>(null);
  const v2 = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!v1.current || !v2.current) return;
    if (playing) {
      v1.current.pause();
      v2.current.pause();
    } else {
      v1.current.play();
      v2.current.play();
    }
    setPlaying(!playing);
  };

  const sync = (e: any) => {
    if (v2.current) v2.current.currentTime = e.target.currentTime;
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative group">
          <span className="absolute top-4 left-4 z-10 bg-black/50 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-white/10">Original</span>
          <video ref={v1} src={original} onTimeUpdate={sync} className="w-full rounded-2xl border border-white/5 shadow-2xl" muted playsInline />
        </div>
        <div className="relative group">
          <span className="absolute top-4 left-4 z-10 bg-purple-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Enhanced</span>
          <video ref={v2} src={enhanced} className="w-full rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/10" muted playsInline />
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={toggle} className="p-5 bg-white text-black rounded-full hover:scale-110 transition-all shadow-xl">
          {playing ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" />}
        </button>
      </div>
    </div>
  );
};