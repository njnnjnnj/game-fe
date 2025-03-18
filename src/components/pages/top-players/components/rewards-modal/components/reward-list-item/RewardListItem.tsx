import React, { FunctionComponent } from "react";

import classNames from "classnames";

import { LeaderboardEnum } from "@/services/leaderboard/types";

import { PlayerValue } from "../../../players-list/components/list-item/components/player-value/PlayerValue";
import { Rank } from "../../../players-list/components/list-item/components/rank/Rank";

type Props = {
  rank: number | string;
  description: string;
  value: number;
  leaderboard: LeaderboardEnum;
};

export const RewardListItem: FunctionComponent<Props> = ({
  rank,
  description,
  value,
  leaderboard,
}) => {
  return (
    <div
      className={classNames(
        "relative z-30 rounded-xl border border-solid border-black/50 bg-[#6A8098] pb-1 shadow-[0_2px_4px_0_rgba(0,0,0,0.4)] transition-all duration-75",
      )}
    >
      <div
        className={classNames(
          "relative flex w-full items-center gap-2 rounded-xl bg-[#C9D7F1] p-2 text-sm font-semibold text-[#6A8098] shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.5),inset_0_-1px_0_0_rgba(255,255,255,0.8)]",
          "after:absolute after:left-[3px] after:right-[3px] after:top-[3px] after:z-30 after:h-6 after:rounded-t-[10px] after:bg-white after:opacity-20 after:content-['']",
        )}
      >
        <div className="relative z-10 flex w-full items-center gap-2">
          <Rank rank={rank} />
          <span className="text-stroke-1 font-extrabold capitalize text-white text-shadow-sm">
            {description}
          </span>
          <PlayerValue value={value} leaderboard={leaderboard} />
        </div>
      </div>
    </div>
  );
};
