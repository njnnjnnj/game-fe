import React, { FunctionComponent } from "react";

import classNames from "classnames";

type Props = {
  name: string;
  league: string;
  isLoading?: boolean;
};

export const PlayerInfo: FunctionComponent<Props> = ({
  name,
  league,
  isLoading,
}) => {
  return (
    <div
      className={classNames("flex flex-col items-start justify-center", {
        "gap-1": isLoading,
      })}
    >
      {isLoading ? (
        <>
          <div className="h-4 w-26 animate-pulse rounded-full bg-white" />
          <div className="h-3 w-20 animate-pulse rounded-full bg-white" />
        </>
      ) : (
        <>
          <span className="text-stroke-1 font-extrabold capitalize text-white text-shadow-sm">
            {name}
          </span>
          <span className="text-xs font-medium text-[#6A8098]">{league}</span>
        </>
      )}
    </div>
  );
};
