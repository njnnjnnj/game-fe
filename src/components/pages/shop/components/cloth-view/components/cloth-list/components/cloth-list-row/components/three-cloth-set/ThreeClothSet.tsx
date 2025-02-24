import React, { FunctionComponent } from "react";

import {
  HeroClothPiece,
  HeroId,
  IHeroClothConfig,
  SelectedCloth,
} from "@/services/heroes/types";

import { ClothCard } from "../cloth-card/ClothCard";

type Props = {
  clothPiece: HeroClothPiece;
  clothPieceConfigs: IHeroClothConfig[];
  heroId: HeroId;
  ownCloth: number[];
  selectedHeroCloth: SelectedCloth;
  onCardClick: (clothPiece: HeroClothPiece, clothId: number) => void;
};

export const ThreeClothSet: FunctionComponent<Props> = ({
  clothPiece,
  clothPieceConfigs,
  heroId,
  ownCloth,
  selectedHeroCloth,
  onCardClick,
}) => {
  return (
    <div className="-mr-2 mt-2 flex">
      {clothPieceConfigs.map((cloth) => (
        <div key={cloth.id} className="shrink-0 basis-1/3 pr-2">
          <ClothCard
            clothPiece={clothPiece}
            clothPieceConfig={cloth}
            heroId={heroId}
            isSelectedCloth={selectedHeroCloth[clothPiece] === cloth.id}
            isOwnCloth={ownCloth.includes(cloth.id)}
            onCardClick={onCardClick}
          />
        </div>
      ))}
    </div>
  );
};
