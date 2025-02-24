import React, { FunctionComponent } from "react";

import { IBoosters } from "@/services/rewards/types";

import { DefaultBoosters } from "./components/default-boosters/DefaultBoosters";
import { EverydayBoosters } from "./components/everyday-boosters/EverydayBoosters";
import { PremiumBoosters } from "./components/premium-boosters/PremiumBoosters";

type Props = {
  isActive: boolean;
  boosters: IBoosters;
};

export const BoosterContent: FunctionComponent<Props> = ({
  isActive,
  boosters,
}) => {
  return (
    <div
      aria-roledescription={isActive ? "slide-content" : undefined}
      className="mx-4 flex flex-col gap-6"
    >
      <PremiumBoosters isAnimated={isActive} booster={boosters.temp_energy} />
      <EverydayBoosters isAnimated={isActive} booster={boosters.full} />
      <DefaultBoosters
        isAnimated={isActive}
        capacity={boosters.capacity}
        recovery={boosters.recovery}
      />
    </div>
  );
};
