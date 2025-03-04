import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType } from "@/components/common/card/Card";
import { NS } from "@/constants/ns";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import Bucket from "@/public/assets/png/battle-pass/bucket.webp";

type Props = {
  clickToggle: boolean;
  onFinishScene: () => void;
};

enum AppearanceAnimation {
  APPEARANCE,
  DISAPPEARANCE,
}

export const BG_CLASS = 'bg-reward-screen-hero-and-cloth-pattern';

export const FinalScene: FunctionComponent<Props> = ({
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
      <div className="absolute w-full px-4">
        <div className="absolute bottom-[110%] left-1/2 mb-[10%] w-[55%] -translate-x-1/2">
          <div
            className={classNames(
              "text-stroke-2 text-center font-black uppercase italic leading-[36px] text-white transition-transform duration-1000 text-shadow [font-size:min(10.2vw,5vh)]",
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
            {"Ваша награда"}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2">
            <div
              className={classNames(
                "aspect-[0.65] basis-[25%] transition-transform duration-1000",
                {
                  "[transform:rotateY(0deg)_scale(0)]":
                    appearanceAnimation !== AppearanceAnimation.APPEARANCE,
                  "[transform:rotateY(360deg)_scale(1)]":
                    appearanceAnimation === AppearanceAnimation.APPEARANCE,
                },
              )}
            >
              <Card type={CardType.ORANGE} isFullSize>
                <div className="absolute top-1/2 aspect-square w-full -translate-y-1/2">
                  <Image src={Bucket} alt="" fill sizes="50vw" quality={100} />
                </div>
                <span className="text-stroke-1 absolute bottom-2 left-1/2 z-20 w-full -translate-x-1/2 text-center text-sm font-black text-shadow">
                  x150k
                </span>
              </Card>
            </div>
            <div
              className={classNames(
                "aspect-[0.65] basis-[25%] transition-transform duration-1000",
                {
                  "[transform:rotateY(0deg)_scale(0)]":
                    appearanceAnimation !== AppearanceAnimation.APPEARANCE,
                  "[transform:rotateY(360deg)_scale(1)]":
                    appearanceAnimation === AppearanceAnimation.APPEARANCE,
                },
              )}
            >
              <Card type={CardType.ORANGE} isFullSize>
                <div className="absolute top-1/2 aspect-square w-full -translate-y-1/2">
                  <Image src={Bucket} alt="" fill sizes="50vw" quality={100} />
                </div>
                <span className="text-stroke-1 absolute bottom-2 left-1/2 z-20 w-full -translate-x-1/2 text-center text-sm font-black text-shadow">
                  x150k
                </span>
              </Card>
            </div>
            <div
              className={classNames(
                "aspect-[0.65] basis-[25%] transition-transform duration-1000",
                {
                  "[transform:rotateY(0deg)_scale(0)]":
                    appearanceAnimation !== AppearanceAnimation.APPEARANCE,
                  "[transform:rotateY(360deg)_scale(1)]":
                    appearanceAnimation === AppearanceAnimation.APPEARANCE,
                },
              )}
            >
              <Card type={CardType.ORANGE} isFullSize>
                <div className="absolute top-1/2 aspect-square w-full -translate-y-1/2">
                  <Image src={Bucket} alt="" fill sizes="50vw" quality={100} />
                </div>
                <span className="text-stroke-1 absolute bottom-2 left-1/2 z-20 w-full -translate-x-1/2 text-center text-sm font-black text-shadow">
                  x150k
                </span>
              </Card>
            </div>
            <div
              className={classNames(
                "aspect-[0.65] basis-[25%] transition-transform duration-1000",
                {
                  "[transform:rotateY(0deg)_scale(0)]":
                    appearanceAnimation !== AppearanceAnimation.APPEARANCE,
                  "[transform:rotateY(360deg)_scale(1)]":
                    appearanceAnimation === AppearanceAnimation.APPEARANCE,
                },
              )}
            >
              <Card type={CardType.ORANGE} isFullSize>
                <div className="absolute top-1/2 aspect-square w-full -translate-y-1/2">
                  <Image src={Bucket} alt="" fill sizes="50vw" quality={100} />
                </div>
                <span className="text-stroke-1 absolute bottom-2 left-1/2 z-20 w-full -translate-x-1/2 text-center text-sm font-black text-shadow">
                  x150k
                </span>
              </Card>
            </div>
          </div>
          <div className="flex gap-x-2">
            <div
              className={classNames(
                "aspect-[0.65] basis-[25%] transition-transform duration-1000",
                {
                  "[transform:rotateY(0deg)_scale(0)]":
                    appearanceAnimation !== AppearanceAnimation.APPEARANCE,
                  "[transform:rotateY(360deg)_scale(1)]":
                    appearanceAnimation === AppearanceAnimation.APPEARANCE,
                },
              )}
            >
              <Card type={CardType.ORANGE} isFullSize>
                <div className="absolute top-1/2 aspect-square w-full -translate-y-1/2">
                  <Image src={Bucket} alt="" fill sizes="50vw" quality={100} />
                </div>
                <span className="text-stroke-1 absolute bottom-2 left-1/2 z-20 w-full -translate-x-1/2 text-center text-sm font-black text-shadow">
                  x150k
                </span>
              </Card>
            </div>
            <div
              className={classNames(
                "aspect-[0.65] basis-[25%] transition-transform duration-1000",
                {
                  "[transform:rotateY(0deg)_scale(0)]":
                    appearanceAnimation !== AppearanceAnimation.APPEARANCE,
                  "[transform:rotateY(360deg)_scale(1)]":
                    appearanceAnimation === AppearanceAnimation.APPEARANCE,
                },
              )}
            >
              <Card type={CardType.ORANGE} isFullSize>
                <div className="absolute top-1/2 aspect-square w-full -translate-y-1/2">
                  <Image src={Bucket} alt="" fill sizes="50vw" quality={100} />
                </div>
                <span className="text-stroke-1 absolute bottom-2 left-1/2 z-20 w-full -translate-x-1/2 text-center text-sm font-black text-shadow">
                  x150k
                </span>
              </Card>
            </div>
            <div
              className={classNames(
                "aspect-[0.65] basis-[25%] transition-transform duration-1000",
                {
                  "[transform:rotateY(0deg)_scale(0)]":
                    appearanceAnimation !== AppearanceAnimation.APPEARANCE,
                  "[transform:rotateY(360deg)_scale(1)]":
                    appearanceAnimation === AppearanceAnimation.APPEARANCE,
                },
              )}
            >
              <Card type={CardType.ORANGE} isFullSize>
                <div className="absolute top-1/2 aspect-square w-full -translate-y-1/2">
                  <Image src={Bucket} alt="" fill sizes="50vw" quality={100} />
                </div>
                <span className="text-stroke-1 absolute bottom-2 left-1/2 z-20 w-full -translate-x-1/2 text-center text-sm font-black text-shadow">
                  x150k
                </span>
              </Card>
            </div>
            <div
              className={classNames(
                "aspect-[0.65] basis-[25%] transition-transform duration-1000",
                {
                  "[transform:rotateY(0deg)_scale(0)]":
                    appearanceAnimation !== AppearanceAnimation.APPEARANCE,
                  "[transform:rotateY(360deg)_scale(1)]":
                    appearanceAnimation === AppearanceAnimation.APPEARANCE,
                },
              )}
            >
              <Card type={CardType.ORANGE} isFullSize>
                <div className="absolute top-1/2 aspect-square w-full -translate-y-1/2">
                  <Image src={Bucket} alt="" fill sizes="50vw" quality={100} />
                </div>
                <span className="text-stroke-1 absolute bottom-2 left-1/2 z-20 w-full -translate-x-1/2 text-center text-sm font-black text-shadow">
                  x150k
                </span>
              </Card>
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
