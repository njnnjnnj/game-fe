import { ChestType, Coffer } from "@/types/rewards";

export enum ShopItemTypeEnum {
  SPECIAL = "special",
  STARTER_PACK = "starter_pack",
  STARS = "stars",
  CHEST = "chest",
  FRIENDS = "friends",
  OFFLINE_BONUS = "offline_bonus",
  GAME_ENERGY = "game_energy",
  BOOSTER = "buster",
  BATTLE_PASS = "BattlePass",
}

type ItemDetail = {
  item_type: string;
  amount: number;
  value: string | null;
};

export type ShopItem = {
  id: number;
  type: ShopItemTypeEnum;
  price: number;
  amount: number;
  details: ItemDetail[] | null;
  static: boolean;
  value: string | ChestType | null;
};

export interface IShop {
  items: ShopItem[];
}

export interface IBoughtItem {
  status: string;
  url: string | null;
  coffer: Coffer;
}
