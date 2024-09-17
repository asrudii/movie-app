import clsx, { ClassValue } from "clsx"; // Importing clsx for conditional class name merging
import { twMerge } from "tailwind-merge"; // Importing twMerge for merging Tailwind CSS classes

// Function to merge class names using clsx and then merge Tailwind CSS classes using twMerge
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs)); // First merge class names with clsx, then merge Tailwind CSS classes with twMerge
};