import React, { FunctionComponent, useRef } from "react";

import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import { HeroId, HeroRarity } from "@/services/heroes/types";

import { PreloadHeroView } from "../preload-hero-view/PreloadHeroView";

type Props = {
  onLoad: () => void;
};

export const PreloadRareHeroGridViews: FunctionComponent<Props> = ({
  onLoad,
}) => {
  const { data: heroes } = useGetAllAppsHeroes();
  const loadedCounterRef = useRef(0);

  if (!heroes) return;

  const rareHeroIds = Object.keys(heroes).filter((heroId) => {
    const hero = heroes[heroId as HeroId];

    return hero.rarity === HeroRarity.RARE;
  });

  const onHeroViewLoad = () => {
    loadedCounterRef.current += 1;

    if (loadedCounterRef.current === rareHeroIds.length) {
      onLoad();
    }
  };

  return rareHeroIds.map((heroId) => (
    <PreloadHeroView
      key={heroId}
      heroId={heroId as HeroId}
      source="grid"
      onLoad={onHeroViewLoad}
    />
  ));
};
