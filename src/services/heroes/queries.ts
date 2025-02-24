import { AxiosError } from "axios";

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import {
  batchBuyCloth,
  buyCloth,
  buyHero,
  getAllAppsHeroes,
  getAllHeroes,
  getAllHeroesWithCloth,
  getClothHero,
  getHero,
  setCloth,
  setHero,
} from "./fetcher";
import {
  BatchBuyClothFetcherParams,
  ClothFetcherParams,
  GetAllAppsHeroesResponse,
  GetAllHeroesWithClothResponse,
  HeroClothPiece,
  HeroId,
  IHeroInfo,
  IOwnHeroCloth,
} from "./types";

export enum QueryKeys {
  GET_HERO = "GET_HERO",
  GET_ALL_HEROES = "GET_ALL_HEROES",
  GET_ALL_APPS_HEROES = "GET_ALL_APPS_HEROES",
  SET_HERO = "SET_HERO",
  BUY_HERO = "BUY_HERO",
  GET_CLOTH_HERO = "GET_CLOTH_HERO",
  GET_ALL_HEROES_WITH_CLOTH = "GET_ALL_HEROES_WITH_CLOTH",
  SET_CLOTH = "SET_CLOTH",
  BUY_CLOTH = "BUY_CLOTH",
  BATCH_BUY_CLOTH = "BATCH_BUY_CLOTH",
}

export const useGetHero = (heroId?: HeroId) =>
  useQuery<IHeroInfo, AxiosError>({
    queryKey: [QueryKeys.GET_HERO, heroId],
    queryFn: () => getHero(heroId),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useSetHero = (
  onSuccess?: () => void,
  onError?: (error: AxiosError) => void,
) =>
  useMutation({
    mutationKey: [QueryKeys.SET_HERO],
    mutationFn: setHero,
    onSuccess,
    onError,
  });

export const useGetAllHeroes = (enabled?: boolean) =>
  useQuery<HeroId[], AxiosError>({
    queryKey: [QueryKeys.GET_ALL_HEROES],
    queryFn: () => getAllHeroes(),
    retry: false,
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const useGetAllAppsHeroes = () =>
  useQuery<GetAllAppsHeroesResponse, AxiosError>({
    queryKey: [QueryKeys.GET_ALL_APPS_HEROES],
    queryFn: () => getAllAppsHeroes(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useBuyHero = (
  onSuccess?: (heroId: HeroId) => void,
  onError?: (error: AxiosError) => void,
) =>
  useMutation<HeroId, AxiosError, HeroId>({
    mutationKey: [QueryKeys.BUY_HERO],
    mutationFn: buyHero,
    onSuccess,
    onError,
  });

export const updateGetAllHeroesQuery = (
  queryClient: QueryClient,
  heroId: HeroId,
) => {
  queryClient.setQueryData(
    [QueryKeys.GET_ALL_HEROES],
    (oldHeroes: HeroId[]) => [...oldHeroes, heroId],
  );
};

/* Heroes Cloth Shop */
export const useGetClothHeroQuery = (heroId?: HeroId) =>
  useQuery<IOwnHeroCloth, AxiosError>({
    queryKey: [QueryKeys.GET_CLOTH_HERO, heroId],
    queryFn: () => getClothHero(heroId!), // it's enabled only when heroId is defined
    retry: false,
    enabled: !!heroId,
    staleTime: 1000 * 60 * 5,
  });

export const useGetAllHeroesWithCloth = () =>
  useQuery({
    queryKey: [QueryKeys.GET_ALL_HEROES_WITH_CLOTH],
    queryFn: () => getAllHeroesWithCloth(),
    retry: false,
    staleTime: Infinity, // Extremely heavy operation on the server. Request it as rare as possible
  });

export const useSetCloth = (
  onSuccess?: (response: ClothFetcherParams) => void,
  onError?: (error: AxiosError) => void,
) =>
  useMutation({
    mutationKey: [QueryKeys.SET_CLOTH],
    mutationFn: setCloth,
    onSuccess,
    onError,
  });

export const useBuyCloth = (
  onSuccess?: (response: ClothFetcherParams) => void,
  onError?: (error: AxiosError) => void,
) =>
  useMutation({
    mutationKey: [QueryKeys.BUY_CLOTH],
    mutationFn: buyCloth,
    onSuccess,
    onError,
  });

export const useBatchBuyCloth = (
  onSuccess?: (response: BatchBuyClothFetcherParams) => void,
  onError?: (error: AxiosError) => void,
) =>
  useMutation({
    mutationKey: [QueryKeys.BATCH_BUY_CLOTH],
    mutationFn: batchBuyCloth,
    onSuccess,
    onError,
  });

export const updateGetAllHeroesWithClothQuery = (
  queryClient: QueryClient,
  heroId: HeroId,
  heroClothPiece: HeroClothPiece,
  clothId: number,
) => {
  queryClient.setQueryData(
    [QueryKeys.GET_ALL_HEROES_WITH_CLOTH],
    (oldHeroesWithCloth: GetAllHeroesWithClothResponse) => ({
      characters: oldHeroesWithCloth.characters.map((heroWithCloth) => {
        if (heroWithCloth.characterId === heroId) {
          return {
            ...heroWithCloth,
            [heroClothPiece]: clothId,
          };
        }

        return heroWithCloth;
      }),
    }),
  );
};

export const updateGetClothHeroQuery = (
  queryClient: QueryClient,
  heroId: HeroId,
  cloth: Record<HeroClothPiece, number>,
) => {
  queryClient.setQueryData(
    [QueryKeys.GET_CLOTH_HERO, heroId],
    (oldOwnHeroCloth: IOwnHeroCloth) => {
      let nextOwnHeroCloth = oldOwnHeroCloth;

      Object.entries(cloth).forEach(([clothPiece, clothId]) => {
        nextOwnHeroCloth = {
          ...nextOwnHeroCloth,
          cloth: {
            ...nextOwnHeroCloth.cloth,
            [clothPiece]: [
              ...nextOwnHeroCloth.cloth[clothPiece as HeroClothPiece],
              clothId,
            ],
          },
        };
      });

      return nextOwnHeroCloth;
    },
  );
};
