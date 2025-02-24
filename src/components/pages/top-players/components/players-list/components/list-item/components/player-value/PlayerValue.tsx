import React, { FunctionComponent } from "react";

import StarSVG from "@/public/assets/svg/star.svg";
import { formatValue } from "@/utils/lib/utils";

type Props = {
  value: number;
};

export const PlayerValue: FunctionComponent<Props> = ({ value }) => {
  return (
    <div className="ml-auto flex min-w-18 items-center justify-center gap-2 rounded-[10px] bg-[#8E9EB7] px-3 py-2 shadow-[inset_0_2px_1px_0_rgba(0,0,0,0.3)]">
      <StarSVG className="size-4" />
      <span className="text-stroke-half text-xs font-black tracking-wide text-white text-shadow-sm">
        {formatValue(value)}
      </span>
    </div>
  );
};
