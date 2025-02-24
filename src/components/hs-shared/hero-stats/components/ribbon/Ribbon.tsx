import React, { FunctionComponent, PropsWithChildren } from "react";

import classNames from "classnames";

import { HeroRarity } from "@/services/heroes/types";

import { EpicRibbon } from "./components/epic-ribbon/EpicRibbon";
import { RareRibbon } from "./components/rare-ribbon/RareRibbon";
import { RegularRibbon } from "./components/regular-ribbon/RegularRibbon";

type Props = {
  heroRarity: HeroRarity;
};

export const Ribbon: FunctionComponent<PropsWithChildren<Props>> = ({
  heroRarity,
  children,
}) => {
  let RibbonComponent = RegularRibbon;

  if (heroRarity === HeroRarity.RARE) {
    RibbonComponent = RareRibbon;
  } else if (heroRarity === HeroRarity.EPIC) {
    RibbonComponent = EpicRibbon;
  }

  return (
    <div className="relative">
      <RibbonComponent />
      <div
        className={classNames(
          "absolute inset-0 text-center text-x font-bold leading-4",
          {
            "text-white": heroRarity !== HeroRarity.RARE,
            "text-[#742C07]": heroRarity === HeroRarity.RARE,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};
