import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import {
  BatchBuyClothFetcherParams,
  ClothFetcherParams,
  GetAllAppsHeroesResponse,
  GetAllHeroesResponse,
  GetAllHeroesWithClothResponse,
  HeroClothPiece,
  HeroId,
  IHeroInfo,
  IOwnHeroCloth,
} from "./types";

export const getHero = async (heroId?: HeroId): Promise<IHeroInfo> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_HERO, {
    params: { idCharacter: heroId },
  });

  return data;
};

export const setHero = async (heroId?: HeroId): Promise<void> => {
  await apiClient.post(API_ENDPOINTS.POST.SET_HERO, {
    idCharacter: heroId,
  });
};

export const getAllHeroes = async (): Promise<HeroId[]> => {
  const { data } = await apiClient.get<GetAllHeroesResponse>(
    API_ENDPOINTS.GET.GET_ALL_HEROES,
  );

  return data.characters;
};

export const getAllAppsHeroes = async (): Promise<GetAllAppsHeroesResponse> => {
  const { data } = await apiClient.get<GetAllAppsHeroesResponse>(
    API_ENDPOINTS.GET.GET_ALL_APPS_HEROES,
  );

  return data;
};

export const buyHero = async (heroId: HeroId): Promise<HeroId> => {
  await apiClient.post(API_ENDPOINTS.POST.BUY_HERO, {
    idCharacter: heroId,
  });

  return heroId;
};

/* Heroes Cloth Shop */
export const getClothHero = async (heroId: HeroId): Promise<IOwnHeroCloth> => {
  const { data } = await apiClient.get<IOwnHeroCloth>(
    API_ENDPOINTS.GET.GET_CLOTH_HERO,
    {
      params: { idCharacter: heroId },
    },
  );

  return data;
};

export const getAllHeroesWithCloth =
  async (): Promise<GetAllHeroesWithClothResponse> => {
    const { data } = await apiClient.get<GetAllHeroesWithClothResponse>(
      API_ENDPOINTS.GET.GET_ALL_HEROES_WITH_CLOTH,
    );

    return data;
  };

export const setCloth = async ({
  heroId,
  clothId,
  clothPiece,
}: ClothFetcherParams): Promise<ClothFetcherParams> => {
  await apiClient.post(API_ENDPOINTS.POST.SET_CLOTH, {
    idCloth: clothId,
    slotCloth: clothPiece,
    idCharacter: heroId,
  });

  return {
    heroId,
    clothId,
    clothPiece,
  };
};

export const buyCloth = async ({
  heroId,
  clothId,
  clothPiece,
}: ClothFetcherParams): Promise<ClothFetcherParams> => {
  await apiClient.post(API_ENDPOINTS.POST.BUY_CLOTH, {
    idCloth: clothId,
    slotCloth: clothPiece,
    idCharacter: heroId,
  });

  return {
    heroId,
    clothId,
    clothPiece,
  };
};

export const batchBuyCloth = async ({
  heroId,
  cloth,
}: BatchBuyClothFetcherParams) =>
  new Promise<BatchBuyClothFetcherParams>(async (resolve, reject) => {
    const responses = await Promise.allSettled(
      Object.entries(cloth).map(([clothPiece, clothId]) =>
        buyCloth({
          heroId,
          clothPiece: clothPiece as HeroClothPiece,
          clothId,
        }),
      ),
    );

    let rejected = true;

    const resultCloth = Object.fromEntries(
      responses
        .map((response) => {
          if (response.status === "fulfilled") {
            rejected = false;

            return [response.value.clothPiece, response.value.clothId];
          }
        })
        .filter((entry) => !!entry),
    ) as Record<HeroClothPiece, number>;

    if (!rejected) {
      resolve({ heroId, cloth: resultCloth });
    } else {
      reject((responses[0] as PromiseRejectedResult).reason);
    }
  });
