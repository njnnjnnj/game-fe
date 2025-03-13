import React from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { SideLink } from "@/components/common";
import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import BeastImage from "@/public/assets/png/home/beast.webp";
import FriendsImage from "@/public/assets/png/home/friends.webp";
import PacketImage from "@/public/assets/png/home/packet.webp";
import TicketImage from "@/public/assets/png/home/ticket.webp";

const SIDE_LINKS = [
  {
    image: BeastImage,
    tKey: `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.ACTION}`,
  },
  {
    image: TicketImage,
    tKey: `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.ACTION}`,
  },
  {
    image: FriendsImage,
    tKey: `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.FRIENDS}`,
    href: ROUTES.FRIENDS,
  },
  {
    image: PacketImage,
    tKey: `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.CLOTHES}`,
    href: ROUTES.SHOP_CLOTHES,
  },
];

export const SideLinks = () => {
  const t = useTranslations(NS.PAGES.HOME.ROOT);

  return SIDE_LINKS.map(({ image, tKey, href }, i) => (
    <div
      key={`side-link-${i}`}
      className={classNames("absolute aspect-square h-[8.2%]", {
        "left-[7.6%] top-[15.2%]": i === 0,
        "left-[7.6%] top-[25.9%]": i === 1,
        "right-[7.6%] top-[15.2%]": i === 2,
        "right-[7.6%] top-[25.9%]": i === 3,
      })}
    >
      <SideLink image={image} href={href} text={t(tKey)} isFullSize />
    </div>
  ));
};
