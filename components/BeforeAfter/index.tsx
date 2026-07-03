import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export const BeforeAfter = ({ before, after }: { before: string, after: string }) => (
  <div className="rounded-3xl overflow-hidden border border-white/10">
    <ReactCompareSlider
      itemOne={<ReactCompareSliderImage src={before} alt="Before" />}
      itemTwo={<ReactCompareSliderImage src={after} alt="After" />}
    />
  </div>
);