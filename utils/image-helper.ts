/**
 * Mendapatkan resolusi gambar
 */
export const getImageResolution = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve(`${img.width} x ${img.height}`);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};