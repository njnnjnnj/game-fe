import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatValue = (value: number): string => {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2).replace(/(\.00|0)$/, "") + "B";
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2).replace(/(\.00|0)$/, "") + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(2).replace(/(\.00|0)$/, "") + "K";
  }
  return value.toString();
};
