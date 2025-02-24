import React, { FunctionComponent } from "react";

import Image from "next/image";

import Level from "@/public/assets/png/battle-pass/level.webp";
import LockedLevel from "@/public/assets/png/battle-pass/locked-level.webp";

type Props = {
  className?: string;
  level: number;
  isInactive?: boolean;
};

export const LevelBadge: FunctionComponent<Props> = ({
  className,
  level,
  isInactive = false,
}) => (
  <div className={className}>
    <div className="relative flex size-[42px] items-center justify-center">
      <Image
        className="absolute inset-0"
        src={!isInactive ? Level : LockedLevel}
        alt=""
        style={{ objectFit: "contain" }}
        quality={100}
      />
      <span className="text-stroke-1 z-10 text-sm font-black text-white text-shadow-sm">
        {level}
      </span>
    </div>
  </div>
);
