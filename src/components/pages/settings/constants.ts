import { FunctionComponent, SVGProps } from "react";

import { NS } from "@/constants/ns";
import FrindsSvg from "@/public/assets/svg/friends-coin.svg";
import StarCoin from "@/public/assets/svg/star.svg";

type ItemProps = {
  type: "coin" | "star" | "friend";
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  tidKey: string;
  value: number;
  postfix?: string;
  onOpen?: () => void;
};

export const PROFILE_BALANCE_ITEMS = ({
  coins,
  stars,
  friends,
}: {
  coins: number;
  stars: number;
  friends: number;
}): ItemProps[] => [
  {
    type: "coin",
    icon: StarCoin,
    tidKey: `${NS.PAGES.SETTINGS.BALANCE.ROOT}.${NS.PAGES.SETTINGS.BALANCE.TITLE}`,
    value: coins,
  },
  {
    type: "star",
    icon: StarCoin,
    tidKey: `${NS.PAGES.SETTINGS.BALANCE.ROOT}.${NS.PAGES.SETTINGS.BALANCE.STARS}`,
    value: stars,
  },
  {
    type: "friend",
    icon: FrindsSvg,
    tidKey: `${NS.PAGES.SETTINGS.BALANCE.ROOT}.${NS.PAGES.SETTINGS.BALANCE.FRIENDS}`,
    value: friends,
  },
];
