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
import BucketImage from "@/public/assets/png/battle-pass/bucket.webp";
import EpicChestImage from "@/public/assets/png/battle-pass/epic-chest.webp";
import MegaChestImage from "@/public/assets/png/battle-pass/mega-chest.webp";
import BackgroundImage from "@/public/assets/png/shop/beast.webp";
import BeastItemImage from "@/public/assets/png/shop/beast-item.webp";
import CloseIcon from "@/public/assets/svg/close.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { useGetProfile } from "@/services/profile/queries";
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
  const { data: profile } = useGetProfile();
  const t = useTranslations(NS.PAGES.SHOP.ROOT);

  const isEnabled = profile ? !profile.haveSpecial : false;

  return (
    <DrawerContent className="z-50 flex h-[70%] w-full flex-col items-center overflow-hidden rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <DrawerClose asChild className="absolute right-4 top-4 z-10">
        <CloseIcon onClick={() => handleSelectionChanged()} />
      </DrawerClose>

      <div className="absolute inset-0 -z-[1]">
        <Image src={BackgroundImage} alt="" fill objectFit="cover" priority />
      </div>

      <div className="z-10 mb-6 mt-auto flex w-full flex-col items-center gap-3">
        <div
          className={classNames(
            "text-stroke-half mx-auto flex items-center gap-2 self-start rounded-full bg-gradient-to-tr from-[#FF8E01] to-[#DD342C] px-3 pb-1.5 pt-1 text-lg font-extrabold text-white text-shadow",
          )}
        >
          {t(
            `${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.ROOT}.${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.BADGE}`,
          )}
        </div>
        <DrawerTitle>
          <div className="text-stroke-half px-5 text-center font-rubik text-[28px] font-black uppercase leading-none text-white text-shadow">
            {t(
              `${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.ROOT}.${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.TITLE}`,
            )}
          </div>
        </DrawerTitle>
        <DrawerDescription asChild>
          <p className="text-center text-xs font-medium tracking-wide text-white">
            {t(
              `${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.ROOT}.${NS.PAGES.SHOP.SPECIAL_OFFER_MODAL.DESCRIPTION}`,
            )}
          </p>
        </DrawerDescription>
        <div className="grid w-full max-w-[356px] grid-cols-4 gap-2 px-1.5">
          <div className="rounded-lg bg-black/40 p-0.5 shadow-[0px_2px_4px_0px_#00000066_inset,0px_-2px_4px_0px_#00000033_inset,0px_1px_1px_0px_#FFFFFF66]">
            <div className="relative pt-[100%]">
              <Image src={BucketImage} alt="" sizes="25vw" fill />
              <div className="text-stroke-half absolute bottom-1 w-full text-center text-lg font-black text-white text-shadow">
                x650
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-black/40 p-0.5 shadow-[0px_2px_4px_0px_#00000066_inset,0px_-2px_4px_0px_#00000033_inset,0px_1px_1px_0px_#FFFFFF66]">
            <div className="relative pt-[100%]">
              <Image src={EpicChestImage} alt="" sizes="25vw" fill />

              <div className="text-stroke-half absolute bottom-1 w-full text-center text-lg font-black text-white text-shadow">
                x1
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-black/40 p-0.5 shadow-[0px_2px_4px_0px_#00000066_inset,0px_-2px_4px_0px_#00000033_inset,0px_1px_1px_0px_#FFFFFF66]">
            <div className="relative pt-[100%]">
              <Image src={MegaChestImage} alt="" sizes="25vw" fill />
              <div className="text-stroke-half absolute bottom-1 w-full text-center text-lg font-black text-white text-shadow">
                x2
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-black/40 p-0.5 shadow-[0px_2px_4px_0px_#00000066_inset,0px_-2px_4px_0px_#00000033_inset,0px_1px_1px_0px_#FFFFFF66]">
            <div className="relative pt-[100%]">
              <Image src={BeastItemImage} alt="" sizes="25vw" fill />
              <div className="text-stroke-half absolute bottom-1 w-full text-center text-lg font-black text-white text-shadow">
                BEAST
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrimaryButton
        color="yellow"
        size="large"
        className="z-30 flex gap-2 uppercase"
        isLoading={isLoading}
        onClick={onSubmit}
        disabled={!isEnabled}
      >
        {isEnabled ? (
          <>
            {t(NS.PAGES.SHOP.BUY_FOR)} <StarSVG className="size-6" />{" "}
            {shopItem.price}
          </>
        ) : (
          t(NS.PAGES.SHOP.SOLD_OUT)
        )}
      </PrimaryButton>
    </DrawerContent>
  );
};
