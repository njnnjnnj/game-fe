import React, { FunctionComponent } from "react";

import classNames from "classnames";

import { Leader } from "@/services/leaderboard/types";

import { PlayerAvatar } from "./components/player-avatar/PlayerAvatar";
import { PlayerInfo } from "./components/player-info/PlayerInfo";
import { PlayerValue } from "./components/player-value/PlayerValue";
import { Rank } from "./components/rank/Rank";

type Props = {
  leader: Leader;
  isLoading: boolean;
};

export const ListItem: FunctionComponent<Props> = ({ leader, isLoading }) => {
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
        <div className="relative z-10 flex w-full gap-2">
          <Rank rank={leader?.rank} />

          <PlayerAvatar url={leader?.photo_url} isLoading={isLoading} />
          <PlayerInfo
            name={leader?.name}
            league="League name"
            isLoading={isLoading}
          />
          <PlayerValue value={leader?.value} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
