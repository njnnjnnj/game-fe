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
import RaysImage from "@/public/assets/png/shop/rays.webp";
import CloseIcon from "@/public/assets/svg/close.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { ShopItem, ShopItemTypeEnum } from "@/services/shop/types";

import {
  MODAL_IMAGES_BY_SHOP_ITEM,
  ModalColorEnum,
  TID_BY_SHOP_ITEM_TYPE,
} from "../../constants";

import { getShopItemByIndex } from "./helpers";

type Props = {
  selectedItem: ShopItem;
  isLoading: boolean;
  onSubmit: () => void;
};

export const BaseModal: FunctionComponent<Props> = ({
  selectedItem,
  isLoading,
  onSubmit,
}) => {
  const t = useTranslations(NS.PAGES.SHOP.ROOT),
    foundedItem = MODAL_IMAGES_BY_SHOP_ITEM.find(
      (item) => item.id === selectedItem.id,
    );

  const getTitle = () => {
    switch (selectedItem.type) {
      case ShopItemTypeEnum.STARS:
        return t(getShopItemByIndex(selectedItem.id));
      case ShopItemTypeEnum.OFFLINE_BONUS:
        return t(NS.PAGES.SHOP.MODAL_OFFLINE_BONUS_TITLE, {
          hours: selectedItem.amount,
        });
      case ShopItemTypeEnum.CHEST:
        return t(NS.PAGES.SHOP.MODAL_CHEST_TITLE, { type: selectedItem.value });
      case ShopItemTypeEnum.FRIENDS:
        return t(`${NS.PAGES.SHOP.BUY_FRIENDS_COUNT}`, {
          count: selectedItem.amount,
        });
      default:
        return t(NS.PAGES.SHOP.MODAL_TITLE);
    }
  };

  const getDescription = () => {
    switch (selectedItem.type) {
      case ShopItemTypeEnum.STARS:
        return t(NS.PAGES.SHOP.MODAL_STARS_DESCRIPTION);
      case ShopItemTypeEnum.OFFLINE_BONUS:
        return t(NS.PAGES.SHOP.MODAL_OFFLINE_BONUS_DESCRIPTION);
      case ShopItemTypeEnum.CHEST:
        return t(NS.PAGES.SHOP.MODAL_CHEST_DESCRIPTION);
      case ShopItemTypeEnum.FRIENDS:
        return t(NS.PAGES.SHOP.MODAL_FRIENDS_DESCRIPTION);
      default:
        return t(NS.PAGES.SHOP.MODAL_DESCRIPTION);
    }
  };

  return (
    <DrawerContent
      className={classNames(
        "flex w-full flex-col items-center rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]",
        {
          "bg-gradient-to-b from-[#7740F5] to-[#EE84FF]":
            foundedItem && foundedItem.color === ModalColorEnum.PURPLE,
          "bg-[#0069B1]":
            foundedItem && foundedItem.color === ModalColorEnum.BLUE,
          "bg-gradient-to-b from-[#7EB9FF] to-[#0377FF]":
            foundedItem && foundedItem.color === ModalColorEnum.LIGHTBLUE,
        },
      )}
    >
      <DrawerClose
        asChild
        className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full"
      >
        <CloseIcon />
      </DrawerClose>
      <Image src={RaysImage} alt="" fill className="-z-[1]" priority={true} />

      {foundedItem && foundedItem.image && (
        <div
          className={classNames("relative mb-4", {
            "size-[210px]": foundedItem.isSquare,
            "h-[260px] w-[210px]": !foundedItem.isSquare,
          })}
        >
          <Image src={foundedItem.image.src} alt="" fill />
        </div>
      )}

      <p className="text-stroke-1 mb-3 rounded-full bg-black/40 px-4 py-2 text-base font-extrabold text-white text-shadow-sm">
        {t(
          `${NS.PAGES.SHOP.SHOP_TYPE.ROOT}.${TID_BY_SHOP_ITEM_TYPE[selectedItem.type]}`,
        )}
      </p>
      <DrawerTitle className="text-stroke-1 mb-3 text-center text-[28px] font-black leading-none !text-white text-shadow-sm">
        {getTitle()}
      </DrawerTitle>
      <DrawerDescription className="mb-6 text-center text-xs font-medium tracking-wide text-white">
        {getDescription()}
      </DrawerDescription>
      <PrimaryButton
        color="yellow"
        size="large"
        className="flex gap-2 uppercase"
        isLoading={isLoading}
        onClick={onSubmit}
      >
        {t(NS.PAGES.SHOP.BUY_FOR)} <StarSVG className="size-6" />{" "}
        {selectedItem.price}
      </PrimaryButton>
    </DrawerContent>
  );
};
