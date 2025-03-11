import { StaticImageData } from "next/image";

import EnergyBoosterImage from "@/public/assets/png/rewards/rewards/1.webp";
import CoinsBucketImage from "@/public/assets/png/rewards/rewards/2.webp";
import RareCardsImage from "@/public/assets/png/rewards/rewards/3.webp";
import EnergyBucketImage from "@/public/assets/png/rewards/rewards/4.webp";
import EnergySmallImage from "@/public/assets/png/rewards/rewards/5.webp";
import EnergyHalfImage from "@/public/assets/png/rewards/rewards/6.webp";
import StartChestImage from "@/public/assets/png/rewards/rewards/7.webp";

export enum RewardTypeEnum {
  COINS = "coins",
  COLLECT_INCOME = "collect-income",
  REGULAR_CHEST = "regular-chest",
  EPIC_CHEST = "epic-chest",
  ENERGY_BOOSTER = "energy-booster",
  STARS = "stars",
  ENERGY_FOR_BANDIT = "energy-for-bandit",
  CLOTHES = "clothes",
  FRIENDS = "friends",
  MEGA_CHEST = "mega-chest",
}

type Reward = {
  id: number;
  type: RewardTypeEnum;
  amount: number;
  image: null | StaticImageData;
  time?: number;
};

export const REWARDS: Reward[] = [
  { id: 1, type: RewardTypeEnum.COINS, amount: 50000, image: null },
  {
    id: 2,
    type: RewardTypeEnum.COLLECT_INCOME,
    amount: 1,
    image: EnergySmallImage,
    time: 6,
  },
  { id: 3, type: RewardTypeEnum.COINS, amount: 250000, image: null },
  {
    id: 4,
    type: RewardTypeEnum.REGULAR_CHEST,
    amount: 1,
    image: StartChestImage,
  },
  {
    id: 5,
    type: RewardTypeEnum.ENERGY_BOOSTER,
    amount: 1,
    image: EnergyBoosterImage,
  },
  { id: 6, type: RewardTypeEnum.COINS, amount: 500000, image: null },
  {
    id: 7,
    type: RewardTypeEnum.COLLECT_INCOME,
    amount: 1,
    image: EnergyHalfImage,
    time: 12,
  },
  {
    id: 8,
    type: RewardTypeEnum.ENERGY_FOR_BANDIT,
    amount: 70,
    image: EnergyBucketImage,
  },
  { id: 9, type: RewardTypeEnum.CLOTHES, amount: 1, image: RareCardsImage },
  { id: 10, type: RewardTypeEnum.FRIENDS, amount: 5, image: CoinsBucketImage },
  {
    id: 11,
    type: RewardTypeEnum.COLLECT_INCOME,
    amount: 1,
    time: 12,
    image: EnergyHalfImage,
  },
  {
    id: 12,
    type: RewardTypeEnum.REGULAR_CHEST,
    amount: 1,
    image: StartChestImage,
  },
  {
    id: 13,
    type: RewardTypeEnum.COINS,
    amount: 1250000,
    image: null,
  },
  {
    id: 14,
    type: RewardTypeEnum.ENERGY_BOOSTER,
    amount: 1,
    image: EnergyBoosterImage,
  },
  {
    id: 15,
    type: RewardTypeEnum.CLOTHES,
    amount: 1,
    image: RareCardsImage,
  },
  {
    id: 16,
    type: RewardTypeEnum.REGULAR_CHEST,
    amount: 1,
    image: StartChestImage,
  },
  {
    id: 17,
    type: RewardTypeEnum.ENERGY_FOR_BANDIT,
    amount: 350,
    image: EnergyBucketImage,
  },
  {
    id: 18,
    type: RewardTypeEnum.FRIENDS,
    amount: 25,
    image: CoinsBucketImage,
  },
  {
    id: 19,
    type: RewardTypeEnum.ENERGY_FOR_BANDIT,
    amount: 500,
    image: EnergyBucketImage,
  },
  {
    id: 20,
    type: RewardTypeEnum.REGULAR_CHEST,
    amount: 1,
    image: StartChestImage,
  },
];
