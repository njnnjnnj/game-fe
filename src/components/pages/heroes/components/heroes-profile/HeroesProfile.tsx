import React, { useContext } from "react";

import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  HeroStats,
  HeroStatsCtaType,
  HeroView,
  HSProfile,
} from "@/components/hs-shared";
import { Toast } from "@/components/ui/toast";
import { HSSharedContext } from "@/context/hs-shared-context/HSSharedContext";
import { useSafeCoinsPayment } from "@/hooks/useSafeCoinsPayment";
import { useSafeStarsPayment } from "@/hooks/useSafeStarsPayment";
import {
  updateGetAllHeroesQuery,
  useBuyHero,
  useGetAllHeroes,
  useSetHero,
} from "@/services/heroes/queries";
import { HeroCurrency, HeroId } from "@/services/heroes/types";
import { invalidateProfileQuery } from "@/services/profile/queries";
import { useQueryClient } from "@tanstack/react-query";

export const HeroesProfile = () => {
  const queryClient = useQueryClient();

  const { selection, currentHero } = useContext(HSSharedContext);
  const { data: ownHeroes, isPending: isOwnHeroesPending } = useGetAllHeroes();
  const { mutate: setProfileHero, isPending: isSettingProfileHero } =
    useSetHero(
      () => {
        invalidateProfileQuery(queryClient);

        toast(<Toast type="done" text="Setting hero has complete!" />);
      },
      (error: AxiosError) => {
        toast(
          <Toast
            type="destructive"
            text={`Hero selection has failed: ${error.message}`}
          />,
        );
      },
    );
  const { mutate: buyHero, isPending: isBuyingHero } = useBuyHero(
    (response: HeroId) => {
      invalidateProfileQuery(queryClient);
      updateGetAllHeroesQuery(queryClient, response);

      toast(<Toast type="done" text="Buying hero has complete!" />);
    },
    (error: AxiosError) => {
      toast(
        <Toast
          type="destructive"
          text={`Buying hero has failed: ${error.message}`}
        />,
      );
    },
  );

  const { buy: tryBuyStarsHero, isStarsPaymentLoading } = useSafeStarsPayment(
    () => {
      if (selection.hero) {
        buyHero(selection.hero.characterId);
      }
    },
    () => {
      if (selection.hero) {
        buyHero(selection.hero.characterId);
      }
    },
  );

  const tryBuyCoinsHero = useSafeCoinsPayment(() => {
    if (selection.hero) {
      buyHero(selection.hero.characterId);
    }
  });

  const isCurrentHeroSelected =
    currentHero &&
    selection?.hero &&
    currentHero.characterId === selection.hero.characterId;

  const isSelectableHero =
    !isCurrentHeroSelected &&
    !!ownHeroes?.find((heroId) => heroId === selection?.hero?.characterId);

  let ctaType = HeroStatsCtaType.BUY;

  if (isCurrentHeroSelected) {
    ctaType = HeroStatsCtaType.SELECTED;
  } else if (isSelectableHero) {
    ctaType = HeroStatsCtaType.SELECT;
  }

  return (
    <HSProfile
      HeroViewNode={
        selection?.hero && (
          <HeroView
            className="left-0 top-0 h-full w-[56%]"
            heroId={selection.hero.characterId}
            heroRarity={selection.hero.rarity}
            heroCloth={selection.hero.cloth}
            source="preview"
          />
        )
      }
      HeroStatsNode={
        selection?.hero &&
        !isOwnHeroesPending && (
          <HeroStats
            heroId={selection.hero.characterId}
            heroRarity={selection.hero.rarity}
            selectedHeroCloth={selection.hero.cloth}
            ctaType={ctaType}
            isCtaLoading={
              isBuyingHero || isSettingProfileHero || isStarsPaymentLoading
            }
            isCurrentHeroSelected={isCurrentHeroSelected}
            source="heroes"
            onCtaClick={
              !isCurrentHeroSelected
                ? () => {
                    if (selection.hero) {
                      if (isSelectableHero) {
                        setProfileHero(selection.hero.characterId);
                      } else if (
                        selection.hero.currency === HeroCurrency.STARS
                      ) {
                        tryBuyStarsHero(selection.hero.price);
                      } else {
                        tryBuyCoinsHero(selection.hero.price);
                      }
                    }
                  }
                : undefined
            }
          />
        )
      }
    />
  );
};
