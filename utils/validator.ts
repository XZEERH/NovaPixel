/**
 * Validator untuk mengecek tipe dan ukuran file
 */
export const validateMedia = (file: File, type: 'image' | 'video') => {
  const maxSizeImage = 10 * 1024 * 1024; // 10MB
  const maxSizeVideo = 50 * 1024 * 1024; // 50MB
  
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const allowedVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-matroska'];

  if (type === 'image') {
    if (!allowedImageTypes.includes(file.type)) {
      throw new Error('Format gambar tidak didukung. Gunakan JPG, PNG, atau WEBP.');
    }
    if (file.size > maxSizeImage) {
      throw new Error('Ukuran gambar terlalu besar. Maksimal 10MB.');
    }
  } else {
    if (!allowedVideoTypes.includes(file.type)) {
      throw new Error('Format video tidak didukung. Gunakan MP4, MOV, atau MKV.');
    }
    if (file.size > maxSizeVideo) {
      throw new Error('Ukuran video terlalu besar. Maksimal 50MB.');
    }
  }

  return true;
};