import React, { FunctionComponent } from "react";

import Image from "next/image";

import classNames from "classnames";

type Props = {
  url: string;
  isLoading?: boolean;
};

export const PlayerAvatar: FunctionComponent<Props> = ({ url, isLoading }) => {
  return (
    <div
      className={classNames(
        "relative size-8 overflow-hidden rounded-lg bg-[#6A8098] p-0.5",
        { "animate-pulse": isLoading },
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-md">
        {isLoading ? null : <Image src={url} alt="avatar" fill />}
      </div>
    </div>
  );
};
