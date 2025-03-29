import { RewardShape } from "@/types/rewards";

export type ServerFace = "banana" | "cherry" | "lemon" | "wild" | "777";
export type Face = "chest" | "booster" | "bucket" | "super_booster" | "bag";

export type BanditPlayResponse = RewardShape & {
  combination: Face[];
};

export type BanditJackpotPlayResponse = {
  reward: number;
  jackpot_reward: number;
  combination: Face[];
};

export type BanditInfo = {
  paid: boolean;
  balance: number;
  jackpot: number;
  timeToEnergyAccrual: number;
};
