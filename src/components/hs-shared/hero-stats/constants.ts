import { HeroId } from "@/services/heroes/types";

export const MAX_ENERGY = 2_150_000;
export const MAX_INCOME_PER_HOUR = 42_000_000;
export const MAX_INCOME_PER_TAP = 2_700;

export const calculateStat = (base: number, rate: number, heroId: HeroId) =>
  // "Default" hero is an edge case where we consider rate as an integer bonus of cloth
  heroId === HeroId.DEFAULT ? rate : Math.round(base * rate);
