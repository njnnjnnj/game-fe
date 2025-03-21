import React, { FunctionComponent } from "react";

import Image from "next/image";

import classNames from "classnames";

import ReelCenterBg1 from "@/public/assets/png/slot-machine/reel-center-bg-1.webp";
import ReelCenterBg2 from "@/public/assets/png/slot-machine/reel-center-bg-2.webp";
import ReelCenterBgShadow2 from "@/public/assets/png/slot-machine/reel-center-bg-s-2.webp";
import ReelSideBg1 from "@/public/assets/png/slot-machine/reel-side-bg-1.webp";
import ReelSideBg2 from "@/public/assets/png/slot-machine/reel-side-bg-2.webp";
import ReelSideBgShadow2 from "@/public/assets/png/slot-machine/reel-side-bg-s-2.webp";
import { Face } from "@/services/slot-machine/types";

type Props = {
  isSpinning?: boolean;
  isFinalDrama?: boolean;
  position: "left" | "center" | "right";
  combination: Face[];
};

const lastSpinClassName = {
  booster: "[background-position-y:105%] animate-slot-reel-booster-last-spin",
  chest: "[background-position-y:115%] animate-slot-reel-chest-last-spin",
  bucket: "[background-position-y:125%] animate-slot-reel-bucket-last-spin",
  bag: "[background-position-y:135%] animate-slot-reel-bag-last-spin",
  super_booster:
    "[background-position-y:145%] animate-slot-reel-super-booster-last-spin",
};

export const Reel: FunctionComponent<Props> = ({
  isFinalDrama,
  isSpinning,
  position,
  combination,
}) => {
  const [reelFace1, reelFace2, reelFace3] = combination;

  if (position === "left") {
    return (
      <>
        <div className="absolute bottom-[28.4%] left-[12.5%] top-[41.8%] w-[24%] overflow-hidden">
          <Image src={ReelSideBg1} alt="" fill sizes="33vw" quality={100} />
          <div
            className={classNames(
              "absolute bottom-0 left-[20.6%] right-[14.1%] h-[500%] bg-[url('/assets/png/slot-machine/reel-symbols-bg.webp')] bg-[length:100%_33.3%] [background-position-x:100%]",
              {
                "animate-slot-reel-spin": isSpinning && !reelFace1,
                [lastSpinClassName[reelFace1]]: !!reelFace1,
              },
            )}
          />
          <Image src={ReelSideBg2} alt="" fill sizes="33vw" quality={100} />
        </div>
        <div
          className={classNames(
            "absolute bottom-[28%] left-[12.4%] top-[41.3%] z-10 w-[24%] transition-opacity duration-200",
            {
              "opacity-0": !isFinalDrama,
              "opacity-1": isFinalDrama,
            },
          )}
        >
          <Image
            src={ReelSideBgShadow2}
            alt=""
            fill
            sizes="33vw"
            quality={100}
          />
        </div>
      </>
    );
  } else if (position === "center") {
    return (
      <>
        <div className="absolute bottom-[28.4%] left-[38.8%] top-[41.5%] w-[22.5%] overflow-hidden">
          <Image src={ReelCenterBg1} alt="" fill sizes="33vw" quality={100} />
          <div
            className={classNames(
              "absolute bottom-0 left-[14.7%] right-[14.7%] h-[500%] bg-[url('/assets/png/slot-machine/reel-symbols-bg.webp')] bg-[length:100%_33.3%] [background-position-x:100%]",
              {
                "[background-position-y:0%]": !reelFace2,
                "animate-slot-reel-spin": isSpinning && !reelFace2,
                [lastSpinClassName[reelFace2]]: !!reelFace2,
              },
            )}
          />
          <Image src={ReelCenterBg2} alt="" fill sizes="33vw" quality={100} />
        </div>
        <div
          className={classNames(
            "absolute bottom-[28%] left-[38.7%] top-[41.3%] z-10 w-[22.6%] transition-opacity duration-200",
            {
              "opacity-0": !isFinalDrama,
              "opacity-1": isFinalDrama,
            },
          )}
        >
          <Image
            src={ReelCenterBgShadow2}
            alt=""
            fill
            sizes="33vw"
            quality={100}
          />
        </div>
      </>
    );
  } else {
    const showFinalDramaImage =
      isFinalDrama && !!reelFace3 && reelFace3 === reelFace2;

    return (
      <>
        <div className="absolute bottom-[28.4%] left-[63.5%] top-[41.8%] w-[24%] overflow-hidden">
          <Image
            className="[transform:rotateY(180deg)]"
            src={ReelSideBg1}
            alt=""
            fill
            sizes="33vw"
            quality={100}
          />
          <div
            className={classNames(
              "absolute bottom-0 left-[20.6%] right-[14.1%] h-[500%] bg-[url('/assets/png/slot-machine/reel-symbols-bg.webp')] bg-[length:100%_33.3%] [background-position-x:100%]",
              {
                "[background-position-y:0%]": !reelFace3,
                "animate-slot-reel-spin": isSpinning && !reelFace3,
                "[animation-duration:2s]":
                  isSpinning && !reelFace3 && isFinalDrama,
                [lastSpinClassName[reelFace3]]: !!reelFace3,
              },
            )}
          />
          <Image
            className="[transform:rotateY(180deg)]"
            src={ReelSideBg2}
            alt=""
            fill
            sizes="33vw"
            quality={100}
          />
        </div>
        <div
          className={classNames(
            "absolute bottom-[28%] left-[63.5%] top-[41.3%] z-10 w-[24%] transition-opacity duration-200",
            {
              "opacity-0": !showFinalDramaImage,
              "opacity-1": showFinalDramaImage,
            },
          )}
        >
          <Image
            className="[transform:rotateY(180deg)]"
            src={ReelSideBgShadow2}
            alt=""
            fill
            sizes="33vw"
            quality={100}
          />
        </div>
      </>
    );
  }
};
