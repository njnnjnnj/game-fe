import React, { FunctionComponent, useEffect, useMemo, useState } from "react";

import Image from "next/image";

import classNames from "classnames";

import { useTelegram } from "@/context";
import RewardCardsImg from "@/public/assets/png/reward-screen/reward-cards.webp";
import { useGetProfile } from "@/services/profile/queries";
import { useGetBandit } from "@/services/slot-machine/queries";
import { CofferKey, CofferValue, Reward, RewardShape } from "@/types/rewards";

import {
  BG_CLASS as BucketSceneBg,
  BucketScene,
  Props as BucketSceneProps,
} from "./components/bucket-scene/BucketScene";
import {
  BG_CLASS as ChestSceneBg,
  ChestScene,
  Props as ChestSceneProps,
} from "./components/chest-scene/ChestScene";
import {
  BG_CLASS as FinalSceneBg,
  FinalScene,
  FinalSceneReward,
  Props as FinalSceneProps,
} from "./components/final-scene/FinalScene";
import {
  BG_CLASS as HeroAndCloseSceneBg,
  HeroAndClothScene,
  Props as HeroAndClothSceneProps,
} from "./components/hero-n-cloth-scene/HeroAndClothScene";
import { Scene } from "./types";

type Props = {
  reward: RewardShape;
  onFinish: () => void;
};

type Scenes = Scene<
  ChestSceneProps | BucketSceneProps | HeroAndClothSceneProps | FinalSceneProps
>[];

const SCENES_ORDER: Record<CofferKey, number> = {
  coins: 0,
  stars: 1,
  friends: 2,
  game_energy: 3,
  buster: 4,
  offline: 5,
  cloth: 6,
  character: 7,
  auto: 8,
};

export const RewardScreen: FunctionComponent<Props> = ({
  reward,
  onFinish,
}) => {
  const { webApp } = useTelegram();
  const [toggle, setToggle] = useState(false);
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Refresh/prefetch data that is neccessary along the way
  const { refetch: refetchBanditInfo } = useGetBandit();
  const { refetch: refetchProfile } = useGetProfile();

  useEffect(() => {
    refetchBanditInfo();
    refetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scenes = useMemo(() => {
    const buildSceneForCoffer = (key: CofferKey, value: CofferValue) => {
      switch (key) {
        case "cloth":
          return {
            scene: HeroAndClothScene,
            props: { type: key, reward: value },
            bg: HeroAndCloseSceneBg,
          };
        case "character":
          return {
            scene: HeroAndClothScene,
            props: { type: key, reward: value },
            bg: HeroAndCloseSceneBg,
          };
        case "auto":
          // Not supported
          return {
            scene: HeroAndClothScene,
            props: { type: key, reward: value },
            bg: HeroAndCloseSceneBg,
          };
        default:
          return {
            scene: BucketScene,
            props: { type: key, reward: value },
            bg: BucketSceneBg,
          };
      }
    };

    if (reward.reward === Reward.CHEST) {
      const { coffer: rawCoffer } = reward;

      if (!rawCoffer) return [];

      const coffer = { ...rawCoffer };

      if (coffer.character?.isExist) {
        const { currency, value } = coffer.character.isExist;

        coffer[currency] = coffer[currency] ? coffer[currency] + value : value;

        coffer.character = null;
      }

      if (coffer.cloth?.isExist) {
        const { currency, value } = coffer.cloth.isExist;

        coffer[currency] = coffer[currency] ? coffer[currency] + value : value;

        coffer.cloth = null;
      }

      const chestScene = {
        scene: ChestScene,
        props: { type: reward.value },
        bg: ChestSceneBg,
      };

      const rewards: FinalSceneReward[] = [];
      const scenesList = [
        chestScene,
        ...(Object.keys(coffer) as CofferKey[])
          .filter((key) => !!coffer[key])
          .sort((key1, key2) => SCENES_ORDER[key1] - SCENES_ORDER[key2])
          .map((nextKey) => {
            const key = nextKey;
            const value = coffer[key];

            rewards.push({ type: key, value: value });

            return buildSceneForCoffer(key, value);
          }),
        {
          scene: FinalScene,
          props: { rewards },
          bg: FinalSceneBg,
        },
      ];

      return scenesList;
    } else if (reward.reward === Reward.CLOTH) {
      return [
        buildSceneForCoffer("cloth", reward.cloth),
        {
          scene: FinalScene,
          props: { rewards: [{ type: reward.reward, value: reward.cloth }] },
          bg: FinalSceneBg,
        },
      ];
    } else if (reward.reward === Reward.CHARACTER) {
      return [
        buildSceneForCoffer("character", reward.character),
        {
          scene: FinalScene,
          props: {
            rewards: [{ type: reward.reward, value: reward.character }],
          },
          bg: FinalSceneBg,
        },
      ];
    } else {
      return [
        {
          scene: BucketScene,
          props: { type: reward.reward, reward: reward.value },
          bg: BucketSceneBg,
        },
        {
          scene: FinalScene,
          props: {
            rewards: [{ type: reward.reward, value: reward.value }],
          },
          bg: FinalSceneBg,
        },
      ];
    }
  }, [reward]) as Scenes;

  const { scene: Scene, props: sceneProps } = scenes[activeSceneIndex];

  const onFinishScene = () => {
    if (activeSceneIndex < scenes.length - 1) {
      setActiveBgIndex((prevIndex) => prevIndex + 1);
      setActiveSceneIndex((prevIndex) => prevIndex + 1);
    } else {
      onFinish();
    }
  };

  const itemsLeft = scenes.length - activeSceneIndex - 1;
  const tgSafeInsetTop = webApp ? webApp.safeAreaInset.top : 0;
  const isCounterHidden =
    reward.reward === Reward.CHEST && activeSceneIndex === 0;

  return (
    <div
      className={classNames(
        "fixed inset-0 z-50 flex items-center justify-center",
      )}
      onClick={() => {
        setToggle((prevToggle) => !prevToggle);
      }}
    >
      {scenes.map(({ bg }, i) => (
        <div
          key={`bg-${i}`}
          className={classNames(
            "absolute h-full w-full",
            bg,
            i > 0
              ? {
                  "transition-opacity duration-500": true,
                  "opacity-0": activeBgIndex !== i,
                  "opacity-1":
                    i === scenes.length - 1
                      ? activeBgIndex >= i
                      : activeBgIndex === i,
                }
              : undefined,
          )}
        />
      ))}
      <div className="absolute aspect-square h-[120vh] animate-spin bg-[url('/assets/png/reward-screen/rays-bg.webp')] bg-cover bg-center [animation-duration:10s]" />
      {!isCounterHidden && (
        <div
          className="absolute top-5"
          style={tgSafeInsetTop ? { top: tgSafeInsetTop } : undefined}
        >
          <Image src={RewardCardsImg} width={40} height={40} alt="" />
          <div
            className={classNames(
              "absolute top-1/2 -translate-y-1/2 rotate-[4deg] text-base font-extrabold text-white",
              { "right-2.5": itemsLeft !== 1, "right-3": itemsLeft === 1 },
            )}
          >
            {itemsLeft}
          </div>
        </div>
      )}
      {Scene && (
        <Scene
          {...sceneProps}
          key={activeSceneIndex}
          clickToggle={toggle}
          onFinishScene={onFinishScene}
        />
      )}
    </div>
  );
};
