import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * it supports conditional part as well as merging of tw
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
