import React, { FunctionComponent } from "react";

import EnergyCoin from "@/public/assets/svg/heroes/energy-coin.svg";
import HourIncomeCoin from "@/public/assets/svg/heroes/hour-income-coin.svg";
import TapIncomeCoin from "@/public/assets/svg/heroes/tap-income-coin.svg";

export enum CoinType {
  ENERGY = "energy",
  HOUR_INCOME = "hour_income",
  TAP_INCOME = "tap_income",
}

type Props = {
  type: CoinType;
};

export const Coin: FunctionComponent<Props> = ({ type }) => {
  let CoinSvg = EnergyCoin;

  if (type === CoinType.HOUR_INCOME) {
    CoinSvg = HourIncomeCoin;
  } else if (type === CoinType.TAP_INCOME) {
    CoinSvg = TapIncomeCoin;
  }

  return (
    <div className="relative shrink-0 overflow-hidden rounded-full">
      <CoinSvg
        className="shrink-0"
        width={24}
        height={24}
        viewBox="0 0 26 26"
      />
      <div className="animate-heroes-coin-glow-running absolute left-0 top-0 h-6 w-0.5 origin-center bg-white/70 blur-[2px] will-change-transform" />
    </div>
  );
};
