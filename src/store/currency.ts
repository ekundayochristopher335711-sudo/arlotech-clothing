import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CURRENCIES, type CurrencyConfig } from "@/types";

interface CurrencyStore {
  current: CurrencyConfig;
  setCurrency: (code: string) => void;
  convert: (amountUSD: number) => number;
  format: (amountUSD: number) => string;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      current: CURRENCIES[0],

      setCurrency: (code) => {
        const currency = CURRENCIES.find((c) => c.code === code);
        if (currency) set({ current: currency });
      },

      convert: (amountUSD) => {
        return amountUSD * get().current.rate;
      },

      format: (amountUSD) => {
        const { current } = get();
        const converted = amountUSD * current.rate;
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: current.code,
          minimumFractionDigits: current.code === "NGN" ? 0 : 2,
        }).format(converted);
      },
    }),
    {
      name: "arlotech-currency",
      partialize: (state) => ({ current: state.current }),
    }
  )
);
