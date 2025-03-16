import { HeroClothPiece, HeroCurrency, HeroId } from "@/services/heroes/types";
import { ChestType, Reward, RewardShape } from "@/types/rewards";

export const mockComplexReward: RewardShape = {
  reward: Reward.CHEST,
  value: ChestType.MEGA,
  character: null,
  cloth: null,
  coffer: {
    coins: 5353521,
    stars: 125,
    buster: 2,
    friends: 25,
    offline: 6,
    clothes: [
      {
        value: "5",
        isExist: null,
        character: HeroId.BOY,
        char_slot: HeroClothPiece.KIT,
      },
      {
        value: "4",
        isExist: {
          currency: HeroCurrency.STARS,
          value: 125,
        },
        character: HeroId.BEARD,
        char_slot: HeroClothPiece.WATCH,
      },
    ],
    characters: [
      {
        value: HeroId.MESSI,
        isExist: null,
      },
      {
        value: HeroId.ROSSOMAHA,
        isExist: {
          currency: HeroCurrency.STARS,
          value: 750,
        },
      },
    ],
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
