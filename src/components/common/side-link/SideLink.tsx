import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import AssignmentsImage from "@/public/assets/png/home/assignments.webp";
import LightningSvg from "@/public/assets/png/side-link-bg.webp";

type Props = {
  isFullSize?: boolean;
};

export const SideLink: FunctionComponent<Props> = ({ isFullSize }) => {
  const { handleSelectionChanged } = useHapticFeedback();
  const t = useTranslations(NS.COMMON.ROOT);

  return (
    <div
      className={classNames(
        "outline-solid relative aspect-square rounded-full bg-[#E88C0E] pb-0.5 outline outline-1 outline-[#422212] drop-shadow-side-link active:scale-[0.98]",
        {
          "w-16": !isFullSize,
          "w-full": isFullSize,
        },
      )}
      onClick={() => handleSelectionChanged()}
    >
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#FFCE08] p-1.5 shadow-[inset_0_-1px_0_rgba(255,255,255,0.4)]">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#E88C0E] shadow-[inset_0_1px_0_rgba(0,0,0,0.2)] drop-shadow-inner-side-link">
          <div className="relative size-full scale-[1.7]">
            <Image
              className="absolute z-50 animate-spin-slow"
              src={LightningSvg}
              fill
              sizes="90px"
              alt="side-bar-link"
            />
          </div>
          <div className="absolute z-50 size-full scale-[1.3]">
            <Image src={AssignmentsImage} alt="side-bar-link" fill />
          </div>
        </div>
        <PrimaryButton
          color="yellow"
          buttonClassName="absolute !pb-0.5 z-50 !w-14 !h-[18px] !rounded-[4px] -bottom-1"
          innerClassname="!rounded-[4px] !p-0.5"
          className="text-x tracking-tighter"
        >
          {t(NS.COMMON.SIDE_LINK)}
        </PrimaryButton>
      </div>
    </div>
  );
};
