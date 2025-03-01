import React from "react";

import { Clock } from "./components/clock/Clock";

export const Timer = () => {
  const now = new Date();
  const nowUtcTimestamp = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
  );
  const thenUtcTimestamp = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    now.getUTCDate(),
  );
  const diff = thenUtcTimestamp - nowUtcTimestamp;
  const daysLeft = Math.floor(diff / (1000 * 3600 * 24));
  const hoursLeft = Math.floor(diff / (1000 * 3600)) - daysLeft * 24;

  return (
    <div className="absolute bottom-[65px] left-1/2 z-50 flex -translate-x-1/2 items-center">
      <div className="size-6">
        <Clock />
      </div>
      <div className="text-stroke-half relative -left-3 flex h-[22px] w-20 items-center rounded-md bg-[#A90A31] pl-4 text-xs font-black tracking-wide text-white shadow-[inset_-1px_1px_1px_rgba(255,255,255,0.15),inset_-1px_-2px_1px_rgba(0,0,0,0.3),0_2px_2px_rgba(0,0,0,0.3)] text-shadow-sm">
        {`${daysLeft}д. ${hoursLeft}ч.`}
      </div>
    </div>
  );
};
