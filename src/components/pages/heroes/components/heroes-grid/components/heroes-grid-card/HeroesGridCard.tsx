import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import { Card, CardType } from "@/components/common";
import { HeroView } from "@/components/hs-shared/hero-view/HeroView";
import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
import { CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import { HeroGender, HeroId, HeroRarity, SelectedCloth } from "@/services/heroes/types";
import { formatValue } from "@/utils/lib/utils";

type Props = {
  heroId: HeroId;
  heroRarity: HeroRarity;
  heroGender: HeroGender;
  heroCloth: SelectedCloth;
  heroPrice: number;
  isOwnHero?: boolean;
  isCurrentHero?: boolean;
  isSelectableHero?: boolean;
  onSelectHero: (heroId: HeroId) => void;
};

export const HeroesGridCard: FunctionComponent<Props> = ({
  heroId,
  heroRarity,
  heroCloth,
  heroPrice,
  heroGender,
  isOwnHero,
  isCurrentHero,
  isSelectableHero,
  onSelectHero,
}) => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);

  let type = CardType.BLUE;

  if (isCurrentHero) {
    type = CardType.DARK_BLUE;
  } else if (heroRarity === HeroRarity.RARE) {
    type = CardType.ORANGE;
  } else if (heroRarity === HeroRarity.EPIC) {
    type = CardType.INDIGO;
  }

  return (
    <Card
      key={heroId}
      collectButtonProps={
        !isCurrentHero
          ? {
              color: isSelectableHero
                ? CollectButtonColor.YELLOW
                : CollectButtonColor.GREEN,
              children: isSelectableHero
                ? t(
                    `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.SELECT}`,
                  )
                : t(
                    `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.BUY}`,
                  ),
              onClick: () => onSelectHero(heroId),
            }
          : undefined
      }
      topBadge={
        isCurrentHero ? (
          <div className="text-stroke-1 px-3 py-1 text-xs font-extrabold text-white text-shadow-sm">
            {t(
              `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.SELECTED}`,
            )}
          </div>
        ) : undefined
      }
      bottomBadge={
        !isOwnHero ? <Badge value={formatValue(heroPrice)} /> : undefined
      }
      onClick={() => onSelectHero(heroId)}
      type={type}
    >
      <div className="absolute inset-0 translate-y-[26%] scale-[1.5]">
        <HeroView
          className="h-full w-full"
          heroId={heroId}
          heroRarity={heroRarity}
          heroCloth={heroCloth}
          heroGender={heroGender}
          source="grid"
        />
      </div>
      {isOwnHero && (
        <div className="absolute inset-x-0 bottom-2 mx-auto text-center text-xs font-bold text-white text-shadow">
          {t(
            `${NS.PAGES.HEROES.HERO_NAMES.ROOT}.${NS.PAGES.HEROES.HERO_NAMES[heroId.toUpperCase() as Uppercase<HeroId>]}`,
          )}
        </div>
      )}
    </Card>
  );
};
