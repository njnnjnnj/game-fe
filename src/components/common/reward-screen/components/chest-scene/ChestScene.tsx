import React, { FunctionComponent, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import Dust from "@/public/assets/png/reward-screen/dust.webp";
import MegaChestOpen from "@/public/assets/png/reward-screen/mega-chest-open.webp";
import { ChestType } from "@/types/rewards";

import { SceneIntrinsicProps } from "../../types";

import { MegaChest } from "./components/mega-chest/MegaChest";

export type Props = SceneIntrinsicProps & {
  type: ChestType;
};

export const BG_CLASS = 'bg-reward-screen-chest-pattern';

export const ChestScene: FunctionComponent<Props> = ({
  clickToggle,
  onFinishScene,
}) => {
  const t = useTranslations(NS.COMMON.ROOT);
  const [step, setStep] = useState(0);

  useUpdateEffect(
    () => setStep((prevStep) => Math.min(prevStep + 1, 1)),
    [clickToggle],
  );

  return (
    <div className="absolute flex h-[100vh] w-full items-center justify-center">
      <div
        className={classNames(
          "absolute w-[60%] transition-[bottom] duration-500 ease-linear",
          {
            "bottom-[70vh]": step === 0,
            "bottom-[120vh]": step === 1,
          },
        )}
      >
        <div className="text-stroke-2 animate-reward-screen-text-scale text-center font-black uppercase italic leading-[36px] text-white text-shadow [font-size:min(10.2vw,5vh)]">
          {"Нажми на меня!"}
        </div>
      </div>

      <div className="absolute aspect-[0.82] w-[66.6%]">
        <div
          className={classNames(
            "h-full w-full transition-opacity duration-200 ease-linear",
            {
              "opacity-1": step === 0,
              "opacity-0": step === 1,
            },
          )}
        >
          <MegaChest />
        </div>
      </div>

      <div
        className={classNames(
          "absolute aspect-[0.82] w-[66.6%] -translate-y-1/2 transition-[top] delay-500 duration-700 ease-linear",
          { "invisible top-[50vh]": step === 0, "top-[150vh]": step === 1 },
        )}
        onTransitionEnd={onFinishScene}
      >
        <Image src={MegaChestOpen} alt="" quality={100} fill />
      </div>
      <div
        className={classNames(
          "absolute aspect-[0.56] w-[66.6%] translate-y-[30%] mix-blend-screen transition-[bottom] delay-500 duration-700 ease-linear",
          {
            "invisible bottom-[50vh]": step === 0,
            "bottom-[150vh]": step === 1,
          },
        )}
      >
        <Image src={Dust} alt="" quality={100} fill />
      </div>

      <div
        className={classNames(
          "absolute inset-x-10 text-center font-black uppercase italic leading-[36px] text-white transition-[top] duration-500 ease-linear text-shadow [font-size:min(7.6vw,3.5vh)]",
          {
            "top-[85vh]": step === 0,
            "top-[120vh]": step === 1,
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
