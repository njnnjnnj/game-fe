import { CollectButtonColor } from "@/components/ui";
import Coins1 from "@/public/assets/png/friends/friends-1.webp";
import Coins2 from "@/public/assets/png/friends/friends-2.webp";
import Coins3 from "@/public/assets/png/friends/friends-3.webp";
import Coins4 from "@/public/assets/png/friends/friends-4.webp";
import Coins5 from "@/public/assets/png/friends/friends-5.webp";
import Coins6 from "@/public/assets/png/friends/friends-6.webp";

export const CARDS = [
  { buttonText: "Купить", number: 5, badgeValue: 1450, image: Coins1 },
  { buttonText: "Купить", number: 25, badgeValue: 1450, image: Coins2 },
  { buttonText: "Купить", number: 100, badgeValue: 1450, image: Coins3 },
  {
    buttonText: "-20%",
    buttonColor: CollectButtonColor.VIOLET,
    number: 250,
    badgeValue: 1450,
    image: Coins4,
  },
  {
    buttonText: "-20%",
    buttonColor: CollectButtonColor.VIOLET,
    number: 1000,
    badgeValue: 1450,
    image: Coins5,
  },
  {
    buttonText: "-20%",
    buttonColor: CollectButtonColor.VIOLET,
    number: 3000,
    badgeValue: 1450,
    image: Coins6,
  },
];
