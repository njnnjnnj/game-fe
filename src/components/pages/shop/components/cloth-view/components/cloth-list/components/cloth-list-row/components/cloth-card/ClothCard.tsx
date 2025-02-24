import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType } from "@/components/common";
import { HSPieceImage } from "@/components/hs-shared";
import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
import { CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import {
  HeroClothPiece,
  HeroId,
  IHeroClothConfig,
} from "@/services/heroes/types";
import { useGetProfile } from "@/services/profile/queries";
import { formatValue } from "@/utils/lib/utils";

type Props = {
  clothPiece: HeroClothPiece;
  clothPieceConfig: IHeroClothConfig;
  heroId: HeroId;
  isOwnCloth: boolean;
  isSelectedCloth: boolean;
  onCardClick: (clothPiece: HeroClothPiece, clothId: number) => void;
};

const clothPieceClassName = {
  [HeroClothPiece.CHAIN]: "scale-[3] -translate-x-[5%] translate-y-[5%]",
  [HeroClothPiece.HAT]: "scale-150 translate-y-[48%]",
  [HeroClothPiece.GLASS]: "scale-[2] translate-y-[36%]",
  [HeroClothPiece.KIT]: "scale-125 -translate-y-[20%]",
  [HeroClothPiece.WATCH]: "scale-[4] translate-x-[48%] -translate-y-[60%]",
};

export const ClothCard: FunctionComponent<Props> = ({
  clothPieceConfig,
  clothPiece,
  heroId,
  isOwnCloth,
  isSelectedCloth,
  onCardClick,
}) => {
  const tHeroes = useTranslations(NS.PAGES.HEROES.ROOT);
  const tShop = useTranslations(NS.PAGES.SHOP.ROOT);
  const { data: profile } = useGetProfile();

  let type = CardType.ORANGE;

  if (isSelectedCloth) {
    type = CardType.DARK_BLUE;
  }

  const isSelectableCloth = isOwnCloth && !isSelectedCloth;
  const clothLevel = clothPieceConfig.level_for_open;
  const isBlocked = clothLevel > (profile?.level ?? 0);

  const isTopBadgeShown = isSelectedCloth && isOwnCloth;

  const handleOnCardClick = () => {
    if (!isBlocked) {
      onCardClick(clothPiece, clothPieceConfig.id);
    }
  };

  return (
    <Card
      type={type}
      collectButtonProps={
        !isOwnCloth || isSelectableCloth
          ? {
              color:
                isSelectableCloth || isBlocked
                  ? CollectButtonColor.YELLOW
                  : CollectButtonColor.GREEN,
              children: isSelectableCloth
                ? tHeroes(
                    `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.SELECT}`,
                  )
                : tHeroes(
                    `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.BUY}`,
                  ),
              isLocked: isBlocked,
              onClick: handleOnCardClick,
            }
          : undefined
      }
      topBadge={
        isTopBadgeShown && (
          <div className="text-stroke-1 px-3 py-1 text-xs font-extrabold text-white text-shadow-sm">
            {tHeroes(
              `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.SELECTED}`,
            )}
          </div>
        )
      }
      bottomBadge={
        !isOwnCloth ? (
          <Badge value={formatValue(clothPieceConfig.price)} />
        ) : undefined
      }
      isDisabled={isBlocked}
      onClick={handleOnCardClick}
    >
      <HSPieceImage
        className={classNames(
          "h-full w-full will-change-transform",
          clothPieceClassName[clothPiece],
        )}
        heroId={heroId}
        part={clothPiece}
        clothId={clothPieceConfig.id}
        alt={`${clothPiece}-${clothPieceConfig.id}`}
        sizes="33vw"
        fill
      />
      {isBlocked && (
        <div className="absolute inset-0 flex items-center bg-black/50 px-3 text-center text-xs font-black text-shadow">
          {tShop(
            `${NS.PAGES.SHOP.LABELS.ROOT}.${NS.PAGES.SHOP.LABELS.BLOCKED}`,
            { level: clothLevel },
          )}
        </div>
      )}
      {!isBlocked && (
        <div
          className={classNames(
            "absolute inset-x-0 bottom-2 mx-auto text-center text-xs font-bold text-white text-shadow",
            {
              "bottom-2": isOwnCloth,
              "bottom-6": !isOwnCloth,
            },
          )}
        >
          {tShop(
            `${NS.PAGES.SHOP.LABELS.ROOT}.${NS.PAGES.SHOP.LABELS.CLOTH.ROOT}.${heroId.toUpperCase()}`,
            { cloth: `${clothPiece}_${clothPieceConfig.id}` },
          )}
        </div>
      )}
    </Card>
  );
};
