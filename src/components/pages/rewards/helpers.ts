import CoinSVG from "@/public/assets/svg/coin.svg";
import FriendsSVG from "@/public/assets/svg/friends-coin.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { Currency } from "@/services/rewards/types";

export const getCurrencySvg = (currency?: Currency) => {
  if (currency === Currency.STARS) {
    return StarSVG;
  } else if (currency === Currency.FRIENDS) {
    return FriendsSVG;
  }

  return CoinSVG;
};
