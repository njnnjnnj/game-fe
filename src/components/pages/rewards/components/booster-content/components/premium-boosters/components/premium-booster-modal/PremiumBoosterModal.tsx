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
import EnergyImage from "@/public/assets/png/rewards/full-energy.webp";
import LigntningImage from "@/public/assets/png/rewards/lumin.png";
import CloseIcon from "@/public/assets/svg/close.svg";
import EnergyIcon from "@/public/assets/svg/energy.svg";
import UnionIcon from "@/public/assets/svg/rewards/union.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { ShopItem } from "@/services/shop/types";

import { Timer } from "../timer/Timer";

type Props = {
  currentEnergy: number;
  maxEnergy: number;
  endTime: number;
  boosterShopItems: ShopItem[];
  amount: number;
  isRequesting: boolean;
  selectedBooster: ShopItem | null;
  setSelectedBooster: (booster: ShopItem) => void;
  onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const PremiumBoosterModal: FunctionComponent<Props> = ({
  onSubmit,
  currentEnergy,
  maxEnergy,
  endTime,
  boosterShopItems,
  amount,
  isRequesting,
  selectedBooster,
  setSelectedBooster,
}) => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const hasTimer = Date.now() < endTime * 1000;

  return (
    <DrawerContent
      className={classNames(
        "flex w-full flex-col items-center rounded-t-3xl border-0 bg-booster-modal-pattern bg-left-top bg-no-repeat px-4 pb-8 pt-9 font-rubik",
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
      <DrawerTitle className="text-stroke-half mb-6 text-center text-2xl font-black uppercase leading-none text-white !text-shadow">
        {t(
          `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.PREMIUM}.${NS.PAGES.REWARDS.BOOSTERS.MODAL_TITLE}`,
        )}
      </DrawerTitle>
      <DrawerDescription className="mb-6 text-center text-sm font-medium tracking-wide text-white">
        {!selectedBooster?.amount || selectedBooster.amount === 1
          ? t(
              `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.PREMIUM}.${NS.PAGES.REWARDS.BOOSTERS.TEMP_ENERGY}`,
            )
          : t(
              `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.PREMIUM}.${NS.PAGES.REWARDS.BOOSTERS.MULTIPLE_TEMP_ENERGY}`,
              { amount: selectedBooster.amount },
            )}
      </DrawerDescription>
      {hasTimer && (
        <div className="mb-6 w-full">
          <Timer epochTime={endTime} />
        </div>
      )}
      <div className="relative mb-6 grid w-full grid-cols-2 gap-2">
        <div className="flex w-full flex-col gap-3 rounded-2xl bg-blue-700 p-3">
          <span className="text-xs font-medium tracking-wide text-gray-550">
            {t(
              `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.CURRENT}`,
            )}
          </span>
          <div className="flex items-center gap-2">
            <EnergyIcon className="size-5" />
            <span className="text-lg font-semibold leading-none text-white">
              {currentEnergy}
            </span>
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-solid border-[#192632] bg-[linear-gradient(45deg,_#35AFF1_0%,_#4DC0FF_50%,_#9EDDFF_100%)]">
          <UnionIcon className="w-2" />
        </div>
        <div className="flex w-full flex-col items-end gap-3 rounded-2xl bg-blue-700 p-3">
          <span className="text-xs font-medium tracking-wide text-gray-550">
            {t(
              `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.AFTER_IMPROVE}`,
            )}
          </span>
          <div className="flex items-center gap-2">
            <EnergyIcon className="size-5" />
            <span className="inline-block bg-gradient-to-tr from-[#61C2F6] to-[#CCE8F7] bg-clip-text text-lg font-bold leading-none text-transparent">
              {maxEnergy}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-6 w-full">
        <p className="mb-3 text-xs font-medium tracking-wide text-gray-550">
          {t(
            `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.PREMIUM}.${NS.PAGES.REWARDS.BOOSTERS.COUNT}`,
          )}
        </p>
        <div className="grid w-full grid-cols-3 gap-2">
          {boosterShopItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedBooster(item)}
              className={classNames(
                "flex w-full items-center justify-center gap-1 text-nowrap rounded-xl border border-solid border-black bg-[#242C34] py-3 text-sm font-semibold text-white",
                {
                  "border-2 !border-[#0075FF] !bg-[#203950]":
                    selectedBooster?.id === item.id,
                },
              )}
            >
              {t(
                `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.COUNT_BOOSTERS}`,
                { num: item.amount },
              )}
            </div>
          ))}
        </div>
      </div>
      <PrimaryButton
        onClick={onSubmit}
        size="large"
        isLoading={isRequesting}
        color={selectedBooster ? "primary" : "secondary"}
        className={classNames("flex gap-1 text-base uppercase", {
          "!bg-[#1B3044]":
            selectedBooster !== null ? false : amount ? false : true,
        })}
        innerClassname={classNames({
          "!bg-[#1B3044]":
            selectedBooster !== null ? false : amount ? false : true,
        })}
      >
        {selectedBooster ? (
          <div className="flex items-center gap-1">
            {t(
              `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.BUY_FOR}`,
            )}
            <StarSVG className="size-6" />
            {selectedBooster.price}
          </div>
        ) : amount ? (
          t(
            `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.APPLY}`,
          )
        ) : (
          t(
            `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.NOT_AVAILABLE}`,
          )
        )}
      </PrimaryButton>
    </DrawerContent>
  );
};
