import React, { FunctionComponent } from "react";

type Props = {
  name: string;
  league: string;
};

export const PlayerInfo: FunctionComponent<Props> = ({ name, league }) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="text-stroke-1 font-extrabold capitalize text-white text-shadow-sm">
        {name}
      </span>
      <span className="text-xs font-medium text-[#6A8098]">{league}</span>
    </div>
  );
};
