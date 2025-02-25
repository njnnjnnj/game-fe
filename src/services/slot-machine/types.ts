export type ServerFace = "banana" | "cherry" | "lemon" | "wild" | "777";
export type Face = "chest" | "booster" | "bucket" | "super_booster" | "bag";

export type BanditPlayResponse = {
  combination: Face[];
  reward: number;
};

export type BanditJackpotPlayResponse = BanditPlayResponse & {
  jackpot_reward: number;
};

export type BanditInfo = {
  paid: boolean;
  balance: number;
  jackpot: number;
};
