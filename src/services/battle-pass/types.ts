import { Reward } from "@/types/rewards";

import { HeroId } from "../heroes/types";

export type BattlePassInfo = {
  current_exp: number;
  current_level: number;
  is_paid: boolean;
  last_free_reward: number;
  last_paid_reward: number;
  need_exp: number;
};

export enum BattleBassChestType {
  START = "start",
  EPIC = "epic",
  MEGA = "mega",
}

export type BattlePassItem = {
  is_paid: boolean;
  level: number;
  type: Reward;
  value: number | "energy" | BattleBassChestType | HeroId | HeroId[];
};

export type BattlePassConfig = {
  free: Record<number, BattlePassItem>;
  paid: Record<number, BattlePassItem>;
};

export type GetRewardFromBattlePassParams = { level: number; isPaid: boolean };
