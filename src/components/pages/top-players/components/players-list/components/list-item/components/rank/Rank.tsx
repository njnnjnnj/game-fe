import React, { FunctionComponent } from "react";

import classNames from "classnames";

type Props = {
  rank: number | string;
};

export const Rank: FunctionComponent<Props> = ({ rank }) => {
  return (
    <div
      className={classNames(
        "text-stroke-1 flex size-8 items-center justify-center rounded-lg bg-[#6A8098] p-0.5 text-x font-extrabold tracking-wide text-white text-shadow-sm shrink-0",
        "shadow-[inset_-1px_-1px_0_0_rgba(0,0,0,0.2),inset_1px_1px_1px_0_rgba(0,0,0,0.2)]",
      )}
    >
      <div
        className={classNames("h-full w-full rounded-md p-0.5", {
          "bg-[#FDE333]": rank === 1,
          "bg-[#D6E4EF]": rank === 2,
          "bg-[#E6AE7D]": rank === 3,
          "bg-[#C9D7F1]": typeof rank === "string" || rank > 3,
        })}
      >
        <div
          className={classNames(
            "flex h-full w-full items-center justify-center rounded shadow-[inset_0_1px_1px_0_rgba(0,0,0,0.2)]",
            {
              "bg-[#FEC701]": rank === 1,
              "bg-[#C3D1DE]": rank === 2,
              "bg-[#D09C6E]": rank === 3,
              "bg-[#8E9EB7]": typeof rank === "string" || rank > 3,
            },
          )}
        >
          {rank}
        </div>
      </div>
    </div>
  );
};
