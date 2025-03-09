import React, { FunctionComponent, MouseEvent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import EnergyImage from "@/public/assets/png/rewards/green-battery-half.webp";
import LigntningImage from "@/public/assets/png/rewards/lumin.png";
import CloseIcon from "@/public/assets/svg/close.svg";
import ClockIcon from "@/public/assets/svg/rewards/clock.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { RecoveryBooster, UpgradeBoosterType } from "@/services/rewards/types";
import { formatNumber } from "@/utils/number";

type Props = {
  recoveryBooster: RecoveryBooster;
  onSubmit: (
    event: MouseEvent<HTMLButtonElement>,
    type: UpgradeBoosterType,
  ) => void;
  disabled?: boolean;
};

export const RecoveryEnergyModal: FunctionComponent<Props> = ({
  recoveryBooster,
  onSubmit,
  disabled,
}) => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const LEVEL = recoveryBooster?.level;
  const PRICE = recoveryBooster?.price;

  const isZeroLevel = recoveryBooster?.level === 0;

  return (
    <DrawerContent
      className={classNames(
        "flex w-full flex-col items-center rounded-t-3xl border-0 bg-default-booster-modal-pattern bg-left-top bg-no-repeat px-4 pb-8 pt-9 font-rubik",
      )}
    >
      <DrawerClose
        asChild
        className="absolute right-4 top-4 z-50 flex size-8 items-center justify-center rounded-full"
      >
        <CloseIcon />
      </DrawerClose>
      <div className="relative mb-6 flex h-40 w-full items-center justify-between">
        <div className="absolute z-20 flex h-[160px] w-full items-center justify-center">
          <Image src={LigntningImage} fill objectFit="contain" alt="" />
        </div>

        <Image
          src={EnergyImage}
          alt="Energy image"
          fill
          objectFit="contain"
          className="z-20"
        />
      </div>
      <DrawerTitle className="text-stroke-half mb-6 text-center text-2xl font-black uppercase !text-white text-shadow-sm">
        {t(
          `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.DEFAULT}.${NS.PAGES.REWARDS.BOOSTERS.RECOVERY_ENERGY}`,
        )}
      </DrawerTitle>
      <DrawerDescription className="mb-6 text-sm font-medium tracking-wide !text-white">
        {t(
          `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.DEFAULT}.${NS.PAGES.REWARDS.BOOSTERS.RECOVERY_ENERGY_DESCRIPTION}`,
        )}
      </DrawerDescription>
      <div className="mb-6 flex w-full items-center justify-between px-3">
        {Array(10)
          .fill(0)
          .map((_, index) => {
            const isCurrent = recoveryBooster?.level === index;
            const isLess = LEVEL >= index + 1;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  key={index}
                  className={classNames(
                    "relative z-20 size-2 rounded-full bg-gray-550",
                    {
                      "size-4 rounded-full":
                        index === 0 || index === 10 || isCurrent,
                      "!bg-white": isLess,
                      "z-10 mb-1 !bg-blue-500": isCurrent,
                      "mb-5": !isCurrent && index !== 0 && index !== 10,
                      "after:absolute after:inset-0 after:z-10 after:size-full after:animate-pulse-wave after:rounded-full after:bg-blue-500 after:content-['']":
                        isCurrent,
                    },
                  )}
                />
                {isCurrent ? (
                  <span className="text-xs font-medium tracking-wide text-gray-550">
                    {t(
                      `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.LEVEL}`,
                    )}
                  </span>
                ) : index === 10 ? (
                  <span className="text-xs font-medium tracking-wide text-gray-550">
                    {index} ур.
                  </span>
                ) : index === 0 && LEVEL > 0 ? (
                  <span className="text-xs font-medium tracking-wide text-gray-550">
                    {index} ур.
                  </span>
                ) : null}
              </div>
            );
          })}
      </div>
      <div
        className={classNames("relative mb-6 grid w-full grid-cols-2 gap-2", {
          "grid-cols-1": isZeroLevel,
        })}
      >
        <div
          className={classNames(
            "flex w-full flex-col gap-3 rounded-2xl bg-blue-700 p-3",
            { "!flex-row justify-between": isZeroLevel },
          )}
        >
          <div className="mb-2 self-start rounded-full bg-white/5 px-2.5 py-[5px] text-xs text-gray-550">
            {LEVEL} ур.
          </div>
          <div
            className={classNames({
              "flex flex-col items-end justify-start gap-2": isZeroLevel,
            })}
          >
            <span className="text-xs font-medium tracking-wide text-gray-550">
              Запас энергии
            </span>
            <div className="flex items-center gap-2">
              <ClockIcon className="size-5" />
              <span className="text-lg font-semibold leading-none text-white">
                {recoveryBooster?.current}
              </span>
            </div>
          </div>
        </div>
        {!isZeroLevel && (
          <>
            <div className="text-stroke-1 absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-solid border-[#192632] bg-[linear-gradient(45deg,_#FFDE60_0%,_#FABF33_100%)] px-3 py-2 text-sm font-semibold text-white text-shadow-sm">
              <ClockIcon className="mr-1 size-5" />
              {(recoveryBooster?.new - recoveryBooster?.current).toFixed(2)}
            </div>
            <div className="flex w-full flex-col items-end gap-3 rounded-2xl bg-blue-700 p-3">
              <div className="mb-2 self-end rounded-full bg-[#0075FF] px-2.5 py-[5px] text-xs text-white">
                {LEVEL + 1} ур.
              </div>
              <span className="text-xs font-medium tracking-wide text-gray-550">
                Запас энергии
              </span>
              <div className="flex items-center gap-2">
                <ClockIcon className="size-5" />
                <span className="inline-block bg-gradient-to-b from-[#FFDE60] to-[#FABF33] bg-clip-text text-lg font-bold leading-none text-transparent">
                  {recoveryBooster?.new}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <PrimaryButton
        onClick={(e) => onSubmit(e, UpgradeBoosterType.RECOVERY)}
        disabled={disabled}
        size="large"
        className={classNames(
          "text-stroke-1 font-black uppercase tracking-wide text-shadow-sm",
          {
            "!bg-[#1B3044]": disabled,
          },
        )}
        innerClassname={classNames({
          "!bg-[#1B3044]": disabled,
        })}
      >
        {disabled ? (
          t(
            `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.INSUFFICIENT_FUNDS}`,
          )
        ) : (
          <div className="flex items-center gap-1 text-base uppercase">
            Улучшить за
            <div className="grid grid-cols-[16px_1fr] items-center gap-1">
              <StarSVG className="size-4" />
              {formatNumber(PRICE)}
            </div>
          </div>
        )}
      </PrimaryButton>
    </DrawerContent>
  );
};
