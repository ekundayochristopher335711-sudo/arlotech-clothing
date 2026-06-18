import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "USD"): string {
  const currencyMap: Record<string, { locale: string; currency: string }> = {
    USD: { locale: "en-US", currency: "USD" },
    GBP: { locale: "en-GB", currency: "GBP" },
    EUR: { locale: "de-DE", currency: "EUR" },
    NGN: { locale: "en-NG", currency: "NGN" },
  };

  const config = currencyMap[currency] || currencyMap.USD;

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
  }).format(price);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ARL-${timestamp}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function calculateDiscount(price: number, comparePrice: number): number {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

export const SHIPPING_RATES: Record<string, number> = {
  standard: 9.99,
  express: 19.99,
  overnight: 29.99,
  free: 0,
};

export const FREE_SHIPPING_THRESHOLD = 150;

export const TAX_RATE = 0.08;
