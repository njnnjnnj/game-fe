import React from "react";

import Image from "next/image";

import classNames from "classnames";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import AssignmentsImage from "@/public/assets/png/home/assignments.png";
import LigtningSvg from "@/public/assets/png/side-link-bg.webp";

export const SideLink = () => {
  return (
    <div
      className={classNames(
        "outline-solid relative h-[66px] w-16 rounded-full bg-[#E88C0E] pb-0.5 outline outline-1 outline-[#422212] drop-shadow-side-link active:scale-[0.98]",
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#FFCE08] p-1.5 shadow-[inset_0_-1px_0_rgba(255,255,255,0.4)]">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#E88C0E] shadow-[inset_0_1px_0_rgba(0,0,0,0.2)] drop-shadow-inner-side-link">
          <Image
            className="animate-spin-slow absolute z-50 !size-[90px] !max-w-[90px]"
            src={LigtningSvg}
            width={90}
            height={90}
            alt="side-bar-link"
          />
          <div className="absolute z-50 size-[70px]">
            <Image src={AssignmentsImage} alt="side-bar-link" fill />
          </div>
        </div>
        <PrimaryButton
          color="yellow"
          buttonClassName="absolute !pb-0.5 z-50 !w-14 !h-[18px] !rounded-[4px] -bottom-1"
          innerClassname="!rounded-[4px] !p-0.5"
          className="text-x tracking-tighter"
        >
          Забрать
        </PrimaryButton>
      </div>
    </div>
  );
};
