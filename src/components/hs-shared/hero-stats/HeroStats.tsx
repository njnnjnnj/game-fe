import React, { ComponentProps, FunctionComponent, useMemo } from "react";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import {
  HeroClothPiece,
  HeroCurrency,
  HeroId,
  HeroRarity,
} from "@/services/heroes/types";
import { formatValue } from "@/utils/lib/utils";

import { Coin, CoinType } from "./components/coin/Coin";
import { Indicator } from "./components/indicator/Indicator";
import { Ribbon } from "./components/ribbon/Ribbon";
import {
  MAX_ENERGY,
  MAX_INCOME_PER_HOUR,
  MAX_INCOME_PER_TAP,
} from "./constants";

export enum HeroStatsCtaType {
  BUY = "BUY",
  GET = "GET",
  SELECT = "SELECT",
  SELECTED = "SELECTED",
}

type Props = {
  ctaType: HeroStatsCtaType;
  heroId: HeroId;
  heroRarity: HeroRarity;
  selectedHeroCloth: Record<HeroClothPiece, number>;
  currentHeroCloth?: Record<HeroClothPiece, number>;
  source: "heroes" | "shop";
  isCtaLoading?: boolean;
  isCurrentHeroSelected?: boolean;
  onCtaClick?: () => void;
};

const calculateProgress = (current: number, max: number) =>
  (current / max) * 100;

const calculateStat = (base: number, rate: number) => base * rate;

