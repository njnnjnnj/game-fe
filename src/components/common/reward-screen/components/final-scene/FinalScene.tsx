import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import {
  ClothCofferReward,
  CofferKey,
  CofferReward,
  CofferValue,
} from "@/types/rewards";

import { SceneIntrinsicProps } from "../../types";
import { SceneFooter } from "../scene-footer/SceneFooter";

import { FinalSceneCard } from "./components/FinalSceneCard";

export type FinalSceneReward = {
  type: CofferKey;
  value:
    | Exclude<CofferValue, ClothCofferReward[] | CofferReward[]>
    | ClothCofferReward
    | CofferReward;
};

export type Props = SceneIntrinsicProps & {
  rewards: FinalSceneReward[];
};

enum AppearanceAnimation {
  APPEARANCE,
  DISAPPEARANCE,
}

export const BG_CLASS = "bg-reward-screen-hero-and-cloth-pattern";

export const FinalScene: FunctionComponent<Props> = ({
  rewards,
  clickToggle,
  onFinishScene,
}) => {
  const tRewards = useTranslations(NS.REWARDS_SCREEN.ROOT);
  const [appearanceAnimation, setAppearanceAnimation] =
    useState<AppearanceAnimation | null>(null);
  const appearanceAnimationTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    appearanceAnimationTimerRef.current = setTimeout(() => {
      setAppearanceAnimation(AppearanceAnimation.APPEARANCE);
      appearanceAnimationTimerRef.current = undefined;
    }, 200);

    return () => {
      if (appearanceAnimationTimerRef.current) {
        clearTimeout(appearanceAnimationTimerRef.current);
      }
    };
  }, []);

  useUpdateEffect(() => {
    setAppearanceAnimation(AppearanceAnimation.DISAPPEARANCE);
  }, [clickToggle]);

  const renderCard = ({ type, value }: FinalSceneReward, index: number) => (
    <div
      key={`${type}-${index}`}
      className={classNames(
        "aspect-[0.65] basis-[25%] transition-transform duration-500",
        {
          "[transform:rotateY(0deg)_scale(0)]":
            appearanceAnimation !== AppearanceAnimation.APPEARANCE,
          "[transform:rotateY(360deg)_scale(1)]":
            appearanceAnimation === AppearanceAnimation.APPEARANCE,
        },
      )}
    >
      <FinalSceneCard type={type} value={value} />
    </div>
  );

  return (
    <div className="absolute flex h-[100vh] w-full items-center justify-center">
      <div className="absolute w-full px-4">
        <div className="absolute bottom-[110%] left-1/2 mb-[10%] w-[55%] -translate-x-1/2">
          <div
            className={classNames(
              "text-stroke-2 text-center font-black uppercase italic leading-[36px] text-white transition-transform duration-500 text-shadow [font-size:min(10.2vw,5vh)]",
              {
                "scale-0":
                  appearanceAnimation !== AppearanceAnimation.APPEARANCE,
                "scale-100":
                  appearanceAnimation === AppearanceAnimation.APPEARANCE,
              },
            )}
            onTransitionEnd={() => {
              if (appearanceAnimation === AppearanceAnimation.DISAPPEARANCE) {
                onFinishScene();
              }
            }}
          >
            {tRewards(
              `${NS.REWARDS_SCREEN.FINAL_SCENE.ROOT}.${NS.REWARDS_SCREEN.FINAL_SCENE.TITLE}`,
            )}
          </div>
        </div>
        {rewards.length <= 3 ? (
          <div className="flex justify-center gap-x-2">
            {rewards.map(renderCard)}
          </div>
        ) : (
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-center gap-x-2">
              {rewards.slice(0, Math.ceil(rewards.length / 2)).map(renderCard)}
            </div>
            <div className="flex justify-center gap-x-2">
              {rewards.slice(-Math.floor(rewards.length / 2)).map(renderCard)}
            </div>
          </div>
        )}
      </div>

      <SceneFooter
        isMovingIn={appearanceAnimation !== AppearanceAnimation.DISAPPEARANCE}
        isMovingOut={appearanceAnimation === AppearanceAnimation.DISAPPEARANCE}
      />
    </div>
  );
};
