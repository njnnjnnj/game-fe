import React, { FunctionComponent } from "react";

import classNames from "classnames";

import EnergySvg from "@/public/assets/svg/energy.svg";

type Props = {
  energy: number;
  max_energy: number;
};

export const EnergyBar: FunctionComponent<Props> = ({ energy, max_energy }) => {
  return (
    <div
      className={classNames(
        "relative mb-[14px] ml-auto flex h-7 items-center rounded-r-[10px] bg-black/50 p-[3px] pl-3",
      )}
    >
      <EnergySvg className="absolute -left-6 z-40" />
      <strong
        className={classNames(
          "text-stroke-1 relative z-40 rounded-[8px] bg-[] bg-home-energy-pattern px-4 py-1 text-xs font-black leading-[14px] text-white text-shadow-sm",
          "after:absolute after:left-0.5 after:right-0.5 after:top-0.5 after:z-30 after:h-1.5 after:rounded-t-[8px] after:bg-white after:opacity-30 after:content-['']",
        )}
      >
        {energy}/{max_energy}
      </strong>
    </div>
  );
};
