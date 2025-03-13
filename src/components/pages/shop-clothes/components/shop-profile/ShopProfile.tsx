import React, { useContext, useEffect, useState } from "react";

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
  updateGetAllHeroesWithClothQuery,
  updateGetClothHeroQuery,
  useBatchBuyCloth,
  useGetAllAppsHeroes,
  useGetClothHeroQuery,
  useSetCloth,
} from "@/services/heroes/queries";
import {
  BatchBuyClothFetcherParams,
  ClothFetcherParams,
  HeroClothPiece,
  HeroCurrency,
} from "@/services/heroes/types";
import { invalidateProfileQuery } from "@/services/profile/queries";
import { useQueryClient } from "@tanstack/react-query";

export const ShopProfile = () => {
  const queryClient = useQueryClient();
  const [buyClothConfig, setBuyClothConfig] = useState<{
    cloth?: Record<HeroClothPiece, number>;
    isBuyingCloth: boolean;
    starsCheck: boolean;
    coinsCheck: boolean;
  }>({
    cloth: undefined,
    isBuyingCloth: false,
    starsCheck: false,
    coinsCheck: false,
  });
  const { selection, currentHero } = useContext(HSSharedContext);
  const { data: allHeroes } = useGetAllAppsHeroes();
  const { data: heroOwnCloth } = useGetClothHeroQuery(
    selection.hero?.characterId,
  );

  const { mutate: selectCloth, isPending: isSettingCloth } = useSetCloth(
    (response: ClothFetcherParams) => {
      invalidateProfileQuery(queryClient);
      updateGetAllHeroesWithClothQuery(
        queryClient,
        response.heroId,
        response.clothPiece,
        response.clothId,
      );

      toast(<Toast type="done" text="Setting cloth has complete!" />);
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

  const { mutate: batchBuyCloth } = useBatchBuyCloth(
    (response: BatchBuyClothFetcherParams) => {
      invalidateProfileQuery(queryClient);
      updateGetClothHeroQuery(queryClient, response.heroId, response.cloth);

      Object.entries(response.cloth).map(([clothPiece, clothId]) => {
        selectCloth({
          heroId: response.heroId,
          clothId,
          clothPiece: clothPiece as HeroClothPiece,
        });
      });

      toast(<Toast type="done" text="Buying cloth has complete!" />);

      setBuyClothConfig({
        cloth: undefined,
        isBuyingCloth: false,
        starsCheck: false,
        coinsCheck: false,
      });
    },
    (error: AxiosError) => {
      toast(
        <Toast
          type="destructive"
          text={`Buying cloth has failed: ${error.message}`}
        />,
      );
      setBuyClothConfig({
        cloth: undefined,
        isBuyingCloth: false,
        starsCheck: false,
        coinsCheck: false,
      });
    },
  );

  useEffect(() => {
    if (
      buyClothConfig.coinsCheck &&
      buyClothConfig.starsCheck &&
      buyClothConfig.cloth &&
      selection.hero
    ) {
      batchBuyCloth({
        heroId: selection.hero?.characterId,
        cloth: buyClothConfig.cloth,
      });
    }
  }, [selection.hero, buyClothConfig, batchBuyCloth]);

  const { buy: tryBuyStarsCloth, isStarsPaymentLoading } = useSafeStarsPayment(
    () => {
      setBuyClothConfig((prev) => ({
        ...prev,
        starsCheck: true,
      }));
    },
    () => {
      setBuyClothConfig((prev) => ({
        ...prev,
        starsCheck: true,
      }));
    },
    () => {
      setBuyClothConfig({
        cloth: undefined,
        isBuyingCloth: false,
        starsCheck: false,
        coinsCheck: false,
      });
    },
  );

  const tryBuyCoinsCloth = useSafeCoinsPayment(
    () => {
      setBuyClothConfig((prev) => ({
        ...prev,
        coinsCheck: true,
      }));
    },
    () => {
      setBuyClothConfig({
        cloth: undefined,
        isBuyingCloth: false,
        starsCheck: false,
        coinsCheck: false,
      });
    },
  );

  const tryBuySelectedCloth = () => {
    if (selection.hero && allHeroes) {
      const { cloth, characterId: heroId } = selection.hero;

      let neededStars = 0;
      let neededCoins = 0;

      let clothToBuy = {} as Record<HeroClothPiece, number>;

      Object.entries(cloth).forEach(([clothPiece, clothId]) => {
        const isDefaultCloth = clothId === 0;
        const isOwnCloth =
          heroOwnCloth?.cloth[clothPiece as HeroClothPiece].includes(clothId);

        if (!isDefaultCloth && !isOwnCloth) {
          const clothConfig =
            allHeroes[heroId].cloth[clothPiece as HeroClothPiece]?.[clothId];

          if (clothConfig?.currency === HeroCurrency.STARS) {
            neededStars += clothConfig?.price ?? 0;
          } else {
            neededCoins += clothConfig?.price ?? 0;
          }

          clothToBuy = {
            ...clothToBuy,
            [clothPiece]: clothId,
          };
        }
      });

      setBuyClothConfig((prev) => ({
        ...prev,
        cloth: clothToBuy,
        isBuyingCloth: true,
        coinsCheck: neededCoins === 0,
        starsCheck: neededStars === 0,
      }));

      if (neededCoins > 0) {
        tryBuyCoinsCloth(neededCoins);
      }

      if (neededStars > 0) {
        tryBuyStarsCloth(neededStars);
      }
    }
  };

  let ctaType = HeroStatsCtaType.SELECTED;

  if (selection.hero) {
    const {
      hero: { cloth },
    } = selection;

    const isBuyable = Object.entries(cloth).some(([clothPiece, clothId]) => {
      const isDefaultCloth = clothId === 0;
      const isOwnCloth =
        heroOwnCloth?.cloth[clothPiece as HeroClothPiece].includes(clothId);

      return !isDefaultCloth && !isOwnCloth;
    });

    if (isBuyable) {
      ctaType = HeroStatsCtaType.BUY;
    }
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
            heroGender={selection.hero.gender}
            source="preview"
          />
        )
      }
      HeroStatsNode={
        selection?.hero && (
          <HeroStats
            heroId={selection.hero.characterId}
            heroRarity={selection.hero.rarity}
            selectedHeroCloth={selection.hero.cloth}
            currentHeroCloth={currentHero?.cloth}
            source="shop"
            ctaType={ctaType}
            isCtaLoading={
              isSettingCloth ||
              buyClothConfig.isBuyingCloth ||
              isStarsPaymentLoading
            }
            onCtaClick={
              ctaType !== HeroStatsCtaType.SELECTED
                ? tryBuySelectedCloth
                : undefined
            }
          />
        )
      }
    />
  );
};
