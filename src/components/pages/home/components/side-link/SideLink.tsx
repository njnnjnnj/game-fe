import React from "react";

import Image from "next/image";

import classNames from "classnames";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import AssignmentsImage from "@/public/assets/png/home/assignments.png";

export const SideLink = () => {
  return (
    <button
      className={classNames(
        "drop-shadow-side-link outline-solid relative h-[66px] w-16 rounded-full bg-[#E88C0E] pb-0.5 outline outline-1 outline-[#422212] active:scale-[0.98]",
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#FFCE08] p-1.5 shadow-[inset_0_-1px_0_rgba(255,255,255,0.4)]">
        <div className="drop-shadow-inner-side-link flex h-full w-full items-center justify-center rounded-full bg-[#E88C0E] shadow-[inset_0_1px_0_rgba(0,0,0,0.2)]">
          <div className="absolute z-40 size-[70px]">
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
    </button>
  );
};
