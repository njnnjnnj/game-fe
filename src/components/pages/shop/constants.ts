import { NS } from "@/constants/ns";
import MegaChestImage from "@/public/assets/png/battle-pass/mega-chest.webp";
import StartChestImage from "@/public/assets/png/battle-pass/start-chest.webp";
import Coins1 from "@/public/assets/png/friends/buy-friends/coins-1.webp";
import Coins2 from "@/public/assets/png/friends/buy-friends/coins-2.webp";
import Coins3 from "@/public/assets/png/friends/buy-friends/coins-3.webp";
import Coins4 from "@/public/assets/png/friends/buy-friends/coins-4.webp";
import Coins5 from "@/public/assets/png/friends/buy-friends/coins-5.webp";
import Coins6 from "@/public/assets/png/friends/buy-friends/coins-6.webp";
import BuyStarsOneImage from "@/public/assets/png/shop/stars/1.webp";
import BuyStarsTwoImage from "@/public/assets/png/shop/stars/2.webp";
import BuyStarsThreeImage from "@/public/assets/png/shop/stars/3.webp";
import BuyStarsFourImage from "@/public/assets/png/shop/stars/4.webp";
import BuyStarsFiveImage from "@/public/assets/png/shop/stars/5.webp";
import BuyStarsSixImage from "@/public/assets/png/shop/stars/6.webp";
import { ShopItemTypeEnum } from "@/services/shop/types";

export enum ModalColorEnum {
  BLUE = "blue",
  PURPLE = "purple",
  LIGHTBLUE = "lightblue",
}

export const FRIENDS_CARDS = [
  {
    image: Coins1,
    buttonText: NS.COMMON.BUY,
  },
  {
    image: Coins2,
    buttonText: NS.COMMON.BUY,
  },
  {
    image: Coins3,
    buttonText: NS.COMMON.BUY,
  },
  {
    image: Coins4,
    buttonText: NS.COMMON.BUY,
  },
  {
    image: Coins5,
    buttonText: NS.COMMON.BUY,
  },
  {
    image: Coins6,
    buttonText: NS.COMMON.BUY,
  },
];

export const CHESTS_CARDS = [
  { image: StartChestImage, buttonText: NS.COMMON.BUY },
  { image: StartChestImage, buttonText: NS.COMMON.BUY },
  { image: MegaChestImage, buttonText: NS.COMMON.BUY },
];

export const STARS_CARDS = [
  { image: BuyStarsOneImage, buttonText: NS.COMMON.BUY },
  { image: BuyStarsTwoImage, buttonText: NS.COMMON.BUY },
  { image: BuyStarsThreeImage, buttonText: NS.COMMON.BUY },
  { image: BuyStarsFourImage, buttonText: NS.COMMON.BUY },
  { image: BuyStarsFiveImage, buttonText: NS.COMMON.BUY },
  { image: BuyStarsSixImage, buttonText: NS.COMMON.BUY },
];

export const AUTO_COLLECT_CARDS = [
  { image: BuyStarsOneImage, buttonText: NS.COMMON.BUY },
  { image: BuyStarsTwoImage, buttonText: NS.COMMON.BUY },
  { image: BuyStarsThreeImage, buttonText: NS.COMMON.BUY },
];

