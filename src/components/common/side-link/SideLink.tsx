import React, { FunctionComponent } from "react";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import AssignmentsImage from "@/public/assets/png/home/assignments.webp";
import LightningSvg from "@/public/assets/png/side-link-bg.webp";

type Props = {
  href?: string;
  image?: StaticImageData;
  text?: string;
  isFullSize?: boolean;
  imageClassnames?: string;
  onClick?: () => void;
};

export const SideLink: FunctionComponent<Props> = ({
  href,
  image,
  text,
  isFullSize,
  imageClassnames,
  onClick,
}) => {
  const { handleSelectionChanged } = useHapticFeedback();
  const t = useTranslations(NS.COMMON.ROOT);

  const handleClick = () => {
    handleSelectionChanged();
    if (onClick) onClick();
  };

  return (
    <Link
      href={href ?? ""}
      className={classNames(
        "outline-solid relative aspect-square rounded-full bg-[#E88C0E] pb-0.5 outline outline-1 outline-[#422212] drop-shadow-side-link active:scale-[0.98]",
        {
          "w-16": !isFullSize,
          "w-full": isFullSize,
        },
      )}
      onClick={handleClick}
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
          <div
            className={classNames(
              "absolute z-50 size-full scale-[1.3]",
              imageClassnames,
            )}
          >
            <Image
              src={image ? image : AssignmentsImage}
              alt="side-bar-link"
              fill
            />
          </div>
        </div>
        <PrimaryButton
          color="yellow"
          buttonClassName="absolute !pb-0.5 z-50 !w-15 text-nowrap !h-[18px] !rounded-[4px] -bottom-1"
          innerClassname="!rounded-[4px] !p-0.5"
          className="text-x tracking-tighter"
        >
          {text ? text : t(NS.COMMON.SIDE_LINK)}
        </PrimaryButton>
      </div>
    </Link>
  );
};
