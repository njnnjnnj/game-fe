import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType } from "@/components/common/card/Card";
import { HeroView, HSPieceImage } from "@/components/hs-shared";
import { NS } from "@/constants/ns";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import { HeroClothPiece, HeroId, SelectedCloth } from "@/services/heroes/types";
import {
  ClothCofferReward,
  CofferKey,
  CofferReward,
  CofferValue,
  Reward,
} from "@/types/rewards";
import { formatValue } from "@/utils/lib/utils";
import { getImgByReward } from "@/utils/rewards";

type Props = {
  type: CofferKey;
  value: CofferValue;
};

const clothCardClassName = {
  [HeroClothPiece.CHAIN]:
    "[transform:translateY(5%)_translateX(-5%)_scaleY(3)_scaleX(3.3)]",
  [HeroClothPiece.HAT]: "[transform:translateY(50%)_scaleY(1.5)_scaleX(1.8)]",
  [HeroClothPiece.GLASS]: "[transform:translateY(36%)_scaleY(2)_scaleX(2.3)]",
  [HeroClothPiece.KIT]:
    "[transform:translateY(-20%)_scaleY(1.25)_scaleX(1.35)]",
  [HeroClothPiece.WATCH]:
    "[transform:translateY(-74%)_translateX(52%)_scaleY(4.5)_scaleX(4.5)]",
};

export const FinalSceneCard: FunctionComponent<Props> = ({ type, value }) => {
  const tRewards = useTranslations(NS.REWARDS_SCREEN.ROOT);
  const { data: heroes } = useGetAllAppsHeroes();

  switch (type) {
    case "coins":
    case "stars":
    case "buster":
    case "friends":
    case "offline":
    case "game_energy":
      return (
        <Card type={CardType.ORANGE} isFullSize>
          <div className="absolute top-1/2 aspect-square w-full -translate-y-1/2">
            <Image
              src={getImgByReward(type as Reward)}
              alt=""
              fill
              sizes="33vw"
              quality={100}
            />
          </div>
          <span className="text-stroke-1 absolute bottom-2 left-1/2 z-20 w-full -translate-x-1/2 text-center text-sm font-black text-shadow">
            {type === "offline"
              ? tRewards(
                  `${NS.REWARDS_SCREEN.BUCKET_SCENE.ROOT}.${NS.REWARDS_SCREEN.BUCKET_SCENE.BOOSTER_DURATION}`,
                  { hours: value as number },
                )
              : `x${formatValue(value as number)}`}
          </span>
        </Card>
      );
    case "character": {
      const heroId = (value as CofferReward).value as HeroId;

      return (
        <Card type={CardType.INDIGO} isFullSize>
          <div className="absolute inset-0 [transform:translateY(16%)_scaleY(1.5)_scaleX(1.65)]">
            {heroes && (
              <HeroView
                className="h-full w-full"
                heroId={heroId}
                heroRarity={heroes[heroId].rarity}
                heroCloth={{ kit: 0 } as SelectedCloth}
                heroGender={heroes[heroId].gender}
                source="grid"
              />
            )}
          </div>
        </Card>
      );
    }
    case "cloth": {
      const reward = value as ClothCofferReward;

      return (
        <Card type={CardType.INDIGO} isFullSize>
          <HSPieceImage
            className={classNames(
              "h-full w-full will-change-transform",
              clothCardClassName[reward.char_slot],
            )}
            heroId={reward.character}
            part={reward.char_slot}
            clothId={Number(reward.value)}
            alt=""
            sizes="33vw"
            fill
          />
        </Card>
      );
    }
  }
};
