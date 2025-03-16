import React, { FunctionComponent, useState } from "react";

import Image from "next/image";

import classNames from "classnames";

import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import BetButtonImg from "@/public/assets/png/slot-machine/bet-btn.webp";
import BetButtonBase from "@/public/assets/png/slot-machine/bet-btn-base.webp";
import { ImpactStyleEnum } from "@/types/telegram";

type Props = {
  bet: number;
  onClick: () => void;
}

export const BetButton: FunctionComponent<Props> = ({ bet, onClick }) => {
  const [isButtonTouched, setIsButtonTouched] = useState(false);
  const { handleImpactOccurred } = useHapticFeedback();

  const handleClick = () => {
    handleImpactOccurred(ImpactStyleEnum.SOFT);
    onClick();   
  }

  return (
    <div
      className="absolute right-[2.7%] top-[82%] h-[6.4%] w-[26.4%]"
      onTouchStart={() => {
        setIsButtonTouched(true);
      }}
      onTouchEnd={() => {
        setIsButtonTouched(false);
        handleClick();
      }}
    >
      <Image src={BetButtonBase} alt="" fill quality={100} />
      <div
        className={classNames(
          "absolute inset-0 bottom-[39.1%] m-auto transition-[top_0.3s_linear,width_0.3s_linear]",
          {
            "top-0 w-[68.3%]": !isButtonTouched,
            "top-[5.5%] w-[69.3%]": isButtonTouched,
          },
        )}
      >
        <Image src={BetButtonImg} alt="" fill quality={100} />
        <div className="text-stroke-2 absolute left-1/2 top-[2%] -translate-x-1/2 font-black leading-none text-white text-shadow [font-size:min(4.6vw,2.1vh)]">
          {bet}
        </div>
      </div>
    </div>
  );
};
