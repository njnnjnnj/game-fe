import React, { FunctionComponent } from "react";

import Image from "next/image";

import classNames from "classnames";

import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import ChevronImg from "@/public/assets/png/slot-machine/chevron.webp";
import { ImpactStyleEnum } from "@/types/telegram";

type Props = {
  isSpinning?: boolean;
  isRight?: boolean;
  isSlowSpinning?: boolean;
};

export const Chevron: FunctionComponent<Props> = ({
  isSpinning,
  isRight,
  isSlowSpinning,
}) => {
  const { handleImpactOccurred } = useHapticFeedback();

  const image = (
    <Image
      className={isRight ? "rotate-180" : undefined}
      src={ChevronImg}
      alt=""
      fill
      quality={100}
    />
  );

  return isRight ? (
    <div
      className={classNames(
        "absolute right-[5.1%] top-[54%] z-10 h-[5.7%] w-[10.35%] origin-[60%_45%]",
        {
          "animate-slot-right-chevron-spin": isSpinning,
          "[animation-duration:0.4s]": isSpinning && isSlowSpinning,
        },
      )}
      onAnimationIteration={() => {
        handleImpactOccurred(ImpactStyleEnum.LIGHT);
      }}
    >
      {image}
    </div>
  ) : (
    <div
      className={classNames(
        "absolute left-[5.1%] top-[54%] z-10 h-[5.7%] w-[10.35%] origin-[30%_45%]",
        {
          "animate-slot-left-chevron-spin": isSpinning,
          "[animation-duration:0.4s]": isSpinning && isSlowSpinning,
        },
      )}
    >
      {image}
    </div>
  );
};
