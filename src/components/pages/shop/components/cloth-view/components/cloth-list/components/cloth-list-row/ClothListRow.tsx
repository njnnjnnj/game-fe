import React, { FunctionComponent, useContext } from "react";

import { AxiosError } from "axios";
import { toast } from "sonner";

import { PAGE_WRAPPER_ID } from "@/components/common";
import { CLOTH_PIECE_CONTAINER_ID } from "@/components/pages/shop/constants";
import { Toast } from "@/components/ui/toast";
import { HSSharedContext } from "@/context/hs-shared-context/HSSharedContext";
import {
  updateGetAllHeroesWithClothQuery,
  useSetCloth,
} from "@/services/heroes/queries";
import {
  ClothFetcherParams,
  HeroClothPiece,
  HeroClothPieceConfig,
  HeroId,
  SelectedCloth,
} from "@/services/heroes/types";
import { invalidateProfileQuery } from "@/services/profile/queries";
import { getDefaultClothPiece } from "@/utils/heroes";
import { useQueryClient } from "@tanstack/react-query";

import { ClothCarousel } from "./components/cloth-carousel/ClothCarousel";
import { ThreeClothSet } from "./components/three-cloth-set/ThreeClothSet";

type Props = {
  title: string;
  clothPiece: HeroClothPiece;
  clothPieceConfig: HeroClothPieceConfig;
  heroId: HeroId;
  selectedHeroCloth: SelectedCloth;
  ownCloth: number[];
};

export const ClothListRow: FunctionComponent<Props> = ({
  title,
  clothPiece,
  clothPieceConfig,
  heroId,
  selectedHeroCloth,
  ownCloth,
}) => {
  const queryClient = useQueryClient();

  const defaultClothPiece = getDefaultClothPiece(heroId, clothPiece);
  const clothPieceConfigs = defaultClothPiece
    ? [defaultClothPiece, ...Object.values(clothPieceConfig)]
    : Object.values(clothPieceConfig);
  const ownClothList = defaultClothPiece ? [0, ...ownCloth] : ownCloth;
  const { currentHero, selection, selectCloth } = useContext(HSSharedContext);

  const { mutate: setCloth } = useSetCloth(
    (response: ClothFetcherParams) => {
      invalidateProfileQuery(queryClient);
      updateGetAllHeroesWithClothQuery(
        queryClient,
        response.heroId,
        response.clothPiece,
        response.clothId,
      );

      toast(<Toast type="done" text="Setting cloth has complete!" />);
      selectCloth(response.clothPiece, response.clothId);
    },
    (error: AxiosError) => {
      toast(
        <Toast
          type="destructive"
          text={`Cloth selection has failed: ${error.message}`}
        />,
      );
    },
  );

  const onCardClick = (clothPiece: HeroClothPiece, clothId: number) => {
    const pageWrapper = document.getElementById(PAGE_WRAPPER_ID);

    if (pageWrapper) {
      pageWrapper.scrollTo({ top: 0, behavior: "smooth" });
    }

    const isOwnCloth = ownClothList.includes(clothId);

    if (!isOwnCloth || currentHero?.cloth[clothPiece] === clothId) {
      selectCloth(clothPiece, clothId);
    } else if (selection.hero) {
      setCloth({
        heroId: selection.hero.characterId,
        clothPiece: clothPiece,
        clothId: clothId,
      });
    }
  };

  return (
    <div
      id={CLOTH_PIECE_CONTAINER_ID[clothPiece]}
      className="flex flex-col gap-y-0.5"
    >
      <div className="flex items-center justify-between text-white">
        <div className="text-2xl font-black text-shadow">{title}</div>
        <div className="rounded-[20px] bg-[#713110] px-3 py-1 text-sm font-extrabold text-white text-shadow">
          {clothPieceConfigs.length}
        </div>
      </div>
      {clothPieceConfigs.length > 3 ? (
        <ClothCarousel
          clothPiece={clothPiece}
          clothPieceConfigs={clothPieceConfigs}
          heroId={heroId}
          ownCloth={ownClothList}
          selectedHeroCloth={selectedHeroCloth}
          onCardClick={onCardClick}
        />
      ) : (
        <ThreeClothSet
          clothPiece={clothPiece}
          clothPieceConfigs={clothPieceConfigs}
          heroId={heroId}
          ownCloth={ownClothList}
          selectedHeroCloth={selectedHeroCloth}
          onCardClick={onCardClick}
        />
      )}
    </div>
  );
};
