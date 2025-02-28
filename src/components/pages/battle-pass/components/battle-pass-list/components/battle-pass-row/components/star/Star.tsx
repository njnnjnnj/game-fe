import React, { FunctionComponent } from "react";

import StarIcon from "@/public/assets/svg/battle-pass/star.svg";
import StarBaseIcon from "@/public/assets/svg/battle-pass/star-base.svg";

type Props = {
  className?: string;
  onClick: () => void;
};

export const Star: FunctionComponent<Props> = ({ className, onClick }) => (
  <div className={className} onClick={onClick}>
    <div className="relative">
      <StarBaseIcon />
      <div className="absolute left-1.5 top-1.5 size-6.5 overflow-hidden rounded-full">
        <div className="animate-bp-glow-running bg-bp-star-glow-pattern absolute -top-2.5 h-12 w-full bg-[length:10px] bg-no-repeat opacity-80" />
        <StarIcon className="absolute left-px top-px" />
      </div>
    </div>
  </div>
);
