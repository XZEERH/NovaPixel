export const validateFile = (file: File, type: 'image' | 'video') => {
  const maxSize = type === 'image' ? 10 * 1024 * 1024 : 50 * 1024 * 1024; // 10MB vs 50MB
  const allowedImage = ['image/jpeg', 'image/png', 'image/webp'];
  const allowedVideo = ['video/mp4', 'video/quicktime', 'video/x-matroska'];

  if (file.size > maxSize) throw new Error(`File too large. Max ${maxSize / (1024*1024)}MB allowed.`);
  
  if (type === 'image' && !allowedImage.includes(file.type)) throw new Error('Invalid image format (JPG, PNG, WEBP only).');
  
  if (type === 'video' && !allowedVideo.includes(file.type)) throw new Error('Invalid video format (MP4, MOV, MKV only).');

  return true;
};