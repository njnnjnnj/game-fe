import React, { FunctionComponent, useEffect, useState } from "react";

import Image from "next/image";

import ReelPaneImg from "@/public/assets/png/slot-machine/reel-pane.webp";
import { Face } from "@/services/slot-machine/types";

import { Reel } from "../reel/Reel";

type Props = {
  isSpinning?: boolean;
  combination: Face[];
};

export const ReelPane: FunctionComponent<Props> = ({
  isSpinning,
  combination,
}) => {
  const [isFinalDrama, setIsFinalDrama] = useState(false);

  useEffect(() => {
    if (combination.length < 2) {
      setIsFinalDrama(false);
      return; 
    };

    const [reelFace1, reelFace2, reelFace3] = combination;

    if (reelFace1 && reelFace2 && !reelFace3 && reelFace1 === reelFace2) {
      setIsFinalDrama(true);
    }
  }, [combination]);

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
