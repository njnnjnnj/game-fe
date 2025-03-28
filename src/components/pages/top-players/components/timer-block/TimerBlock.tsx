import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Clock } from "@/components/common/timer/components/clock/Clock";
import { NS } from "@/constants/ns";
import { LeaderboardEnum } from "@/services/leaderboard/types";
import {
  getDaysAndHoursTillMonthAndDay,
  getDaysAndHoursTillStartOfNextMonth,
} from "@/utils/date";

type Props = {
  leaderboard: LeaderboardEnum;
};

const LEAGUE_MIDDLE_MONTH_RESET_DAY = 15;

export const TimerBlock: FunctionComponent<Props> = ({ leaderboard }) => {
  const t = useTranslations(NS.COMMON.ROOT);

  const now = new Date();
  const { days, hours } =
    leaderboard === LeaderboardEnum.LEAGUE
      ? now.getUTCDate() >= LEAGUE_MIDDLE_MONTH_RESET_DAY
        ? getDaysAndHoursTillStartOfNextMonth()
        : getDaysAndHoursTillMonthAndDay(
            now.getUTCMonth(),
            LEAGUE_MIDDLE_MONTH_RESET_DAY,
          )
      : getDaysAndHoursTillStartOfNextMonth();

  return (
    <div className="fixed bottom-30 left-4 z-50 h-[70px] min-w-[78px] rounded-xl border border-solid border-black/50 bg-[#6D1F93] pb-1">
      <div className="h-full w-full rounded-xl bg-gradient-to-b from-[#5409A4] to-[#8C42D7] shadow-[inset_0_-2px_4px_0_rgba(207,114,255,0.6),inset_0_-1px_0_0_rgba(207,114,255,0.8)]">
        <div className="absolute -top-2 left-1/2 z-[55] size-9 -translate-x-1/2 rounded-full border border-solid border-black">
          <Clock />
        </div>
        <div
          className={classNames(
            "top-players-timer-shadows relative h-[22px] w-full rounded-t-xl bg-[#E9DBFE]",
            "after:absolute after:left-0.5 after:right-0.5 after:top-0.5 after:h-2.5 after:rounded-t-[10px] after:bg-white after:opacity-60 after:content-['']",
          )}
        />
        <div className="text-stroke-1 top-players-timer-badge-shadows mx-1 mt-2.5 rounded-md bg-[#6019B3] px-2 py-1 text-center text-sm font-extrabold tracking-wide text-white text-shadow-sm">
          {`${days ? `${t(NS.COMMON.DAYS, { days })} ` : ""}${t(NS.COMMON.HOURS, { hours })}`}
        </div>
      </div>
    </div>
  );
};
