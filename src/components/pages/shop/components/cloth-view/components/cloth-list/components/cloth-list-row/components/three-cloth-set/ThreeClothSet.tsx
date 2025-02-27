import React, { FunctionComponent } from "react";

import {
  HeroClothPiece,
  HeroId,
  IHeroClothConfig,
  SelectedCloth,
} from "@/services/heroes/types";
import { useGetProfile } from "@/services/profile/queries";

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
  const { data: profile } = useGetProfile();
  const configs = [...clothPieceConfigs];

  const isBlocked = (config: IHeroClothConfig) =>
    config.level_for_open > (profile?.level ?? 0);

  configs.sort(
    (configA: IHeroClothConfig, configB: IHeroClothConfig) =>
      Number(isBlocked(configA)) - Number(isBlocked(configB)),
  );

  return (
    <div className="-mr-2 mt-2 flex">
      {configs.map((cloth) => {
        return (
          <div key={cloth.id} className="shrink-0 basis-1/3 pr-2">
            <ClothCard
              clothPiece={clothPiece}
              clothPieceConfig={cloth}
              heroId={heroId}
              isSelectedCloth={selectedHeroCloth[clothPiece] === cloth.id}
              isBlocked={isBlocked(cloth)}
              isOwnCloth={ownCloth.includes(cloth.id)}
              onCardClick={onCardClick}
            />
          </div>
        );
      })}
    </div>
  );
};
