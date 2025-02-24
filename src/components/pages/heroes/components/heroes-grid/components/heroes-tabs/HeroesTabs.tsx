import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import { HeroRarity } from "@/services/heroes/types";

type Props = {
  selectedTab: HeroRarity;
  onSelectTab: (tab: HeroRarity) => void;
};

export const HeroesTabs: FunctionComponent<Props> = ({
  selectedTab,
  onSelectTab,
}) => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);

  return (
    <div className="bg-black pb-0.5">
      <div className="flex w-full flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
        <div className="relative h-0.5 w-full bg-[#E88C0E]" />
      </div>
      <div className="flex flex-col">
        <div className="h-0.5 w-full bg-[#35637D]" />
        <div className="flex w-full gap-x-2 bg-gradient-to-b from-[#04A0F5] to-[#0A4CDE] p-4">
          {Object.keys(HeroRarity).map((key) => {
            const tab = HeroRarity[key as keyof typeof HeroRarity];
            const translationKey = tab.toUpperCase() as Uppercase<HeroRarity>;
            const label = t(
              `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.HERO_RARITY.ROOT}.${NS.PAGES.HEROES.LABELS.HERO_RARITY[translationKey]}`,
            );
            const elementKey = `heroes-tab-${tab}`;

            return tab === selectedTab ? (
              <div
                key={elementKey}
                className={classNames(
                  "flex h-[38px] grow basis-1/3 rounded-lg border border-black pb-[3px] text-sm font-medium",
                  {
                    "text-white": tab !== HeroRarity.RARE,
                    "text-[#742C07]": tab === HeroRarity.RARE,
                    "bg-[#155081]": tab === HeroRarity.COMMON,
                    "bg-[#883308]": tab === HeroRarity.RARE,
                    "bg-[#403BB7]": tab === HeroRarity.EPIC,
                  },
                )}
              >
                <div
                  className={classNames(
                    "flex w-full rounded-lg bg-gradient-to-b p-1 shadow-[0_-1px_0.5px_0_rgba(255,255,255,0.3)_inset]",
                    {
                      "from-[#29D6FF] to-[#2596E4]": tab === HeroRarity.COMMON,
                      "from-[#FFDE60] to-[#FABF33]": tab === HeroRarity.RARE,
                      "from-[#9099FD] to-[#777AF0]": tab === HeroRarity.EPIC,
                    },
                  )}
                >
                  <div
                    className={classNames(
                      "flex w-full items-center justify-center rounded shadow-link",
                      {
                        "bg-white/20": tab === HeroRarity.COMMON,
                        "bg-white/30": tab === HeroRarity.RARE,
                        "bg-white/15": tab === HeroRarity.EPIC,
                      },
                    )}
                  >
                    {label}
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={elementKey}
                className="flex h-9 grow basis-1/3 items-center justify-center rounded-lg bg-[#155081] text-sm font-medium text-white opacity-30"
                onClick={() => onSelectTab(tab)}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
        <div className="relative h-0.5 w-full bg-[#E88C0E]" />
      </div>
    </div>
  );
};
