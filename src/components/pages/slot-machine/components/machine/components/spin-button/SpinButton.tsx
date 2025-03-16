import React, { FunctionComponent, useState } from "react";

import Image from "next/image";

import classNames from "classnames";

import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import SpinButtonBase from "@/public/assets/png/slot-machine/spin-btn-base.webp";
import SpinButtonGreen from "@/public/assets/png/slot-machine/spin-btn-green.webp";
import SpinButtonRed from "@/public/assets/png/slot-machine/spin-btn-red.webp";
import SpinButtonStub from "@/public/assets/png/slot-machine/spin-btn-stub.webp";
import { ImpactStyleEnum } from "@/types/telegram";

type Props = {
  isVip: boolean;
  onSpinClick: () => void;
};

export const SpinButton: FunctionComponent<Props> = ({
  isVip,
  onSpinClick,
}) => {
  const [isSpinButtonTouched, setIsSpinButtonTouched] = useState(false);
  const { handleImpactOccurred } = useHapticFeedback();

  const onClick = () => {
    handleImpactOccurred(ImpactStyleEnum.MEDIUM);
    onSpinClick();  
  }

  return (
    <div
      className="absolute left-[29.5%] top-[75.7%] h-[16.7%] w-[43.85%]"
      onClick={onClick}
      onTouchStart={() => {
        setIsSpinButtonTouched(true);
      }}
      onTouchEnd={() => {
        setIsSpinButtonTouched(false);
      }}
    >
      <Image src={SpinButtonBase} alt="" fill quality={100} />
      <div
        className={classNames(
          "absolute inset-0 bottom-[23.1%] m-auto transition-[top_0.3s_linear,width_0.3s_linear]",
          {
            "top-0 w-[77.7%]": !isSpinButtonTouched,
            "top-[10.5%] w-[78.9%]": isSpinButtonTouched,
          },
        )}
      >
        <Image
          src={isVip ? SpinButtonRed : SpinButtonGreen}
          alt=""
          fill
          quality={100}
        />
        <div className="text-stroke-2 absolute left-1/2 top-[20%] -translate-x-1/2 font-black leading-none text-white text-shadow [font-size:min(7.6vw,3.5vh)]">
          SPIN
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-[20.1%] mx-auto h-[48.4%] w-[85%]">
        <Image src={SpinButtonStub} alt="" fill quality={100} />
      </div>
    </div>
  );
};
