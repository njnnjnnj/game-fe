import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType } from "@/components/common/card/Card";
import { AnimatedNumber } from "@/components/pages/slot-machine/components/machine/components/animated-number/AnimatedNumber";
import { NS } from "@/constants/ns";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import GameEnergyIcon from "@/public/assets/png/game-energy.webp";
import CoinSVG from "@/public/assets/svg/coin.svg";
import FriendsSVG from "@/public/assets/svg/friends-coin.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { useGetProfile } from "@/services/profile/queries";
import { useGetBandit } from "@/services/slot-machine/queries";
import { CofferKey, Reward } from "@/types/rewards";
import { formatValue } from "@/utils/lib/utils";
import { formatNumber } from "@/utils/number";
import { getImgByReward } from "@/utils/rewards";

import { SceneIntrinsicProps } from "../../types";
import { SceneFooter } from "../scene-footer/SceneFooter";

export type Props = SceneIntrinsicProps & {
  type: Exclude<CofferKey, "auto" | "characters" | "clothes">;
  reward: number;
};

type Point = { x: number; y: number };

export const BG_CLASS = "bg-reward-screen-bucket-pattern";

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

const renderCoin = (type: CofferKey) => {
  if (type === "stars") {
    return (
      <StarSVG
        width="100%"
        height="100%"
        viewBox="0 0 29 29"
        preserveAspectRatio="none"
      />
    );
  }

  if (type === "friends") {
    return (
      <FriendsSVG
        width="100%"
        height="100%"
        viewBox="0 0 28 28"
        preserveAspectRatio="none"
      />
    );
  }

  if (type === "game_energy") {
    return <Image src={GameEnergyIcon} width={28} height={28} alt="" />;
  }

  return (
    <CoinSVG
      width="100%"
      height="100%"
      viewBox="0 0 28 28"
      preserveAspectRatio="none"
    />
  );
};

const calculateBalance = (balance: number, reward: number) =>
  Math.round(Math.max(balance - reward, 0));

