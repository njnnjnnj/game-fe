import React, { createElement, FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import { LeaderboardEnum } from "@/services/leaderboard/types";
import { League } from "@/services/profile/types";

import { LEAGUE_INFO, LEAGUE_SHIELDS } from "./constants";

type Props = {
  insetTop: number;
  league: League;
  selectedLeaderboard: LeaderboardEnum;
};

export const LeagueInfo: FunctionComponent<Props> = ({
  insetTop,
  league,
  selectedLeaderboard,
}) => {
  const t = useTranslations(NS.PAGES.TOP_PLAYERS.ROOT);

  const calculatedMarginTop = insetTop ? insetTop + 80 : 120;

  const getDescription = () => {
    if (selectedLeaderboard === LeaderboardEnum.FRIEND) {
      return t(
        `${NS.PAGES.TOP_PLAYERS.TOURNAMENTS.ROOT}.${NS.PAGES.TOP_PLAYERS.TOURNAMENTS.FRIENDS_DESCRIPTION}`,
      );
    } else if (selectedLeaderboard === LeaderboardEnum.WORLD) {
      return t(
        `${NS.PAGES.TOP_PLAYERS.TOURNAMENTS.ROOT}.${NS.PAGES.TOP_PLAYERS.TOURNAMENTS.WORLD_DESCRIPTION}`,
      );
    }

    return t(
      `${NS.PAGES.TOP_PLAYERS.TOURNAMENTS.ROOT}.${NS.PAGES.TOP_PLAYERS.TOURNAMENTS.DESCRIPTION}`,
    );
  };

  return (
    <div
      className="mt-30 w-full px-4"
      style={{ marginTop: calculatedMarginTop }}
    >
      <div className="grid w-full grid-cols-[48px_48px_84px_48px_48px] items-center justify-center gap-5 pb-5">
        {Object.values(LEAGUE_SHIELDS).map((icon, index) =>
          createElement(icon, {
            key: index,
            className: classNames("w-full h-auto", {
              "mt-12":
                index === 0 ||
                index === Object.values(LEAGUE_SHIELDS).length - 1,
              "mt-4":
                index === 1 ||
                index === Object.values(LEAGUE_SHIELDS).length - 2,
            }),
          }),
        )}
      </div>
      <h3 className="text-stroke-half mb-2 text-center text-2xl font-black uppercase tracking-wide text-white text-shadow">
        {t(LEAGUE_INFO[league].TITLE_TID)}
      </h3>
      <p className="text-medium text-center text-sm text-white/50">
        {getDescription()}
      </p>
    </div>
  );
};
