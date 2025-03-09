import React, { FunctionComponent, MouseEvent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Drawer } from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import FriendsIcon from "@/public/assets/svg/friends-coin.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { formatNumber } from "@/utils/number";

type Props = {
  title: string;
  level: number;
  current: number;
  newAmount: number;
  price: number;
  isAnimated: boolean;
  imageSrc: string;
  isDisabled: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  onUpgrade: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const BoosterCard: FunctionComponent<Props> = ({
  title,
  level,
  current,
  newAmount,
  price,
  isAnimated,
  imageSrc,
  isDisabled,
  isOpen,
  onOpenChange,
  onClick,
  onUpgrade,
}) => {
  const t = useTranslations();

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <div
        onClick={onClick}
        className="relative flex items-center justify-between gap-2 rounded-2xl bg-blue-700 p-3 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]"
      >
        <div className="grid grid-cols-[60px_1fr] items-center gap-3">
          <div className="relative flex size-15 items-center justify-center rounded-lg bg-gradient-to-b from-[#29D6FF] to-[#2596E4] p-1.5 shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]">
            <div
              className={classNames("relative h-full w-full", {
                "animate-tilt": isAnimated,
              })}
            >
              <Image src={imageSrc} alt="Energy image" fill />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-extrabold text-white">{title}</span>
            <div className="flex items-center gap-2">
              <span className="self-start rounded-full bg-white/10 px-2.5 py-[5px] text-xs font-semibold text-gray-550">
                {t("LEVEL", { num: level })}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-white">
                <FriendsIcon className="size-4" /> +{newAmount - current}
              </span>
            </div>
          </div>
        </div>
        <div className="pointer-events-auto w-26">
          <PrimaryButton
            onClick={onUpgrade}
            disabled={isDisabled}
            size="small"
            className="text-stroke-1 text-xs font-extrabold text-shadow-sm"
          >
            <div className="grid grid-cols-[16px_1fr] items-center gap-2">
              <StarSVG className="size-4" />
              {formatNumber(price)}
            </div>
          </PrimaryButton>
        </div>
      </div>
    </Drawer>
  );
};
