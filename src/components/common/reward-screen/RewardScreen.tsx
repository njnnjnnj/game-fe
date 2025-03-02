import React, { useState } from "react";

import { useTranslations } from "next-intl";

import { NS } from "@/constants/ns";

import { MegaChestScene } from "./components/mega-chest-scene/MegaChestScene";

export const RewardScreen = () => {
  const t = useTranslations(NS.COMMON.ROOT);
  const [step, setStep] = useState(0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bp-premium-item-locked-pattern"
      onClick={() => setStep((prevStep) => prevStep + 1)}
    >
      <div className="absolute aspect-square h-[120vh] animate-spin bg-[url('/assets/png/reward-screen/rays-bg.webp')] bg-cover bg-center [animation-duration:10s]" />
      <MegaChestScene step={step} />
      <div className="absolute inset-x-10 bottom-[7%] animate-slot-win-view-text-pulse text-center font-black uppercase italic leading-[36px] text-white text-shadow [font-size:min(7.6vw,3.5vh)]">
        {t(`${NS.COMMON.TAP_TO_CONTINUE}`)}
      </div>
    </div>
  );
};
