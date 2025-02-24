import React from "react";

import { useTranslations } from "next-intl";

import { NS } from "@/constants/ns";

export const RewardScreen = () => {
  const t = useTranslations(NS.COMMON.ROOT);

  return (
    <div className="fixed inset-0 z-50 bg-bp-premium-item-locked-pattern">
      <div className="absolute inset-x-10 bottom-[7%] animate-slot-win-view-text-pulse text-center font-black uppercase italic leading-[36px] text-white text-shadow [font-size:min(7.6vw,3.5vh)]">
        {t(`${NS.COMMON.TAP_TO_CONTINUE}`)}
      </div>
    </div>
  );
};
