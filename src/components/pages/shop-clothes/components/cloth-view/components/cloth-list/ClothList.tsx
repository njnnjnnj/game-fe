import React, { useContext } from "react";

import { useTranslations } from "next-intl";

import { NS } from "@/constants/ns";
import { HSSharedContext } from "@/context/hs-shared-context/HSSharedContext";
import {
  useGetAllAppsHeroes,
  useGetClothHeroQuery,
} from "@/services/heroes/queries";
import { HeroClothPiece } from "@/services/heroes/types";

import { ClothListRow } from "./components/cloth-list-row/ClothListRow";

export const ClothList = () => {
  const t = useTranslations(NS.PAGES.SHOP_CLOTHES.ROOT);
  const { selection } = useContext(HSSharedContext);
  const { data: heroes } = useGetAllAppsHeroes();
  const { data: heroOwnCloth } = useGetClothHeroQuery(
    selection.hero?.characterId,
  );

  if (!selection.hero || !heroes || !heroOwnCloth)
    return (
      <div className="flex grow flex-col gap-y-4 bg-[#35241C] p-4">
        <div className="h-6 w-24 animate-pulse rounded-xl bg-[#604335]" />
        <div className="flex gap-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="aspect-[3/4] basis-1/3 animate-pulse rounded-xl bg-[#604335]"
            />
          ))}
        </div>
      </div>
    );

  const { characterId: heroId, cloth } = selection.hero;
  const hero = heroes[heroId];

  return (
    <div className="flex grow flex-col gap-y-6 bg-[#35241C] px-4 pb-6 pt-4">
      {Object.keys(hero.cloth).map((clothPiece) => {
        const clothPieceConfig = hero.cloth[clothPiece as HeroClothPiece];
        const ownCloth = heroOwnCloth.cloth[clothPiece as HeroClothPiece];

        return (
          clothPieceConfig && (
            <ClothListRow
              key={clothPiece}
              title={t(
                `${NS.PAGES.SHOP_CLOTHES[clothPiece.toUpperCase() as Uppercase<HeroClothPiece>]}`,
                { form: "plural" },
              )}
              clothPiece={clothPiece as HeroClothPiece}
              clothPieceConfig={clothPieceConfig}
              heroId={heroId}
              selectedHeroCloth={cloth}
              ownCloth={ownCloth}
            />
          )
        );
      })}
    </div>
  );
};
