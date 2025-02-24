import React, { useContext } from "react";

import classNames from "classnames";

import { HSSharedContext } from "@/context/hs-shared-context/HSSharedContext";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import { HeroClothPiece } from "@/services/heroes/types";

import { InventoryCell } from "./components/inventory-cell/InventoryCell";

export const Inventory = () => {
  const {
    selection: { hero },
    currentHero,
    selectCloth,
  } = useContext(HSSharedContext);
  const { data: heroes } = useGetAllAppsHeroes();

  const heroId = hero?.characterId;
  const clothConfig = heroId ? heroes?.[heroId]?.cloth : undefined;

  const isLoading = !clothConfig || !currentHero;

  return (
    <div className="bg-black pb-0.5">
      <div className="flex w-full flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
        <div className="relative h-0.5 w-full bg-[#E88C0E]" />
      </div>
      <div className="flex flex-col">
        <div className="h-0.5 w-full bg-[#7F6F30]" />
        <div
          className={classNames(
            "flex justify-center gap-x-2 bg-shop-inventory-bg-pattern px-2 pb-2 pt-1.5",
            { "h-25": isLoading },
          )}
        >
          {clothConfig &&
            currentHero &&
            hero &&
            (Object.keys(clothConfig) as HeroClothPiece[]).map((clothPiece) =>
              clothConfig[clothPiece] ? (
                <InventoryCell
                  key={clothPiece}
                  heroId={hero.characterId}
                  heroRarity={hero.rarity}
                  clothPiece={clothPiece as HeroClothPiece}
                  clothId={
                    currentHero.cloth[clothPiece] !== hero?.cloth[clothPiece]
                      ? hero?.cloth[clothPiece]
                      : 0
                  }
                  onRemoveClick={() =>
                    selectCloth(clothPiece, currentHero.cloth[clothPiece])
                  }
                />
              ) : null,
            )}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
        <div className="relative h-0.5 w-full bg-[#E88C0E]" />
      </div>
    </div>
  );
};
