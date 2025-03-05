import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType } from "@/components/common/card/Card";
import { HeroView, HSPieceImage } from "@/components/hs-shared";
import { calculateStat } from "@/components/hs-shared/hero-stats/constants";
import { NS } from "@/constants/ns";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import HourIncomeCoinSvg from "@/public/assets/svg/heroes/hour-income-coin.svg";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import {
  HeroClothPiece,
  HeroId,
  HeroRarity,
  SelectedCloth,
} from "@/services/heroes/types";
import { Coffer, CofferKey } from "@/types/rewards";
import { formatNumber } from "@/utils/number";

import { SceneIntrinsicProps } from "../../types";

type NonNullable<T> = Exclude<T, null>;

export type Props = SceneIntrinsicProps & {
  type: Extract<CofferKey, "cloth" | "character" | "auto">;
  reward: NonNullable<Coffer["cloth"] | Coffer["character"] | Coffer["auto"]>;
};

enum AppearanceAnimation {
  APPEARANCE,
  DISAPPEARANCE,
}

export const BG_CLASS = "bg-reward-screen-hero-and-cloth-pattern";

const clothCardClassName = {
  [HeroClothPiece.CHAIN]: "scale-[3] -translate-x-[5%] translate-y-[5%]",
  [HeroClothPiece.HAT]: "scale-150 translate-y-[48%]",
  [HeroClothPiece.GLASS]: "scale-[2] translate-y-[36%]",
  [HeroClothPiece.KIT]: "scale-125 -translate-y-[20%]",
  [HeroClothPiece.WATCH]: "scale-[4] translate-x-[48%] -translate-y-[60%]",
};

const isClothCoffer = (
  reward: Props["reward"],
): reward is NonNullable<Coffer["cloth"]> => "char_slot" in reward;

export const HeroAndClothScene: FunctionComponent<Props> = ({
  type,
  reward,
  clickToggle,
  onFinishScene,
}) => {
  const tCommon = useTranslations(NS.COMMON.ROOT);
  const tRewards = useTranslations(NS.REWARDS_SCREEN.ROOT);
  const tHeroes = useTranslations(NS.PAGES.HEROES.ROOT);
  const tShop = useTranslations(NS.PAGES.SHOP_CLOTHES.ROOT);
  const { data: heroes } = useGetAllAppsHeroes();
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

  const getIncomePerHour = () => {
    if (type === "cloth" && isClothCoffer(reward)) {
      const hero = heroes?.[reward.character];
      const baseIncomePerHour = hero?.earn_per_hour;
      const clothRate =
        hero?.cloth?.[reward.char_slot]?.[reward.value]?.earn_per_hour;

      return calculateStat(
        baseIncomePerHour ?? 0,
        clothRate ?? 0,
        reward.character,
      );
    }

    return heroes?.[reward.value as HeroId]?.earn_per_hour;
  };

  return (
    <div className="absolute flex h-[100vh] w-full items-center justify-center">
      <div
        className={classNames({
          "absolute aspect-[0.72] w-[70%]": type === "character",
          "absolute aspect-[0.64] w-[43%]": type === "cloth",
        })}
      >
        <div
          className={classNames(
            "absolute bottom-[100%] flex w-full flex-col items-center transition-transform duration-1000",
            {
              "scale-0": appearanceAnimation !== AppearanceAnimation.APPEARANCE,
              "scale-100":
                appearanceAnimation === AppearanceAnimation.APPEARANCE,
            },
          )}
        >
          <div className="text-stroke-2 inline-flex text-center font-black uppercase italic leading-[36px] text-white text-shadow [font-size:min(10.2vw,5vh)]">
            {type === "character" &&
              tHeroes(
                `${NS.PAGES.HEROES.HERO_NAMES.ROOT}.${NS.PAGES.HEROES.HERO_NAMES[String(reward.value).toUpperCase() as Uppercase<HeroId>]}`,
              )}
            {type === "cloth" &&
              isClothCoffer(reward) &&
              tShop(
                `${NS.PAGES.SHOP_CLOTHES.LABELS.ROOT}.${NS.PAGES.SHOP_CLOTHES.LABELS.CLOTH.ROOT}.${reward.character.toUpperCase()}`,
                { cloth: `${reward.char_slot}_${reward.value}` },
              )}
          </div>
          <div className="text-stroke-2 leading-1 mt-2 whitespace-nowrap text-center font-extrabold uppercase italic text-[#FF0EFF] text-shadow [font-size:min(4.1vw,1.8vh)]">
            {tRewards(
              `${NS.REWARDS_SCREEN.HERO_AND_CLOTH_SCENE.ROOT}.${NS.REWARDS_SCREEN.HERO_AND_CLOTH_SCENE.REWARD_SUBTITLE}`,
              { type },
            )}
            <br />
            {type === "cloth" &&
              isClothCoffer(reward) &&
              `${tHeroes(
                `${NS.PAGES.HEROES.HERO_NAMES.ROOT}.${NS.PAGES.HEROES.HERO_NAMES[reward.character.toUpperCase() as Uppercase<HeroId>]}`,
              )}`}
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
          {type === "character" && (
            <HeroView
              className="left-0 top-0 h-full w-full"
              heroId={HeroId.MESSI}
              heroRarity={HeroRarity.EPIC}
              heroCloth={{ kit: 0 } as SelectedCloth}
              source="preview"
            />
          )}
          {type === "cloth" && isClothCoffer(reward) && (
            <Card type={CardType.INDIGO} isFullSize>
              <HSPieceImage
                className={classNames(
                  "h-full w-full will-change-transform",
                  clothCardClassName[reward.char_slot],
                )}
                heroId={reward.character}
                part={reward.char_slot}
                clothId={Number(reward.value)}
                alt=""
                sizes="50vw"
                fill
              />
            </Card>
          )}
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
            {tHeroes(
              `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.INCOME_PER_HOUR}`,
            )}
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
              {`+${formatNumber(getIncomePerHour())}`}
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
          {tCommon(`${NS.COMMON.TAP_TO_CONTINUE}`)}
        </div>
      </div>
    </div>
  );
};
