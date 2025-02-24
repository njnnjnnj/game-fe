import React from "react";

import Image from "next/image";

import LevelImg from "@/public/assets/png/battle-pass/level.webp";

export const EnergyBar = () => {
  return (
    <div className="absolute inset-x-0 top-[27.1%] mx-auto h-[5.2%] w-[57.5%]">
      <div className="absolute left-0 top-0 z-10 aspect-square h-full">
        <Image src={LevelImg} fill alt="" quality={100} />
        <div className="text-stroke-1 absolute inset-0 -left-[1px] -top-[2px] flex items-center justify-center font-black text-white text-shadow [font-size:min(3.5vw,1.6vh)]">
          1
        </div>
      </div>
      <div className="absolute flex h-full w-full items-center">
        <div className="aspect-[1/2] h-full" />
        <div className="shadow-energy-bar-shadow flex h-[70%] grow flex-col">
          <div className="h-[14.2%] w-full bg-[#FEA700]" />
          <div className="relative grow">
            <div
              className="bg-energy-bar-progress-pattern absolute h-full rounded-r-lg"
              style={{ width: "50%" }}
            />
            <div className="text-stroke-1 absolute left-1/2 -translate-x-1/2 text-center font-black text-white text-shadow [font-size:min(3.5vw,1.6vh)]">
              50/50
            </div>
          </div>
          <div className="h-[14.2%] w-full bg-[#FEA700]" />
        </div>
        <div className="aspect-[1/2] h-full" />
      </div>
      <div className="absolute right-0 top-0 aspect-square h-full">
        <Image src={LevelImg} fill alt="" quality={100} />
        <div className="text-stroke-1 absolute inset-0 -left-[1px] -top-[2px] flex items-center justify-center font-black text-white text-shadow [font-size:min(3.5vw,1.6vh)]">
          2
        </div>
      </div>
    </div>
  );
};
