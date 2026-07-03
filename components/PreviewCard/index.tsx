import { GlassCard } from "../UI/GlassCard";
import { BeforeAfter } from "../BeforeAfter";
import DownloadButton from "../UI/DownloadButton";

interface PreviewCardProps {
  original: string;
  enhanced: string;
  type: 'image' | 'video';
}

export const PreviewCard = ({ original, enhanced, type }: PreviewCardProps) => (
  <GlassCard className="space-y-6">
    <BeforeAfter before={original} after={enhanced} />
    <div className="flex justify-center pt-4">
      <DownloadButton url={enhanced} type={type} />
    </div>
  </GlassCard>
);