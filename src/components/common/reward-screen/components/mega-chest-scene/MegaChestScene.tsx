import React, { FunctionComponent } from "react";

import Image from "next/image";

import MegaChestOpen from "@/public/assets/png/reward-screen/mega-chest-open.webp";

import { MegaChest } from "../mega-chest/MegaChest";

type Props = {
  step: number;
};

export const MegaChestScene: FunctionComponent<Props> = ({ step }) => {
  return (
    <div className="absolute aspect-square w-[66.6%]">
      {step === 0 && <MegaChest />}
      {step === 1 && <Image src={MegaChestOpen} alt="" quality={100} fill />}
    </div>
  );
};