export const MODAL_IMAGES_BY_SHOP_ITEM = [
  {
    id: 1,
    image: StartChestImage,
    isSquare: true,
    color: ModalColorEnum.PURPLE,
  },
  {
    id: 2,
    image: MegaChestImage,
    isSquare: true,
    color: ModalColorEnum.PURPLE,
  },
  {
    id: 3,
    image: BuyStarsOneImage,
    isSquare: false,
    color: ModalColorEnum.LIGHTBLUE,
  },
  {
    id: 4,
    image: BuyStarsTwoImage,
    isSquare: false,
    color: ModalColorEnum.LIGHTBLUE,
  },
  {
    id: 5,
    image: BuyStarsThreeImage,
    isSquare: false,
    color: ModalColorEnum.LIGHTBLUE,
  },
  {
    id: 6,
    image: BuyStarsFourImage,
    isSquare: false,
    color: ModalColorEnum.LIGHTBLUE,
  },
  {
    id: 7,
    image: BuyStarsFiveImage,
    isSquare: false,
    color: ModalColorEnum.LIGHTBLUE,
  },
  {
    id: 8,
    image: BuyStarsSixImage,
    isSquare: false,
    color: ModalColorEnum.LIGHTBLUE,
  },
  {
    id: 9,
    image: StartChestImage,
    isSquare: true,
    color: ModalColorEnum.PURPLE,
  },
  {
    id: 10,
    image: StartChestImage,
    isSquare: true,
    color: ModalColorEnum.PURPLE,
  },
  {
    id: 11,
    image: MegaChestImage,
    isSquare: true,
    color: ModalColorEnum.PURPLE,
  },
  {
    id: 12,
    image: Coins1,
    isSquare: false,
    color: ModalColorEnum.BLUE,
  },
  {
    id: 13,
    image: Coins2,
    isSquare: false,
    color: ModalColorEnum.BLUE,
  },
  {
    id: 14,
    image: Coins3,
    isSquare: false,
    color: ModalColorEnum.BLUE,
  },
  {
    id: 15,
    image: Coins4,
    isSquare: false,
    color: ModalColorEnum.BLUE,
  },
  {
    id: 16,
    image: Coins5,
    isSquare: false,
    color: ModalColorEnum.BLUE,
  },
  {
    id: 17,
    image: Coins6,
    isSquare: false,
    color: ModalColorEnum.BLUE,
  },
  {
    id: 27,
    image: BuyStarsOneImage,
    isSquare: false,
    color: ModalColorEnum.BLUE,
  },
  {
    id: 28,
    image: BuyStarsTwoImage,
    isSquare: false,
    color: ModalColorEnum.BLUE,
  },
  {
    id: 29,
    image: BuyStarsThreeImage,
    isSquare: false,
    color: ModalColorEnum.BLUE,
  },
];

export const TID_BY_SHOP_ITEM_TYPE = {
  [ShopItemTypeEnum.CHEST]: NS.PAGES.SHOP.SHOP_TYPE.CHESTS,
  [ShopItemTypeEnum.STARS]: NS.PAGES.SHOP.SHOP_TYPE.STARS,
  [ShopItemTypeEnum.FRIENDS]: NS.PAGES.SHOP.SHOP_TYPE.FRIENDS,
  [ShopItemTypeEnum.BOOSTER]: NS.PAGES.SHOP.SHOP_TYPE.AUTO_COLLECT,
  [ShopItemTypeEnum.BATTLE_PASS]: NS.PAGES.SHOP.SHOP_TYPE.AUTO_COLLECT,
  [ShopItemTypeEnum.OFFLINE_BONUS]: NS.PAGES.SHOP.SHOP_TYPE.CHESTS,
  [ShopItemTypeEnum.GAME_ENERGY]: NS.PAGES.SHOP.SHOP_TYPE.CHESTS,
  [ShopItemTypeEnum.STARTER_PACK]: NS.PAGES.SHOP.SHOP_TYPE.STARTER_SET,
  [ShopItemTypeEnum.SPECIAL]: NS.PAGES.SHOP.SHOP_TYPE.SPECIAL_OFFER,
};

export const TID_BY_STARS_TYPE = {
  3: NS.PAGES.SHOP.STARS_TYPE.BAG,
  4: NS.PAGES.SHOP.STARS_TYPE.BUCKET,
  5: NS.PAGES.SHOP.STARS_TYPE.BOX,
  6: NS.PAGES.SHOP.STARS_TYPE.CHEST,
  7: NS.PAGES.SHOP.STARS_TYPE.CARRIAGE,
  8: NS.PAGES.SHOP.STARS_TYPE.CONTAINER,
};
