import React, { FunctionComponent } from "react";

import Image from "next/image";

import ReelPaneImg from "@/public/assets/png/slot-machine/reel-pane.webp";
import { Face } from "@/services/slot-machine/types";

import { Reel } from "../reel/Reel";

type Props = {
  isSpinning?: boolean;
  isFinalDrama?: boolean;
  combination: Face[];
};

export const ReelPane: FunctionComponent<Props> = ({
  isSpinning,
  isFinalDrama,
  combination,
}) => {
  return (
    <>
      <Reel
        position="left"
        combination={combination}
        isSpinning={isSpinning}
        isFinalDrama={isFinalDrama}
      />
      <Reel
        position="center"
        combination={combination}
        isSpinning={isSpinning}
        isFinalDrama={isFinalDrama}
      />
      <Reel
        position="right"
        combination={combination}
        isSpinning={isSpinning}
        isFinalDrama={isFinalDrama}
      />
      <div className="absolute inset-x-0 top-[36.1%] mx-auto h-[40.9%] w-[97.1%]">
        <Image className="" src={ReelPaneImg} alt="" fill quality={100} />
      </div>
    </>
  );
};
