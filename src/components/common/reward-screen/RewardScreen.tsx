import React, { FunctionComponent, useMemo, useState } from "react";

import Image from "next/image";

import classNames from "classnames";

import RewardCardsImg from "@/public/assets/png/reward-screen/reward-cards.webp";
import { CofferKey, CofferValue, Reward, RewardShape } from "@/types/rewards";

import {
  BG_CLASS as BucketSceneBg,
  BucketScene,
} from "./components/bucket-scene/BucketScene";
import {
  BG_CLASS as ChestSceneBg,
  ChestScene,
} from "./components/chest-scene/ChestScene";
import {
  BG_CLASS as FinalSceneBg,
  FinalScene,
} from "./components/final-scene/FinalScene";
import {
  BG_CLASS as HeroAndCloseSceneBg,
  HeroAndClothScene,
} from "./components/hero-n-cloth-scene/HeroAndClothScene";

type Props = {
  reward: RewardShape;
  onFinish: () => void;
};

type Scene = {
  scene: FunctionComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
  bg: string;
};

export const RewardScreen: FunctionComponent<Props> = ({
  reward,
  onFinish,
}) => {
  const [toggle, setToggle] = useState(false);
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const scenes = useMemo(() => {
    const buildSceneForCoffer = (key: CofferKey, value: CofferValue) => {
      switch (key) {
        case "cloth":
          return {
            scene: HeroAndClothScene,
            props: { reward: value },
            bg: HeroAndCloseSceneBg,
          };
        case "character":
          return {
            scene: HeroAndClothScene,
            props: { reward: value },
            bg: HeroAndCloseSceneBg,
          };
        case "auto":
          // Not supported
          return {
            scene: HeroAndClothScene,
            props: { reward: value },
            bg: HeroAndCloseSceneBg,
          };
        default:
          return {
            scene: BucketScene,
            props: { type: key, amount: value, balance: 10 },
            bg: BucketSceneBg,
          };
      }
    };

    const finalScene = {
      scene: FinalScene,
      props: {},
      bg: FinalSceneBg,
    };

    if (reward.reward === Reward.CHEST) {
      const coffer = reward.coffer;

      if (!coffer) return [];

      const chestScene = {
        scene: ChestScene,
        props: { type: reward.value },
        bg: ChestSceneBg,
      };

      return [
        chestScene,
        ...Object.keys(coffer)
          .filter((key) => !!coffer[key as CofferKey])
          .map((nextKey) => {
            const key = nextKey as CofferKey;
            const value = coffer[key];

            return buildSceneForCoffer(key, value);
          }),
        finalScene,
      ];
    } else if (reward.reward === Reward.CLOTH) {
      return [buildSceneForCoffer("cloth", reward.cloth), finalScene];
    } else if (reward.reward === Reward.CHARACTER) {
      return [buildSceneForCoffer("character", reward.character), finalScene];
    } else {
      return [
        {
          scene: BucketScene,
          props: { type: reward.reward, amount: reward.value, balance: 10 },
          bg: BucketSceneBg,
        },
        finalScene,
      ];
    }
  }, [reward]) as Scene[];

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
                  "transition-opacity duration-1000": true,
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
      <div className="absolute top-5">
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
