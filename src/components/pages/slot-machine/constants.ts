import { HeroClothPiece, HeroId } from "@/services/heroes/types";
import { ChestType, Reward, RewardShape } from "@/types/rewards";

export const mockComplexReward: RewardShape = {
  reward: Reward.CHEST,
  value: ChestType.EPIC,
  character: null,
  cloth: null,
  coffer: {
    coins: 5353521,
    stars: 125,
    buster: 2,
    friends: 25,
    offline: 6,
    cloth: {
      value: "1",
      isExist: null,
      character: HeroId.IRONMAN,
      char_slot: HeroClothPiece.KIT,
    },
    character: {
      value: HeroId.MESSI,
      isExist: null,
    },
    game_energy: 2050,
    auto: null,
  },
};

export const mockClothReward: RewardShape = {
  reward: Reward.CLOTH,
  value: HeroId.HASBIK,
  character: null,
  cloth: {
    value: "1",
    isExist: null,
    character: HeroId.HASBIK,
    char_slot: HeroClothPiece.CHAIN,
  },
  coffer: null,
};

export const mockHeroReward: RewardShape = {
  reward: Reward.CHARACTER,
  value: HeroId.MESSI,
  character: {
    value: HeroId.MESSI,
    isExist: null,
  },
  cloth: null,
  coffer: null,
};

export const mockReward: RewardShape = {
  reward: Reward.COINS,
  value: 12350,
  character: null,
  cloth: null,
  coffer: null,
};
