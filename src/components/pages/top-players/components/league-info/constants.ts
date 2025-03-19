import { FC, SVGProps } from "react";

import { NS } from "@/constants/ns";
import SilverShieldSVG from "@/public/assets/svg/top-players/gray-shield.svg";
import SaphireShieldSVG from "@/public/assets/svg/top-players/lightblue-shield.svg";
import LockedShieldSVG from "@/public/assets/svg/top-players/locked-shield.svg";
import GoldShieldSVG from "@/public/assets/svg/top-players/yellow-shield.svg";
import { League } from "@/services/profile/types";

type ShieldSVG = FC<SVGProps<SVGSVGElement>>;

export const LEAGUE_SHIELDS: Partial<Record<League, ShieldSVG>> = {
  [League.SILVER]: SilverShieldSVG,
  [League.GOLD]: GoldShieldSVG,
  [League.BRILLIANT]: SaphireShieldSVG,
  [League.BRONZE]: LockedShieldSVG,
  [League.PLATINUM]: LockedShieldSVG,
};

export const LEAGUE_INFO = {
  [League.SILVER]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.LEAGUES.ROOT}.${NS.PAGES.TOP_PLAYERS.LEAGUES.SILVER}`,
  },
  [League.GOLD]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.LEAGUES.ROOT}.${NS.PAGES.TOP_PLAYERS.LEAGUES.GOLD}`,
  },
  [League.BRILLIANT]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.LEAGUES.ROOT}.${NS.PAGES.TOP_PLAYERS.LEAGUES.BRILLIANT}`,
  },
  [League.BRONZE]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.LEAGUES.ROOT}.${NS.PAGES.TOP_PLAYERS.LEAGUES.BRONZE}`,
  },
  [League.PLATINUM]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.LEAGUES.ROOT}.${NS.PAGES.TOP_PLAYERS.LEAGUES.PLATINUM}`,
  },
  [League.BILLIARD]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.LEAGUES.ROOT}.${NS.PAGES.TOP_PLAYERS.LEAGUES.BILLIARD}`,
  },
};

export const RANKED_LEAGUES = [
  League.BRONZE,
  League.SILVER,
  League.GOLD,
  League.PLATINUM,
  League.BRILLIANT,
  League.BILLIARD,
];
