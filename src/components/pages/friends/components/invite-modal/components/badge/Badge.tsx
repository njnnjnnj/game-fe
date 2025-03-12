import React, { FunctionComponent } from "react";

import classNames from "classnames";

import CoinSVG from "@/public/assets/svg/coin.svg";
import StarSVG from "@/public/assets/svg/star.svg";

type Props = {
  currency?: "stars" | "coins";
  value: number | string;
  suppressPadding?: boolean;
};

export const Badge: FunctionComponent<Props> = ({
  value,
  suppressPadding,
  currency = "stars",
}) => {
  return (
    <div
      className={classNames(
        "relative z-50 grid grid-cols-[14px_1fr] items-center gap-1",
        {
          "px-4 pb-0.5 pt-1": !suppressPadding,
        },
      )}
    >
      {currency === "coins" ? (
        <CoinSVG className="size-3.5" viewBox="0 0 28 28" />
      ) : (
        <StarSVG className="size-3.5" />
      )}
      <span className="text-stroke-1 relative top-1/2 -translate-y-1/2 text-sm font-extrabold text-white text-shadow-sm">
        {value}
      </span>
    </div>
  );
};
