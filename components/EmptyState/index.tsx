import { Info } from "lucide-react";

export const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-gray-500">
    <div className="p-4 bg-white/5 rounded-full mb-4">
      <Info size={32} />
    </div>
    <p className="text-center italic">{message}</p>
  </div>
);