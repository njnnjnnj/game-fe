import React, { FunctionComponent } from "react";

import Image from "next/image";

import classNames from "classnames";

import ChevronImg from "@/public/assets/png/slot-machine/chevron.webp";

type Props = {
  isSpinning?: boolean;
  isRight?: boolean;
};

export const Chevron: FunctionComponent<Props> = ({
  isSpinning,
  isRight,
}) => {
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
        "absolute right-[5.1%] top-[54%] h-[5.7%] w-[10.35%] origin-[60%_45%] z-10",
        {
          "animate-slot-right-chevron-spin": isSpinning,
        },
      )}
    >
      {image}
    </div>
  ) : (
    <div
      className={classNames(
        "absolute left-[5.1%] top-[54%] h-[5.7%] w-[10.35%] origin-[30%_45%] z-10",
        {
          "animate-slot-left-chevron-spin": isSpinning,
        },
      )}
    >
      {image}
    </div>
  );
};