export const HeroStats: FunctionComponent<Props> = ({
  ctaType,
  heroId,
  heroRarity,
  selectedHeroCloth,
  currentHeroCloth,
  source,
  isCtaLoading,
  isCurrentHeroSelected,
  onCtaClick,
}) => {
  const tHeroes = useTranslations(NS.PAGES.HEROES.ROOT);
  const tShop = useTranslations(NS.PAGES.SHOP.ROOT);
  const { data: heroes } = useGetAllAppsHeroes();

  const renderCta = () => {
    let color: ComponentProps<typeof PrimaryButton>["color"];

    switch (ctaType) {
      case HeroStatsCtaType.BUY: {
        color = "secondary";
        break;
      }
      case HeroStatsCtaType.GET: {
        color = "blue";
        break;
      }
      case HeroStatsCtaType.SELECT: {
        color = "yellow";
        break;
      }
      case HeroStatsCtaType.SELECTED: {
        color = "primary";
        break;
      }
    }

    return (
      <PrimaryButton
        size="small"
        color={color}
        onClick={onCtaClick}
        isLoading={isCtaLoading}
        disabled={ctaType === HeroStatsCtaType.SELECTED}
      >
        {tHeroes(
          `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS[ctaType]}`,
        )}
      </PrimaryButton>
    );
  };

  const nameTranslationKey = heroId.toUpperCase() as Uppercase<HeroId>;
  const ribbonTranslationKey =
    heroRarity.toUpperCase() as Uppercase<HeroRarity>;
  const isShopPage = source === "shop";

  const { energy, earnPerHour, earnPerTap, coins, stars } = useMemo(() => {
    if (!heroes)
      return {
        energy: 0,
        earnPerHour: 0,
        earnPerTap: 0,
        coins: 0,
        stars: 0,
      };

    const heroConfig = heroes[heroId];
    let calculatedEnergy = heroConfig.energy;
    let calculatedEarnPerHour = heroConfig.earn_per_hour;
    let calculatedEarnPerTap = heroConfig.earn_per_tap;
    let coins = 0;
    let stars = 0;

    Object.entries(selectedHeroCloth).map(([clothPiece, clothId]) => {
      const clothConfig =
        heroConfig.cloth[clothPiece as HeroClothPiece]?.[clothId];

      calculatedEnergy += calculateStat(
        heroConfig.energy,
        clothConfig?.energy ?? 0,
      );
      calculatedEarnPerHour += calculateStat(
        heroConfig.earn_per_hour,
        clothConfig?.earn_per_hour ?? 0,
      );
      calculatedEarnPerTap += calculateStat(
        heroConfig.earn_per_tap,
        clothConfig?.earn_per_tap ?? 0,
      );

      if (currentHeroCloth?.[clothPiece as HeroClothPiece] !== clothId) {
        if (clothConfig?.currency === HeroCurrency.STARS) {
          stars += clothConfig.price;
        } else {
          coins += clothConfig?.price ?? 0;
        }
      }
    });

    return {
      energy: calculatedEnergy,
      earnPerHour: calculatedEarnPerHour,
      earnPerTap: calculatedEarnPerTap,
      coins,
      stars,
    };
  }, [heroes, selectedHeroCloth, heroId, currentHeroCloth]);

  return (
    <div className="absolute inset-y-0 right-4 my-auto max-h-fit w-1/2 rounded-2xl border border-[#EFC609]">
      <div className="flex flex-col gap-y-4 rounded-2xl bg-[rgba(0,0,0,0.6)] p-4 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-y-2">
          <div className="absolute inset-x-2 bottom-[72%] top-1.5 rounded-t-2xl bg-white opacity-5" />
          <div className="text-center text-xl font-black leading-none tracking-wide text-white text-shadow">
            {isShopPage
              ? tShop(`${NS.PAGES.SHOP.KIT}`, { form: "full_singular" })
              : tHeroes(
                  `${NS.PAGES.HEROES.HERO_NAMES.ROOT}.${NS.PAGES.HEROES.HERO_NAMES[nameTranslationKey]}`,
                )}
          </div>
          {!isShopPage && (
            <Ribbon heroRarity={heroRarity}>
              {tHeroes(
                `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.HERO_RARITY.ROOT}.${NS.PAGES.HEROES.LABELS.HERO_RARITY[ribbonTranslationKey]}`,
              )}
            </Ribbon>
          )}
          <div className="flex w-full flex-col gap-y-3">
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.ENERGY} />
              <Indicator
                label={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.ENERGY}`,
                )}
                caption={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ENERGY}`,
                  { num: formatValue(energy) },
                )}
                progress={calculateProgress(energy, MAX_ENERGY)}
              />
            </div>
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.HOUR_INCOME} />
              <Indicator
                label={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.INCOME_PER_HOUR}`,
                )}
                caption={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.INCOME_PER_HOUR}`,
                  { num: formatValue(earnPerHour) },
                )}
                progress={calculateProgress(earnPerHour, MAX_INCOME_PER_HOUR)}
              />
            </div>
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.TAP_INCOME} />
              <Indicator
                label={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.INCOME_PER_TAP}`,
                )}
                caption={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.INCOME_PER_TAP}`,
                  { num: formatValue(earnPerTap) },
                )}
                progress={calculateProgress(earnPerTap, MAX_INCOME_PER_TAP)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          {isShopPage && (
            <div className="flex flex-col gap-y-2">
              <div className="text-stroke-1 text-center text-base font-extrabold text-white text-shadow">
                {tShop(
                  `${NS.PAGES.SHOP.LABELS.ROOT}.${NS.PAGES.SHOP.LABELS.TOTAL}`,
                )}
              </div>
              <div className="flex justify-center gap-x-2">
                <Badge value={formatValue(coins)} suppressPadding />
                <Badge value={formatValue(stars)} suppressPadding />
              </div>
            </div>
          )}
          {renderCta()}
          {!isShopPage &&
            (ctaType === HeroStatsCtaType.SELECT ||
              ctaType === HeroStatsCtaType.SELECTED) && (
              <Link
                href={{
                  pathname: ROUTES.SHOP,
                  query: isCurrentHeroSelected ? undefined : { heroId },
                }}
                className="text-center text-sm font-extrabold text-white"
              >
                {tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.GO_TO_SHOP}`,
                )}
              </Link>
            )}
        </div>
      </div>
    </div>
  );
};
