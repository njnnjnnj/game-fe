import { StaticImageData } from "next/image";

import Booster from "@/public/assets/png/battle-pass/booster.webp";
import Bucket from "@/public/assets/png/battle-pass/bucket.webp";
import CommonCards from "@/public/assets/png/battle-pass/common-cards.webp";
import EnergyBooster from "@/public/assets/png/battle-pass/energy-booster.webp";
import EpicCards from "@/public/assets/png/battle-pass/epic-cards.webp";
import EpicChest from "@/public/assets/png/battle-pass/epic-chest.webp";
import FriendsBucket from "@/public/assets/png/battle-pass/friends-bucket.webp";
import MegaChest from "@/public/assets/png/battle-pass/mega-chest.webp";
import RareCards from "@/public/assets/png/battle-pass/rare-cards.webp";
import StartChest from "@/public/assets/png/battle-pass/start-chest.webp";
import {
  GetAllAppsHeroesResponse,
  HeroId,
  HeroRarity,
} from "@/services/heroes/types";
import { ChestType, Reward, RewardValue } from "@/types/rewards";

export const getImgByReward = (
  reward: Reward,
  value: RewardValue,
  heroes: GetAllAppsHeroesResponse,
): StaticImageData => {
  switch (reward) {
    case Reward.CHEST: {
      if (value === ChestType.EPIC) {
        return EpicChest;
      } else if (value === ChestType.MEGA) {
        return MegaChest;
      }

      return StartChest;
    }
    case Reward.FRIENDS: {
      return FriendsBucket;
    }
    case Reward.STARS:
    case Reward.COINS:
    case Reward.OFFLINE: {
      return Bucket;
    }
    case Reward.BUSTER: {
      return Booster;
    }
    case Reward.GAME_ENERGY: {
      return EnergyBooster;
    }
    case Reward.CLOTH: {
      if (value === HeroRarity.RARE) {
        return RareCards;
      } else if (value === HeroRarity.EPIC) {
        return EpicCards;
      }

      return CommonCards;
    }
    case Reward.CHARACTER: {
      const heroId = Array.isArray(value) ? value[0] : value;
      const { rarity } = heroes[heroId as HeroId];

      if (rarity === HeroRarity.RARE) {
        return RareCards;
      } else if (rarity === HeroRarity.EPIC) {
        return EpicCards;
      }

      return CommonCards;
    }
    default: {
      return StartChest;
    }
  }
};
