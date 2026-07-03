import { GlassCard } from '../UI/GlassCard';
import { Upload } from 'lucide-react';

export const UploadCard = ({ onFileChange, title, desc, accept }: any) => (
  <GlassCard className="border-dashed border-2 flex flex-col items-center py-16">
    <Upload size={48} className="text-purple-500 mb-4" />
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-400 mb-6">{desc}</p>
    <input type="file" id="fileIn" hidden onChange={onFileChange} accept={accept} />
    <label htmlFor="fileIn" className="bg-purple-600 px-8 py-3 rounded-full font-bold cursor-pointer hover:bg-purple-700">
      Select File
    </label>
  </GlassCard>
);