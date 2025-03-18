import React, { FunctionComponent } from "react";

import FriendsSVG from "@/public/assets/svg/friends-coin.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { LeaderboardEnum } from "@/services/leaderboard/types";
import { formatValue } from "@/utils/lib/utils";

type Props = {
  value: number;
  isLoading?: boolean;
  leaderboard: LeaderboardEnum;
};

export const PlayerValue: FunctionComponent<Props> = ({
  value,
  isLoading,
  leaderboard,
}) => {
  return (
    <div className="ml-auto flex w-1/3 shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#8E9EB7] px-3 py-2 shadow-[inset_0_2px_1px_0_rgba(0,0,0,0.3)]">
      {isLoading ? (
        <>
          <div className="size-4 animate-pulse rounded-full bg-white" />
          <div className="h-3.5 w-12 animate-pulse rounded-full bg-white" />
        </>
      ) : (
        <>
          {leaderboard === LeaderboardEnum.FRIEND ? (
            <FriendsSVG className="size-4 shrink-0" />
          ) : (
            <StarSVG className="size-4 shrink-0" />
          )}
          <span className="text-stroke-half text-xs font-black tracking-wide text-white text-shadow-sm">
            {formatValue(value)}
          </span>
        </>
      )}
    </div>
  );
};
