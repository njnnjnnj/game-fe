import {
  AllAppsHeroesByRarity,
  GetAllAppsHeroesResponse,
  HeroClothPiece,
  HeroCurrency,
  HeroId,
  IHeroClothConfig,
} from "@/services/heroes/types";

export const groupAllAppsHeroesByRarity = (
  allAppsHeroes: GetAllAppsHeroesResponse,
) => {
  const initialGroups = {} as AllAppsHeroesByRarity;

  return (
    Object.keys(allAppsHeroes) as Array<HeroId>
  ).reduce<AllAppsHeroesByRarity>((groups, heroId) => {
    const hero = allAppsHeroes[heroId as HeroId];
    const rarity = hero.rarity;
    const group = groups[rarity];
    const heroWithId = { ...hero, characterId: heroId };

    return {
      ...groups,
      [rarity]: group ? group.concat(heroWithId) : [heroWithId],
    };
  }, initialGroups);
};

export const hasHeroDefaultCloth = (
  heroId: HeroId,
  clothPiece: HeroClothPiece,
): boolean => {
  return (
    clothPiece === HeroClothPiece.KIT ||
    (heroId === HeroId.DUROV && clothPiece === HeroClothPiece.HAT)
  );
};

const DEFAULT_CLOTH_PIECE_CONFIG: IHeroClothConfig = {
  id: 0,
  level_for_open: 1,
  price: 0,
  currency: HeroCurrency.COINS,
  earn_per_hour: 0,
  earn_per_tap: 0,
  energy: 0,
};

export const getDefaultClothPiece = (
  heroId: HeroId,
  clothPiece: HeroClothPiece,
): IHeroClothConfig | undefined =>
  hasHeroDefaultCloth(heroId, clothPiece)
    ? DEFAULT_CLOTH_PIECE_CONFIG
    : undefined;
