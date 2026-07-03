/**
 * Mendapatkan durasi video
 */
export const getVideoMetadata = (file: File): Promise<{ duration: string; resolution: string }> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const dur = Math.round(video.duration);
      resolve({
        duration: `${dur}s`,
        resolution: `${video.videoWidth}x${video.videoHeight}`
      });
    };
    video.src = URL.createObjectURL(file);
  });
};