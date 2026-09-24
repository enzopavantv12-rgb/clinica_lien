import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Padrao shadcn: junta classes e resolve conflitos do Tailwind (a ultima vence). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
