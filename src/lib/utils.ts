import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const currentInMilliseconds = Date.now();
export const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

export const convertStringToPercentage = (value: string): string => {
  const numValue = parseFloat(value);

  return isNaN(numValue) ? '0%' : `${(numValue * 100).toFixed(2)}%`;
};

export const percentageChange = (current: string, previous: string): string => {
  // in here we need to calculate the difference of percentage between current and previous values
  const currentValue = parseFloat(current);
  const previousValue = parseFloat(previous);

  if (isNaN(currentValue) || isNaN(previousValue) || previousValue === 0) {
    return '0%';
  }

  const change = (previousValue - currentValue) * 100;

  if (change > 0) {
    return `+${change.toFixed(2)}%`;
  }

  return `${change.toFixed(2)}%`;
};

export function isNegativeNumber(str: string): boolean {
  const num = parseFloat(str);

  return !isNaN(num) && num < 0;
}
