import { ClothCofferReward, Coffer, CofferReward } from "@/types/rewards";

import {
  BG_CLASS as BucketSceneBg,
  BucketScene,
  Props as BucketSceneProps,
} from "./components/bucket-scene/BucketScene";
import {
  BG_CLASS as HeroAndCloseSceneBg,
  HeroAndClothScene,
  Props as HeroAndClothSceneProps,
} from "./components/hero-n-cloth-scene/HeroAndClothScene";
import { Scene } from "./types";

export const processExistingItems = (coffer: Coffer): Coffer => {
  const processedCoffer = { ...coffer };
  const processClothOrCharacterReward = (
    reward: CofferReward | ClothCofferReward,
  ) => {
    if (!reward.isExist) return true;

    const { value, currency } = reward.isExist;

    processedCoffer[currency] = processedCoffer[currency]
      ? processedCoffer[currency] + value
      : value;

    return false;
  };

  processedCoffer.characters =
    coffer.characters?.filter(processClothOrCharacterReward) ?? null;
  processedCoffer.clothes =
    coffer.clothes?.filter(processClothOrCharacterReward) ?? null;

  return processedCoffer;
};

export const buildClothesScenes = (
  value: ClothCofferReward[] | null,
): Scene<HeroAndClothSceneProps>[] => {
  return value
    ? value.map((reward: ClothCofferReward) => ({
        scene: HeroAndClothScene,
        props: { type: "clothes", reward },
        bg: HeroAndCloseSceneBg,
      }))
    : [];
};

export const buildCharactersScenes = (
  value: CofferReward[] | null,
): Scene<HeroAndClothSceneProps>[] => {
  return value
    ? value.map((reward: CofferReward) => ({
        scene: HeroAndClothScene,
        props: { type: "characters", reward },
        bg: HeroAndCloseSceneBg,
      }))
    : [];
};

export const buildBucketScene = (
  key: BucketSceneProps["type"],
  value: number,
): Scene<BucketSceneProps> => {
  return {
    scene: BucketScene,
    props: { type: key, reward: value },
    bg: BucketSceneBg,
  };
};
