import React, { FunctionComponent } from "react";

import Image from "next/image";

type Props = {
  url: string;
};

export const PlayerAvatar: FunctionComponent<Props> = ({ url }) => {
  return (
    <div className="relative size-8 overflow-hidden rounded-lg bg-[#6A8098] p-0.5">
      <div className="relative h-full w-full overflow-hidden rounded-md">
        <Image src={url} alt="avatar" fill />
      </div>
    </div>
  );
};
