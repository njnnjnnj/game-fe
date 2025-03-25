import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { SideLink } from "@/components/common";
import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import FriendsImage from "@/public/assets/png/home/friends.webp";
import PacketImage from "@/public/assets/png/home/packet.webp";
import { RewardShape } from "@/types/rewards";

import { SpecialOfferSideLink } from "./components/special-offer-side-link/SpecialOfferSideLink";
import { StarterKitSideLink } from "./components/starter-kit-side-link/StarterKitSideLink";

type Props = {
  setReward: (reward: RewardShape) => void;
};

export const SideLinks: FunctionComponent<Props> = ({ setReward }) => {
  const t = useTranslations(NS.PAGES.HOME.ROOT);

  return Array.from({ length: 4 }).map((_, i) => (
    <div
      key={`side-link-${i}`}
      className={classNames("absolute aspect-square h-[8.2%]", {
        "left-[7.6%] top-[15.2%]": i === 0,
        "left-[7.6%] top-[25.9%]": i === 1,
        "right-[7.6%] top-[15.2%]": i === 2,
        "right-[7.6%] top-[25.9%]": i === 3,
      })}
    >
      {i === 0 && <SpecialOfferSideLink setReward={setReward} />}
      {i === 1 && <StarterKitSideLink setReward={setReward} />}
      {i === 2 && (
        <SideLink
          imageClassnames="!scale-[1.15]"
          image={FriendsImage}
          href={ROUTES.FRIENDS}
          text={t(
            `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.FRIENDS}`,
          )}
          isFullSize
        />
      )}
      {i === 3 && (
        <SideLink
          imageClassnames="!scale-[1.15]"
          image={PacketImage}
          href={ROUTES.SHOP_CLOTHES}
          text={t(
            `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.CLOTHES}`,
          )}
          isFullSize
        />
      )}
    </div>
  ));
};
