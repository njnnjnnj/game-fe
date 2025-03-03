import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType } from "@/components/common/card/Card";
import { NS } from "@/constants/ns";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import Bucket from "@/public/assets/png/battle-pass/bucket.webp";
import StarSVG from "@/public/assets/svg/star.svg";

type Props = {
  clickToggle: boolean;
  onAnimationEnd: () => void;
};

type Point = { x: number; y: number };

export const BucketScene: FunctionComponent<Props> = ({ clickToggle }) => {
  const coinsSpawnRef = useRef<HTMLDivElement | null>(null);
  const coinsTargetRef = useRef<HTMLDivElement | null>(null);
  const [coins, setCoins] = useState(0);
  const [step, setStep] = useState(0);
  const [target, setTarget] = useState<Point | null>(null);
  const t = useTranslations(NS.COMMON.ROOT);

  useEffect(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  useEffect(() => {
    if (!coinsTargetRef.current || !coins) return;

    const rect = coinsTargetRef.current.getBoundingClientRect();

    setTimeout(() => {
      setTarget({ x: rect.x, y: rect.y });
    }, 1000);
  }, [coins]);

  useUpdateEffect(() => {
    setStep((prevStep) => prevStep + 1);
  }, [clickToggle]);

  const getSpawnTop = () => {
    if (!coinsSpawnRef.current) return 0;

    const rect = coinsSpawnRef.current.getBoundingClientRect();

    return rect.top + rect.height / 10;
  };
  console.log(target);
  return (
    <div className="absolute flex h-[100vh] w-full items-center justify-center">
      <div className="absolute aspect-[0.64] w-[43%]">
        <div
          className={classNames(
            "absolute bottom-[110%] w-full transition-transform duration-1000",
            {
              "scale-0": step === 0,
              "scale-100": step === 1,
            },
          )}
        >
          <div className="text-stroke-2 text-center font-black uppercase italic leading-[36px] text-white text-shadow [font-size:min(10.2vw,5vh)]">
            {"Ведро звезд"}
          </div>
          <div className="text-stroke-2 leading-1 mt-2 text-center font-extrabold uppercase italic text-[#00FF06] text-shadow [font-size:min(4.1vw,1.8vh)]">
            {"Ведро звезд"}
          </div>
        </div>

        <div
          className={classNames(
            "absolute h-full w-full transition-transform duration-1000",
            {
              "[transform:rotateY(0deg)_scale(0)]": step === 0,
              "[transform:rotateY(360deg)_scale(1)]": step === 1,
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
              "scale-0": step === 0,
              "scale-100": step === 1,
            },
          )}
          onTransitionEnd={() => {
            setCoins(20);
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
              30.500.000
            </div>
          </div>
        </div>
      </div>

      {Array.from({ length: Math.min(coins, 10) }).map((_, i) => (
        <div
          key={`coin-${i}`}
          className="absolute h-[5.2vh] py-2.5 transition-all duration-1000"
          style={{
            top: target ? target.y : `${getSpawnTop()}px`,
            left: target ? target.x : undefined,
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
      ))}

      <div
        className={classNames(
          "absolute inset-x-10 text-center font-black uppercase italic leading-[36px] text-white transition-[top] duration-500 ease-linear text-shadow [font-size:min(7.6vw,3.5vh)]",
          {
            "top-[85vh]": true,
            // "top-[120vh]": step === 1,
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
