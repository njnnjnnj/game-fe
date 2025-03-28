import React, { FunctionComponent } from "react";

import { useRouter } from "next/router";

import classNames from "classnames";

import { ROUTES } from "@/constants/routes";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import EnergySvg from "@/public/assets/svg/energy.svg";
import { calculateProgress } from "@/utils/progress";

type Props = {
  energy: number;
  max_energy: number;
};

export const EnergyBar: FunctionComponent<Props> = ({ energy, max_energy }) => {
  const { handleSelectionChanged } = useHapticFeedback();
  const router = useRouter();

  const onClick = () => {
    handleSelectionChanged();
    router.push({
      pathname: ROUTES.REWARDS,
      query: { tab: 3 }
    });
  }

  return (
    <div
      className={classNames(
        "relative mb-[14px] ml-auto flex h-7 w-40 items-center rounded-r-[10px] bg-black/50 p-[3px] pl-3",
      )}
      onClick={onClick}
    >
      <EnergySvg className="absolute -left-6 z-40 size-8" />
      <div
        className={classNames(
          "text-stroke-1 relative z-40 flex h-full w-full items-end bg-transparent text-xs font-black leading-[14px] text-white text-shadow-sm",
        )}
      >
        <div
          className={classNames(
            "relative ml-auto h-full rounded-[8px] bg-home-energy-pattern transition-all duration-300 ease-in-out",
            "after:absolute after:left-0.5 after:right-0.5 after:top-0.5 after:z-30 after:h-1.5 after:rounded-t-[8px] after:bg-white after:opacity-30 after:content-['']",
          )}
          style={{ width: `${calculateProgress(energy, max_energy)}%` }}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {energy}/{max_energy}
        </span>
      </div>
    </div>
  );
};
