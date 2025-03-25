import React, { FunctionComponent } from "react";

import Image from "next/image";

import classNames from "classnames";

import Level from "@/public/assets/png/battle-pass/level.webp";
import LockedLevel from "@/public/assets/png/battle-pass/locked-level.webp";

type Props = {
  level: number;
  className?: string;
  iconWrapperClassname?: string;
  isInactive?: boolean;
};

export const LevelBadge: FunctionComponent<Props> = ({
  className,
  iconWrapperClassname,
  level,
  isInactive = false,
}) => (
  <div className={className}>
    <div
      className={classNames(
        "relative flex size-[42px] items-center justify-center",
        iconWrapperClassname,
      )}
    >
      <Image
        src={!isInactive ? Level : LockedLevel}
        alt=""
        style={{ objectFit: "contain" }}
        sizes="42px"
        fill
      />
      <span className="text-stroke-1 z-10 text-sm font-black text-white text-shadow-sm">
        {level}
      </span>
    </div>
  </div>
);
