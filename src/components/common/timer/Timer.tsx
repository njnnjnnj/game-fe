import React from "react";

import { useTranslations } from "next-intl";

import { NS } from "@/constants/ns";
import { getDaysAndHoursTillStartOfNextMonth } from "@/utils/date";

import { Clock } from "./components/clock/Clock";

export const Timer = () => {
  const t = useTranslations(NS.COMMON.ROOT);
  const { days, hours } = getDaysAndHoursTillStartOfNextMonth();

  return (
    <div className="absolute bottom-[65px] left-1/2 z-50 flex -translate-x-1/2 items-center">
      <div className="size-6">
        <Clock />
      </div>
      <div className="text-stroke-half relative -left-3 flex h-[22px] items-center rounded-md bg-[#A90A31] pl-4 pr-2 justify-center text-xs font-black tracking-wide text-white shadow-[inset_-1px_1px_1px_rgba(255,255,255,0.15),inset_-1px_-2px_1px_rgba(0,0,0,0.3),0_2px_2px_rgba(0,0,0,0.3)] text-shadow-sm">
        {`${days ? `${t(NS.COMMON.DAYS, { days })} ` : ""}${t(NS.COMMON.HOURS, { hours })}`}
      </div>
    </div>
  );
};
