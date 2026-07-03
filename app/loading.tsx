export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0a0a0c] flex flex-col items-center justify-center z-[999]">
      <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4" />
      <h2 className="text-xl font-bold tracking-widest animate-pulse">NOVAPIXEL</h2>
    </div>
  );
}