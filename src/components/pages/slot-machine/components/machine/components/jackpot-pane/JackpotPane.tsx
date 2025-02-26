import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { NS } from "@/constants/ns";
import JackpotPaneImg from "@/public/assets/png/slot-machine/jackpot-pane.webp";
import StarSVG from "@/public/assets/svg/star.svg";

type Props = {
  jackpot: number;
};

export const JackpotPane: FunctionComponent<Props> = ({ jackpot }) => {
  const t = useTranslations(NS.PAGES.SLOT_MACHINE.ROOT);

  return (
    <div className="absolute left-1/2 top-[27.2%] h-[10.5%] w-[74.6%] -translate-x-1/2">
      <Image src={JackpotPaneImg} alt="" fill quality={100} />
      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 font-black uppercase leading-none text-[#542E00] [font-size:min(3vw,1.4vh)]">
        {t(NS.PAGES.SLOT_MACHINE.JACKPOT)}
      </div>

      <div className="absolute left-1/2 top-[39.5%] h-[34.9%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-full items-center gap-x-2.5">
          <div className="aspect-square h-full shrink-0">
            <StarSVG
              width="100%"
              height="100%"
              viewBox="0 0 29 29"
              preserveAspectRatio="none"
            />
          </div>
          <div className="text-stroke-brown-1.5 font-black leading-none text-[#FDEC50] text-shadow-win [font-size:min(6.1vw,2.8vh)]">
            {jackpot}
          </div>
        </div>
      </div>
    </div>
  );
};
