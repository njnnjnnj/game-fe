import React, { FunctionComponent } from "react";

import Link from "next/link";
import { useTranslations } from "next-intl";

import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import CloseIcon from "@/public/assets/svg/close.svg";
import CoinsSVG from "@/public/assets/svg/coins.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { OfflineBonus } from "@/services/offline-bonus/types";
import { formatNumber } from "@/utils/number";

type Props = OfflineBonus & {
  isPending?: boolean;
  onConfirm: () => void;
};

export const OfflineBonusModal: FunctionComponent<Props> = ({
  reward,
  haveOfflineBonus,
  isPending,
  onConfirm,
}) => {
  const tOfflineBonus = useTranslations(NS.PAGES.HOME.ROOT);
  return (
    <DrawerContent className="flex w-full flex-col items-center rounded-t-3xl border-none bg-gradient-to-b from-[#FAD22C] to-[#FEEE3D] p-[5px] pb-0 shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <div className="relative flex w-full flex-col items-center rounded-t-3xl bg-[#5E0820] px-3 pb-7 pt-8">
        <DrawerClose
          asChild
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full"
        >
          <CloseIcon />
        </DrawerClose>
        <CoinsSVG className="mb-6" />

        <DrawerTitle className="mb-3 text-center text-2xl font-black uppercase tracking-normal !text-white text-shadow">
          {tOfflineBonus(
            `${NS.PAGES.HOME.OFFLINE_BONUS.ROOT}.${NS.PAGES.HOME.OFFLINE_BONUS.TITLE}`,
          )}
        </DrawerTitle>
        <DrawerDescription className="mb-6 text-center text-xs font-medium leading-none text-gray-550">
          {tOfflineBonus(
            `${NS.PAGES.HOME.OFFLINE_BONUS.ROOT}.${NS.PAGES.HOME.OFFLINE_BONUS.DESCRIPTION}`,
          )}
        </DrawerDescription>
        <div className="mb-6 flex items-center gap-2 rounded-full bg-white/10 px-6 py-4">
          <StarSVG className="size-9" />
          <span className="text-stroke-1 text-4xl font-black leading-none tracking-wide text-white text-shadow">
            +{reward ? formatNumber(reward) : "0"}
          </span>
        </div>
        <PrimaryButton
          isLoading={isPending}
          color="yellow"
          className="uppercase text-white"
          onClick={onConfirm}
        >
          {tOfflineBonus(
            `${NS.PAGES.HOME.OFFLINE_BONUS.ROOT}.${NS.PAGES.HOME.OFFLINE_BONUS.GET_BONUS}`,
          )}
        </PrimaryButton>
        {!haveOfflineBonus && (
          <Link
            href={ROUTES.SHOP}
            className="mt-6 p-0 text-sm font-bold uppercase tracking-wide text-white transition-all hover:no-underline active:scale-[0.98]"
          >
            {tOfflineBonus(
              `${NS.PAGES.HOME.OFFLINE_BONUS.ROOT}.${NS.PAGES.HOME.OFFLINE_BONUS.BUY_BONUS}`,
            )}
          </Link>
        )}
      </div>
    </DrawerContent>
  );
};