export const BucketScene: FunctionComponent<Props> = ({
  type,
  reward,
  clickToggle,
  onFinishScene,
}) => {
  const tRewards = useTranslations(NS.REWARDS_SCREEN.ROOT);
  const coinsSpawnRef = useRef<HTMLDivElement | null>(null);
  const coinsTargetRef = useRef<HTMLDivElement | null>(null);
  const coinsAnimationTimerRef = useRef<NodeJS.Timeout>();
  const appearanceAnimationTimerRef = useRef<NodeJS.Timeout>();
  const [appearanceAnimation, setAppearanceAnimation] =
    useState<AppearanceAnimation | null>(null);
  const [coinsAnimation, setCoinsAnimation] = useState<CoinsAnimation | null>(
    null,
  );

  const isShowingBooster = type === "buster" || type === "offline";
  const isShowingGameEnergy = type === "game_energy";

  const { data: profile } = useGetProfile(!isShowingBooster);
  const { data: banditInfo } = useGetBandit(isShowingGameEnergy);
  const [balance, setBalance] = useState(() => {
    if (isShowingGameEnergy) {
      return calculateBalance(banditInfo?.balance ?? 0, reward);
    } else if (!isShowingBooster) {
      return calculateBalance(profile?.[type] ?? 0, reward);
    }
  });

  useEffect(() => {
    // There are certain cases when Bandit Info doesn't have enough time to fetch
    if (isShowingGameEnergy && banditInfo?.balance) {
      setBalance(calculateBalance(banditInfo?.balance ?? 0, reward));
    }
  }, [isShowingGameEnergy, banditInfo?.balance, reward]);

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
    setCoinsAnimation(null);
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

  const animatedCoinsAmount = Math.min(reward, 10);
  const coinsCounter = useRef(animatedCoinsAmount);

  const handleCoinsTargetAnimationEnd = () => {
    coinsCounter.current -= 1;

    if (coinsCounter.current === 0) {
      setCoinsAnimation(null);
      setBalance((prevBalance) => (prevBalance ?? 0) + reward);
    }
  };

  return (
    <div className="absolute flex h-[100vh] w-full items-center justify-center">
      <div className="absolute aspect-[0.64] w-[43%]">
        <div
          className={classNames(
            "absolute bottom-[110%] flex w-full flex-col items-center transition-transform duration-500",
            {
              "scale-0": appearanceAnimation !== AppearanceAnimation.APPEARANCE,
              "scale-100":
                appearanceAnimation === AppearanceAnimation.APPEARANCE,
            },
          )}
          onTransitionEnd={() => {
            if (appearanceAnimation === AppearanceAnimation.APPEARANCE) {
              if (!isShowingBooster) {
                setCoinsAnimation(CoinsAnimation.SPAWN);
              }
            } else if (
              appearanceAnimation === AppearanceAnimation.DISAPPEARANCE
            ) {
              finishScene();
            }
          }}
        >
          <div className="text-stroke-2 inline-flex text-center font-black uppercase italic leading-[36px] text-white text-shadow [font-size:min(10.2vw,5vh)]">
            {tRewards(
              `${NS.REWARDS_SCREEN.BUCKET_SCENE.ROOT}.${NS.REWARDS_SCREEN.BUCKET_SCENE.CARD_TITLE}`,
              {
                type,
              },
            )}
          </div>
          <div className="text-stroke-2 leading-1 mt-2 text-center font-extrabold uppercase italic text-[#00FF06] text-shadow [font-size:min(4.1vw,1.8vh)]">
            {tRewards(
              `${NS.REWARDS_SCREEN.BUCKET_SCENE.ROOT}.${NS.REWARDS_SCREEN.BUCKET_SCENE.CARD_SUBTITLE}`,
            )}
          </div>
        </div>

        <div
          className={classNames(
            "absolute h-full w-full transition-transform duration-500",
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
              <Image
                src={getImgByReward(type as Reward)}
                alt=""
                fill
                sizes="50vw"
                quality={100}
              />
            </div>
            <span className="text-stroke-1 absolute bottom-2 left-1/2 z-20 w-full -translate-x-1/2 text-center text-2xl font-black text-shadow">
              {type === "offline"
                ? tRewards(
                    `${NS.REWARDS_SCREEN.BUCKET_SCENE.ROOT}.${NS.REWARDS_SCREEN.BUCKET_SCENE.BOOSTER_DURATION}`,
                    { hours: reward },
                  )
                : `x${formatValue(reward)}`}
            </span>
          </Card>
        </div>

        {!isShowingBooster && typeof balance === "number" && (
          <div
            className={classNames(
              "absolute top-[110%] flex w-full flex-col items-center gap-y-3 transition-transform duration-500",
              {
                "scale-0":
                  appearanceAnimation !== AppearanceAnimation.APPEARANCE,
                "scale-100":
                  appearanceAnimation === AppearanceAnimation.APPEARANCE,
              },
            )}
          >
            <div className="text-stroke-2 mt-2 text-center font-extrabold uppercase italic leading-none text-white text-shadow [font-size:min(4.1vw,1.8vh)]">
              {tRewards(
                `${NS.REWARDS_SCREEN.BUCKET_SCENE.ROOT}.${NS.REWARDS_SCREEN.BUCKET_SCENE.BALANCE_TITLE}`,
                {
                  type,
                },
              )}
            </div>

            <div className="flex h-[5.2vh] items-center gap-x-1 rounded-[20px] bg-black/50 px-4 py-2.5">
              <div
                className="aspect-square h-full shrink-0"
                ref={coinsTargetRef}
              >
                {renderCoin(type)}
              </div>
              <AnimatedNumber
                className="text-stroke-2 relative font-extrabold leading-none text-white [font-size:min(6.1vw,2.8vh)]"
                targetNum={balance}
                formatter={formatNumber}
                startFromTarget
              />
            </div>
          </div>
        )}
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
              <div className="aspect-square h-full">{renderCoin(type)}</div>
            </div>
          );
        })}

      <SceneFooter
        isMovingIn={appearanceAnimation !== AppearanceAnimation.DISAPPEARANCE}
        isMovingOut={appearanceAnimation === AppearanceAnimation.DISAPPEARANCE}
      />
    </div>
  );
};
