import Link from 'next/link';
import { GlassCard } from '@/components/UI/GlassCard';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <GlassCard className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-purple-500">404</h1>
        <p className="text-gray-400 mb-8">The page you are looking for has vanished into pixels.</p>
        <Link href="/" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all">
          Back to Reality
        </Link>
      </GlassCard>
    </div>
  );
}