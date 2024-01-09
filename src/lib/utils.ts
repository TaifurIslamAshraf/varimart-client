import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const serverApi = process.env.NEXT_PUBLIC_SERVER_API as string;
export const serverUrl = process.env.SERVER_URL as string;
