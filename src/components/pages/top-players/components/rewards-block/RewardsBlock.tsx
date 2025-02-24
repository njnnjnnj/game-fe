import React from "react";

import classNames from "classnames";

import { DrawerTrigger } from "@/components/ui/drawer";
import BoxSVG from "@/public/assets/svg/top-players/box.svg";

export const RewardsBlock = () => {
  return (
    <DrawerTrigger asChild>
      <button className="fixed bottom-30 right-8 z-50 h-[70px] w-[91px] rounded-xl border border-solid border-black/50 bg-[#6D1F93] pb-1 transition-all active:scale-[0.98]">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#5409A4] to-[#8C42D7] shadow-[inset_0_-2px_4px_0_rgba(207,114,255,0.6),inset_0_-1px_0_0_rgba(207,114,255,0.8)]">
          <div
            className={classNames(
              "text-stroke-1 top-players-timer-shadows relative mb-auto flex h-[22px] w-full items-center justify-center rounded-t-xl bg-[#FFB900] text-sm font-extrabold tracking-wide text-white text-shadow-sm",
            )}
          >
            Награды
          </div>
          <BoxSVG className="mb-1" />
        </div>
      </button>
    </DrawerTrigger>
  );
};
