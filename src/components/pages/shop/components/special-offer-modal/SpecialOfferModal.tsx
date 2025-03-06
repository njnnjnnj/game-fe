import React, { FunctionComponent } from "react";

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
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import BackgroundImage from "@/public/assets/png/shop/beast.webp";
import CloseIcon from "@/public/assets/svg/close.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { ShopItem } from "@/services/shop/types";

type Props = {
  shopItem: ShopItem;
  onSubmit: () => void;
  isLoading: boolean;
};

export const SpecialOfferModal: FunctionComponent<Props> = ({
  shopItem,
  onSubmit,
  isLoading,
}) => {
  const { handleSelectionChanged } = useHapticFeedback();
  const t = useTranslations(NS.PAGES.SHOP.ROOT);

  return (
    <DrawerContent className="flex aspect-[13/20] w-full flex-col items-center overflow-hidden rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <DrawerClose asChild className="absolute right-4 top-4 z-10">
        <CloseIcon onClick={() => handleSelectionChanged()} />
      </DrawerClose>

      <div className="absolute inset-0 -z-[1]">
        <Image src={BackgroundImage} alt="" fill objectFit="cover" priority />
      </div>

      <div className="z-10 mb-6 mt-auto flex flex-col items-center gap-3">
        <div
          className={classNames(
            "text-stroke-half mx-auto flex items-center gap-2 self-start rounded-full bg-[#76432B] px-3 py-1 text-xs font-extrabold uppercase text-shadow-sm",
          )}
        >
          <StarSVG className="size-4" />
          {t(
            `${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.ROOT}.${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.BADGE}`,
          )}
        </div>
        <DrawerTitle>
          <div className="text-stroke-1 px-5 text-center font-rubik text-[28px] font-black uppercase leading-none text-white text-shadow">
            {t(
              `${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.ROOT}.${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.TITLE}`,
            )}
          </div>
        </DrawerTitle>
        <DrawerDescription asChild>
          <p className="text-center text-xs font-medium tracking-wide text-gray-550">
            {t(
              `${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.ROOT}.${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.DESCRIPTION}`,
            )}
          </p>
        </DrawerDescription>
      </div>
      <PrimaryButton
        color="yellow"
        size="large"
        className="z-30 flex gap-2 uppercase"
        isLoading={isLoading}
        onClick={onSubmit}
      >
        {t(NS.PAGES.SHOP.BUY_FOR)} <StarSVG className="size-6" />{" "}
        {shopItem.price}
      </PrimaryButton>
    </DrawerContent>
  );
};
