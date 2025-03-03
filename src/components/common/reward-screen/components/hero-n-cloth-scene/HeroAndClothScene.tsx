import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { HeroView } from "@/components/hs-shared";
import { NS } from "@/constants/ns";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import HourIncomeCoinSvg from "@/public/assets/svg/heroes/hour-income-coin.svg";
import { HeroId, HeroRarity, SelectedCloth } from "@/services/heroes/types";
import { Coffer } from "@/types/rewards";
import { formatNumber } from "@/utils/number";

type Props = {
  clickToggle: boolean;
  onFinishScene: () => void;
  reward: Coffer["cloth"] | Coffer["character"] | Coffer["auto"];
};

enum AppearanceAnimation {
  APPEARANCE,
  DISAPPEARANCE,
}

export const BG_CLASS = "bg-reward-screen-hero-and-cloth-pattern";

export const HeroAndClothScene: FunctionComponent<Props> = ({
  clickToggle,
  onFinishScene,
}) => {
  const t = useTranslations(NS.COMMON.ROOT);
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

  return (
    <div className="absolute flex h-[100vh] w-full items-center justify-center">
      <div className="absolute aspect-[0.72] w-[70%]">
        <div
          className={classNames(
            "absolute bottom-[110%] w-full transition-transform duration-1000",
            {
              "scale-0": appearanceAnimation !== AppearanceAnimation.APPEARANCE,
              "scale-100":
                appearanceAnimation === AppearanceAnimation.APPEARANCE,
            },
          )}
        >
          <div className="text-stroke-2 text-center font-black uppercase italic leading-[36px] text-white text-shadow [font-size:min(10.2vw,5vh)]">
            {"Месси"}
          </div>
          <div className="text-stroke-2 leading-1 mt-2 text-center font-extrabold uppercase italic text-[#FF0EFF] text-transparent text-shadow [font-size:min(4.1vw,1.8vh)]">
            {"Новый персонаж"}
          </div>
        </div>

        <div
          className={classNames(
            "absolute h-full w-full transition-transform duration-1000",
            {
              "scale-0": appearanceAnimation !== AppearanceAnimation.APPEARANCE,
              "scale-100":
                appearanceAnimation === AppearanceAnimation.APPEARANCE,
            },
          )}
        >
          <HeroView
            className="left-0 top-0 h-full w-full"
            heroId={HeroId.MESSI}
            heroRarity={HeroRarity.EPIC}
            heroCloth={{ kit: 0 } as SelectedCloth}
            source="preview"
          />
        </div>

        <div
          className={classNames(
            "absolute top-[100%] flex w-full flex-col items-center gap-y-3 transition-transform duration-1000",
            {
              "scale-0": appearanceAnimation !== AppearanceAnimation.APPEARANCE,
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
          <div className="text-stroke-2 mt-2 text-center font-extrabold uppercase italic leading-none text-white text-shadow [font-size:min(4.1vw,1.8vh)]">
            {"Доход/час"}
          </div>

          <div className="flex h-[5.2vh] items-center gap-x-1 rounded-[20px] bg-black/50 px-4 py-2.5">
            <div className="aspect-square h-full shrink-0">
              <HourIncomeCoinSvg
                height="100%"
                width="100%"
                viewBox="0 0 26 26"
                preserveAspectRatio="none"
              />
            </div>
            <div className="text-stroke-2 font-extrabold leading-none text-white [font-size:min(6.1vw,2.8vh)]">
              {`+${formatNumber(12000)}`}
            </div>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          "absolute inset-x-10 text-center font-black uppercase italic leading-[36px] text-white transition-[top] duration-500 ease-linear text-shadow [font-size:min(7.6vw,3.5vh)]",
          {
            "top-[85vh]":
              appearanceAnimation !== AppearanceAnimation.DISAPPEARANCE,
            "top-[120vh]":
              appearanceAnimation === AppearanceAnimation.DISAPPEARANCE,
          },
        )}
      >
        <div className="animate-slot-win-view-text-pulse">
          {t(`${NS.COMMON.TAP_TO_CONTINUE}`)}
        </div>
      </div>
    </div>
  );
};
