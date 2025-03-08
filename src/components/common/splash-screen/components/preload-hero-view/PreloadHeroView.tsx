import React, { ComponentProps, FunctionComponent } from "react";

import { HeroView } from "@/components/hs-shared";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import { HeroClothPiece, SelectedCloth } from "@/services/heroes/types";
import { HeroId } from "@/services/heroes/types";

type Props = {
  heroId: HeroId;
  heroCloth?: SelectedCloth;
  source: ComponentProps<typeof HeroView>["source"];
  onLoad: () => void;
};

const DEFAULT_CLOTH = {
  [HeroClothPiece.CHAIN]: 0,
  [HeroClothPiece.GLASS]: 0,
  [HeroClothPiece.KIT]: 0,
  [HeroClothPiece.HAT]: 0,
  [HeroClothPiece.WATCH]: 0,
};

export const PreloadHeroView: FunctionComponent<Props> = ({
  heroId,
  heroCloth = DEFAULT_CLOTH,
  source,
  onLoad,
}) => {
  const { data: heroes } = useGetAllAppsHeroes();

  if (!heroes) return;

  return (
    <HeroView
      heroId={heroId}
      heroRarity={heroes[heroId].rarity}
      heroCloth={heroCloth}
      source={source}
      onLoad={onLoad}
      onError={onLoad}
    />
  );
};
