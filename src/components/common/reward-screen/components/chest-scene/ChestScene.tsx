import React, { FunctionComponent, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import Dust from "@/public/assets/png/reward-screen/dust.webp";
import EpicChestOpen from "@/public/assets/png/reward-screen/epic-chest-open.webp";
import MegaChestOpen from "@/public/assets/png/reward-screen/mega-chest-open.webp";
import StartChestOpen from "@/public/assets/png/reward-screen/start-chest-open.webp";
import { ChestType } from "@/types/rewards";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

import { SceneIntrinsicProps } from "../../types";
import { SceneFooter } from "../scene-footer/SceneFooter";

import { EpicChest } from "./components/epic-chest/EpicChest";
import { MegaChest } from "./components/mega-chest/MegaChest";
import { StartChest } from "./components/start-chest/StartChest";

export type Props = SceneIntrinsicProps & {
  type: ChestType;
};

export const BG_CLASS = "bg-reward-screen-chest-pattern";

export const ChestScene: FunctionComponent<Props> = ({
  type,
  clickToggle,
  onFinishScene,
}) => {
  const tRewards = useTranslations(NS.REWARDS_SCREEN.ROOT);
  const { webApp } = useTelegram();
  const [step, setStep] = useState(0);

  useUpdateEffect(
    () => setStep((prevStep) => Math.min(prevStep + 1, 1)),
    [clickToggle],
  );

  const tgSafeInsetTop = webApp ? getTgSafeAreaInsetTop(webApp) : 0;

  let Animation = StartChest;
  let OpenImg = StartChestOpen;

  if (type === ChestType.EPIC) {
    Animation = EpicChest;
    OpenImg = EpicChestOpen;
  } else if (type === ChestType.MEGA) {
    Animation = MegaChest;
    OpenImg = MegaChestOpen;
  }

  return (
    <div
      className={classNames(
        "absolute flex h-[100vh] w-full items-center justify-center",
        tgSafeInsetTop
          ? {
              paddingTop: tgSafeInsetTop,
            }
          : undefined,
      )}
    >
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
          {tRewards(
            `${NS.REWARDS_SCREEN.CHEST_SCENE.ROOT}.${NS.REWARDS_SCREEN.CHEST_SCENE.TITLE}`,
          )}
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
          <Animation />
        </div>
      </div>

      <div
        className={classNames(
          "absolute aspect-[0.82] w-[66.6%] -translate-y-1/2 transition-[top] delay-500 duration-700 ease-linear",
          { "invisible top-[50vh]": step === 0, "top-[150vh]": step === 1 },
        )}
        onTransitionEnd={onFinishScene}
      >
        <Image src={OpenImg} alt="" quality={100} fill />
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

      <SceneFooter isMovingIn={step === 0} isMovingOut={step === 1} />
    </div>
  );
};
