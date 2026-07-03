import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fungsi untuk menggabungkan class Tailwind CSS dengan rapi
 * Mengatasi konflik class (misal: p-2 dan p-4)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}