import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType } from "@/components/common/card/Card";
import { NS } from "@/constants/ns";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import Bucket from "@/public/assets/png/battle-pass/bucket.webp";
import StarSVG from "@/public/assets/svg/star.svg";
import { CofferKey } from "@/types/rewards";
import { formatNumber } from "@/utils/number";

type Props = {
  clickToggle: boolean;
  type: Exclude<CofferKey, "auto" | "character" | "cloth">;
  amount: number;
  balance: number;
  onFinishScene: () => void;
};

type Point = { x: number; y: number };

enum CoinsAnimation {
  SPAWN,
  SCATTER,
  TARGET,
}

enum AppearanceAnimation {
  APPEARANCE,
  DISAPPEARANCE,
}

const SCATTER_RADIUS = 30;

const getRandomIntInclusive = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

const getScatteredOffset = (): Point => ({
  x: getRandomIntInclusive(-SCATTER_RADIUS, SCATTER_RADIUS),
  y: getRandomIntInclusive(-SCATTER_RADIUS, SCATTER_RADIUS),
});

const REWARD = 150_000;

export const BG_CLASS = "bg-reward-screen-bucket-pattern";

export const BucketScene: FunctionComponent<Props> = ({
  clickToggle,
  onFinishScene,
}) => {
  const t = useTranslations(NS.COMMON.ROOT);
  const coinsSpawnRef = useRef<HTMLDivElement | null>(null);
  const coinsTargetRef = useRef<HTMLDivElement | null>(null);
  const coinsAnimationTimerRef = useRef<NodeJS.Timeout>();
  const appearanceAnimationTimerRef = useRef<NodeJS.Timeout>();
  const [balance, setBalance] = useState(30500000);
  const [appearanceAnimation, setAppearanceAnimation] =
    useState<AppearanceAnimation | null>(null);
  const [coinsAnimation, setCoinsAnimation] = useState<CoinsAnimation | null>(
    null,
  );

  const clearTimers = () => {
    if (coinsAnimationTimerRef.current) {
      clearTimeout(coinsAnimationTimerRef.current);
    }

    if (appearanceAnimationTimerRef.current) {
      clearTimeout(appearanceAnimationTimerRef.current);
    }
  };

  useEffect(() => {
    appearanceAnimationTimerRef.current = setTimeout(() => {
      setAppearanceAnimation(AppearanceAnimation.APPEARANCE);
      appearanceAnimationTimerRef.current = undefined;
    }, 200);

    return clearTimers;
  }, []);

  useEffect(() => {
    if (!coinsTargetRef.current || coinsAnimation === null) return;

    if (coinsAnimation === CoinsAnimation.SPAWN) {
      coinsAnimationTimerRef.current = setTimeout(() => {
        setCoinsAnimation(CoinsAnimation.SCATTER);
        coinsAnimationTimerRef.current = undefined;
      }, 200);
    }
  }, [coinsAnimation]);

  useUpdateEffect(() => {
    setAppearanceAnimation(AppearanceAnimation.DISAPPEARANCE);
  }, [clickToggle]);

  const finishScene = () => {
    clearTimers();

    setCoinsAnimation(null);
    onFinishScene();
  };

  const getSpawnPoint = () => {
    if (!coinsSpawnRef.current) return { x: 0, y: 0 };

    const rect = coinsSpawnRef.current.getBoundingClientRect();

    return { x: rect.x + rect.width / 2.2, y: rect.y + rect.height / 5 };
  };

  const getCoinPoint = (): Point => {
    if (coinsAnimation === null) return { x: 0, y: 0 };

    if (coinsAnimation === CoinsAnimation.SPAWN) {
      return getSpawnPoint();
    } else if (coinsAnimation === CoinsAnimation.SCATTER) {
      const spawnPoint = getSpawnPoint();
      const scatteredOffset = getScatteredOffset();

      return {
        x: spawnPoint.x + scatteredOffset.x,
        y: spawnPoint.y + scatteredOffset.y,
      };
    } else if (coinsAnimation === CoinsAnimation.TARGET) {
      if (!coinsTargetRef.current) return { x: 0, y: 0 };

      const rect = coinsTargetRef.current.getBoundingClientRect();

      return { x: rect.x, y: rect.y };
    }

    return { x: 0, y: 0 };
  };

  const animatedCoinsAmount = Math.min(REWARD, 10);
  const coinsCounter = useRef(animatedCoinsAmount);

  const handleCoinsTargetAnimationEnd = () => {
    setBalance((prevBalance) => prevBalance + REWARD / animatedCoinsAmount);

    coinsCounter.current -= 1;

    if (coinsCounter.current === 0) {
      setCoinsAnimation(null);
    }
  };

  return (
    <div className="absolute flex h-[100vh] w-full items-center justify-center">
      <div className="absolute aspect-[0.64] w-[43%]">
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
            {"Ведро звезд"}
          </div>
          <div className="text-stroke-2 leading-1 mt-2 text-center font-extrabold uppercase italic text-[#00FF06] text-shadow [font-size:min(4.1vw,1.8vh)]">
            {"Карта ресурса"}
          </div>
        </div>

        <div
          className={classNames(
            "absolute h-full w-full transition-transform duration-1000",
            {
              "[transform:rotateY(0deg)_scale(0)]":
                appearanceAnimation !== AppearanceAnimation.APPEARANCE,
              "[transform:rotateY(360deg)_scale(1)]":
                appearanceAnimation === AppearanceAnimation.APPEARANCE,
            },
          )}
        >
          <Card type={CardType.ORANGE} isFullSize>
            <div
              className="absolute top-1/2 aspect-square w-full -translate-y-1/2"
              ref={coinsSpawnRef}
            >
              <Image src={Bucket} alt="" fill sizes="50vw" quality={100} />
            </div>
            <span className="text-stroke-1 absolute bottom-2 left-1/2 z-20 w-full -translate-x-1/2 text-center text-2xl font-black text-shadow">
              x150k
            </span>
          </Card>
        </div>

        <div
          className={classNames(
            "absolute top-[110%] flex w-full flex-col items-center gap-y-3 transition-transform duration-1000",
            {
              "scale-0": appearanceAnimation !== AppearanceAnimation.APPEARANCE,
              "scale-100":
                appearanceAnimation === AppearanceAnimation.APPEARANCE,
            },
          )}
          onTransitionEnd={() => {
            if (appearanceAnimation === AppearanceAnimation.APPEARANCE) {
              setCoinsAnimation(CoinsAnimation.SPAWN);
            } else if (
              appearanceAnimation === AppearanceAnimation.DISAPPEARANCE
            ) {
              finishScene();
            }
          }}
        >
          <div className="text-stroke-2 mt-2 text-center font-extrabold uppercase italic leading-none text-white text-shadow [font-size:min(4.1vw,1.8vh)]">
            {"Сейчас золота"}
          </div>

          <div className="flex h-[5.2vh] items-center gap-x-1 rounded-[20px] bg-black/50 px-4 py-2.5">
            <div className="aspect-square h-full shrink-0" ref={coinsTargetRef}>
              <StarSVG
                height="100%"
                width="100%"
                viewBox="0 0 29 29"
                preserveAspectRatio="none"
              />
            </div>
            <div className="text-stroke-2 font-extrabold leading-none text-white [font-size:min(6.1vw,2.8vh)]">
              {formatNumber(balance)}
            </div>
          </div>
        </div>
      </div>

      {coinsAnimation !== null &&
        Array.from({ length: animatedCoinsAmount }).map((_, i) => {
          const { x, y } = getCoinPoint();

          return (
            <div
              key={`coin-${i}`}
              className={classNames(
                "absolute -top-2.5 left-0 h-[5.2vh] py-2.5 transition-transform duration-500",
                { "ease-out": coinsAnimation === CoinsAnimation.TARGET },
              )}
              style={{
                transform: `translateX(${x}px) translateY(${y}px)`,
              }}
              onTransitionEnd={() => {
                if (coinsAnimation === CoinsAnimation.SCATTER) {
                  setCoinsAnimation(CoinsAnimation.TARGET);
                } else if (coinsAnimation === CoinsAnimation.TARGET) {
                  handleCoinsTargetAnimationEnd();
                }
              }}
            >
              <div className="aspect-square h-full">
                <StarSVG
                  height="100%"
                  width="100%"
                  viewBox="0 0 29 29"
                  preserveAspectRatio="none"
                />
              </div>
            </div>
          );
        })}

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
