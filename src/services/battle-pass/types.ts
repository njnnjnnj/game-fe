import { Reward,RewardValue } from "@/types/rewards";

export type BattlePassInfo = {
  current_exp: number;
  current_level: number;
  is_paid: boolean;
  need_exp: number;
};

export type BattlePassItem = {
  is_opened: boolean;
  is_paid: boolean;
  level: number;
  type: Reward;
  value: RewardValue;
};

export type BattlePassConfig = {
  free: Record<number, BattlePassItem>;
  paid: Record<number, BattlePassItem>;
};

export type GetRewardFromBattlePassParams = { level: number; isPaid: boolean };
