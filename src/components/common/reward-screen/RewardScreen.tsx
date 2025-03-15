import React, { FunctionComponent, useEffect, useMemo, useState } from "react";

import Image from "next/image";

import classNames from "classnames";

import { useTelegram } from "@/context";
import RewardCardsImg from "@/public/assets/png/reward-screen/reward-cards.webp";
import { useGetProfile } from "@/services/profile/queries";
import { useGetBandit } from "@/services/slot-machine/queries";
import {
  ClothCofferReward,
  CofferKey,
  CofferReward,
  CofferValue,
  Reward,
  RewardShape,
} from "@/types/rewards";

import {
  BG_CLASS as ChestSceneBg,
  ChestScene,
  Props as ChestSceneProps,
} from "./components/chest-scene/ChestScene";
import {
  BG_CLASS as FinalSceneBg,
  FinalScene,
  FinalSceneReward,
} from "./components/final-scene/FinalScene";
import { Scene, Scenes } from "./types";
import {
  buildBucketScene,
  buildCharactersScenes,
  buildClothesScenes,
  processExistingItems,
} from "./utils";

type Props = {
  reward: RewardShape;
  onFinish: () => void;
};

const COFFER_SCENES_ORDER: Record<CofferKey, number> = {
  coins: 0,
  stars: 1,
  friends: 2,
  game_energy: 3,
  buster: 4,
  offline: 5,
  clothes: 6,
  characters: 7,
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

  const scenes = useMemo(() => {
    const buildSceneForCoffer = (
      key: CofferKey,
      value: CofferValue,
    ): Scenes => {
      switch (key) {
        case "clothes":
          return buildClothesScenes(value as ClothCofferReward[]);
        case "characters":
          return buildCharactersScenes(value as CofferReward[]);
        case "auto":
          // Not supported
          return buildCharactersScenes(value as CofferReward[]);
        default:
          return [buildBucketScene(key, value as number)];
      }
    };

    if (reward.reward === Reward.CHEST) {
      const { coffer: rawCoffer } = reward;

      if (!rawCoffer) return [];

      const coffer = processExistingItems(rawCoffer);

      const chestScene = {
        scene: ChestScene,
        props: { type: reward.value },
        bg: ChestSceneBg,
      } as Scene<ChestSceneProps>;

      const rewards: FinalSceneReward[] = [];
      const scenesList: Scenes = [chestScene];

      (Object.keys(coffer) as CofferKey[])
        .filter((key) => !!coffer[key])
        .sort((key1, key2) => COFFER_SCENES_ORDER[key1] - COFFER_SCENES_ORDER[key2])
        .forEach((nextKey) => {
          const key = nextKey;
          const value = coffer[key];

          if (Array.isArray(value)) {
            value.forEach(
              (clothOrCharacter: ClothCofferReward | CofferReward) => {
                rewards.push({ type: key, value: clothOrCharacter });
              },
            );

            scenesList.push(...buildSceneForCoffer(key, value));
          } else {
            rewards.push({ type: key, value: value });
            scenesList.push(...buildSceneForCoffer(key, value));
          }
        });

      Array.from({ length: Math.ceil(rewards.length / 8) }).forEach(
        (_, i: number) => {
          scenesList.push({
            scene: FinalScene,
            props: { rewards: rewards.slice(i * 8, i * 8 + 8) },
            bg: FinalSceneBg,
          });
        },
      );

      return scenesList;
    } else if (reward.reward === Reward.CLOTH) {
      return [
        ...buildClothesScenes(reward.cloth ? [reward.cloth] : null),
        {
          scene: FinalScene,
          props: { rewards: [{ type: reward.reward, value: reward.cloth }] },
          bg: FinalSceneBg,
        },
      ];
    } else if (
      reward.reward === Reward.CHARACTER ||
      reward.reward === Reward.AUTO // Not supported
    ) {
      return [
        ...buildCharactersScenes(reward.character ? [reward.character] : null),
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
        buildBucketScene(reward.reward, reward.value as number),
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
          <div className="absolute right-0 top-1/2 w-7 -translate-y-1/2 rotate-[4deg] text-center text-base font-extrabold text-white">
            {itemsLeft}
          </div>
        </div>
      )}
      {Scene && (
        <Scene
          {...sceneProps}
          // @ts-expect-error todo: Working in a hurry. Have no idea what's happening here
          key={activeSceneIndex}
          // @ts-expect-error todo: Working in a hurry. Have no idea what's happening here
          clickToggle={toggle}
          // @ts-expect-error todo: Working in a hurry. Have no idea what's happening here
          onFinishScene={onFinishScene}
        />
      )}
    </div>
  );
};
