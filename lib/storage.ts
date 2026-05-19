"use client";

import { STORAGE_KEY } from "@/lib/constants";
import { validatePortfolio } from "@/lib/portfolio-validation";
import type { PortfolioInput } from "@/types/portfolio";

export function loadPortfolio(): PortfolioInput | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue);
    const validation = validatePortfolio(parsed);
    return validation.success ? validation.data : null;
  } catch {
    return null;
  }
}

export function savePortfolio(input: PortfolioInput) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
}
