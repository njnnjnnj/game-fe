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
  { image: MegaChestImage, buttonText: NS.COMMON.BUY },
  { image: StartChestImage, buttonText: NS.COMMON.BUY },
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
