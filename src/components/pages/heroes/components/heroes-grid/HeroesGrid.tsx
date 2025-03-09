import React, { useContext, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { PAGE_WRAPPER_ID } from "@/components/common";
import { HSTitleBoard } from "@/components/hs-shared";
import { NS } from "@/constants/ns";
import { HSSharedContext } from "@/context/hs-shared-context/HSSharedContext";
import {
  useGetAllAppsHeroes,
  useGetAllHeroes,
} from "@/services/heroes/queries";
import { HeroId, HeroRarity } from "@/services/heroes/types";
import { groupAllAppsHeroesByRarity } from "@/utils/heroes";

import { HeroesGridCard } from "./components/heroes-grid-card/HeroesGridCard";
import { HeroesTabs } from "./components/heroes-tabs/HeroesTabs";

export const HeroesGrid = () => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);
  const [selectedTab, setSelectedTab] = useState<HeroRarity>(HeroRarity.RARE);
  const { data: heroes } = useGetAllAppsHeroes();
  const { data: ownHeroes, isPending: isOwnHeroesPending } = useGetAllHeroes();
  const { currentHero, currentClothByHeroId, selectHero } =
    useContext(HSSharedContext);

  const heroesByRarity = useMemo(
    () => (heroes ? groupAllAppsHeroesByRarity(heroes) : null),
    [heroes],
  );

  const onSelectHero = (heroId: HeroId) => {
    const pageWrapper = document.getElementById(PAGE_WRAPPER_ID);

    if (pageWrapper) {
      pageWrapper.scrollTo({ top: 0, behavior: "smooth" });
    }

    selectHero(heroId);
  };

  return (
    <div className="relative flex flex-grow flex-col">
      <HSTitleBoard
        className="absolute inset-x-0 -top-[44px] mx-auto"
        title={t(NS.PAGES.HEROES.TITLE)}
      />
      <HeroesTabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      <div
        className={classNames("flex-grow", {
          "bg-[#192632]": selectedTab === HeroRarity.COMMON,
          "bg-[#35241C]": selectedTab === HeroRarity.RARE,
          "bg-[#2F1A60]": selectedTab === HeroRarity.EPIC,
        })}
      >
        <div
          className={classNames("grid grid-cols-3 grid-rows-3 gap-2 p-4", {})}
        >
          {heroesByRarity && currentClothByHeroId && !isOwnHeroesPending
            ? heroesByRarity[selectedTab].map((hero) => {
                const isOwnHero = ownHeroes?.includes(hero.characterId);
                const isCurrentHero =
                  currentHero?.characterId === hero.characterId;
                const isSelectableHero = isOwnHero && !isCurrentHero;

                return (
                  <HeroesGridCard
                    key={hero.characterId}
                    heroId={hero.characterId}
                    heroRarity={hero.rarity}
                    heroPrice={hero.price}
                    heroCloth={currentClothByHeroId[hero.characterId]}
                    isOwnHero={isOwnHero}
                    isCurrentHero={isCurrentHero}
                    isSelectableHero={isSelectableHero}
                    onSelectHero={onSelectHero}
                  />
                );
              })
            : Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={`placeholder-${i}`}
                  className={classNames(
                    "aspect-[3/4] animate-pulse rounded-xl",
                    {
                      "bg-blue-700": selectedTab === HeroRarity.COMMON,
                      "bg-[#604335]": selectedTab === HeroRarity.RARE,
                      "bg-[#442786]": selectedTab === HeroRarity.EPIC,
                    },
                  )}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
