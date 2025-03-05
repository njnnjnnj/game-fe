import React, { useMemo } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import {
  OverscrollBehavior,
  PageWrapper,
  ProfileHeader,
} from "@/components/common";
import { NS } from "@/constants/ns";
import TapeBlueImage from "@/public/assets/png/shop/tape-1.webp";
import ChestSVG from "@/public/assets/svg/chest-light.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { useGetShop } from "@/services/shop/queries";
import { ShopItemTypeEnum } from "@/services/shop/types";

import { AutoCollect } from "./components/auto-collect/AutoCollect";
import { Chests } from "./components/chests/Chests";
import { Friends } from "./components/friends/Friends";
import { Stars } from "./components/stars/Stars";

export const Shop = () => {
  const t = useTranslations(NS.PAGES.SHOP.ROOT);
  const { data: shopData, isLoading } = useGetShop();

  const chestsShopItems = useMemo(
    () =>
      shopData?.items.filter((item) => item.type === ShopItemTypeEnum.CHEST),
    [shopData],
  );

  const starsShopItems = useMemo(
    () =>
      shopData?.items.filter((item) => item.type === ShopItemTypeEnum.STARS),
    [shopData],
  );

  const friendsShopItems = useMemo(
    () =>
      shopData?.items.filter((item) => item.type === ShopItemTypeEnum.FRIENDS),
    [shopData],
  );

  const autoCollectShopItems = useMemo(
    () =>
      shopData?.items.filter((item) => item.type === ShopItemTypeEnum.BOOSTER),
    [shopData],
  );

  return (
    <PageWrapper
      isLoading={isLoading}
      overscrollBehaviour={OverscrollBehavior.NONE}
    >
      <div className="relative w-full">
        <div className="pointer-events-none fixed inset-0 -top-45 -z-[1] bg-[url('/assets/png/shop/bg.webp')] bg-[length:100%] bg-center-top bg-no-repeat" />
        <ProfileHeader className="my-5 w-full" />
        <div className="w-full px-4">
          <div className="relative flex aspect-[9/1] items-center justify-center px-4">
            <Image src={TapeBlueImage} alt="tape" fill />
            <span className="text-stroke-1 relative z-10 mb-1 text-2xl font-black text-white text-shadow-sm">
              {t(NS.PAGES.SHOP.SPECIAL_OFFER)}
            </span>
          </div>
          <div className="relative left-1/2 mb-4 w-fit -translate-x-1/2 rounded-b-[8px] bg-black/60 px-11 py-2 text-center text-[11px] font-semibold leading-none tracking-wide text-gray-550 shadow-[inset_0_-1px_1px_0_rgba(255,255,255,0.2),inset_0_6px_12px_0_rgba(0,0,0,0.6)]">
            {t(NS.PAGES.SHOP.EXPRESS_YOUR_MOOD)}
          </div>
          <div className="mb-4 aspect-[2.75/1] rounded-xl bg-[#403BB7] pb-1 outline outline-1 outline-black">
            <div className="h-full w-full rounded-xl bg-gradient-to-b from-[#9099FD] to-[#777AF0] p-1 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.3)]">
              <div className="flex h-full w-full flex-col items-start rounded-xl bg-[url('/assets/png/shop/spec-offer.webp')] bg-cover p-4 shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25),inset_0_-2px_4px_0_rgba(0,0,0,0.15)]">
                <div className="mb-2 mt-auto flex items-center justify-start gap-2 rounded-full bg-[#192632]/50 px-3 py-1">
                  <div className="flex items-center gap-1">
                    <StarSVG className="size-4" />
                    <span className="text-stroke-half text-xs font-extrabold uppercase text-white text-shadow">
                      +50.000
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChestSVG className="size-4.5" />
                    <span
                      className={classNames(
                        "text-stroke-1 text-xs font-extrabold text-shadow-sm",
                        "md:text-lg",
                      )}
                    >
                      +1
                    </span>
                  </div>
                </div>
                <p className="text-stroke-1 w-2/3 text-sm font-black uppercase leading-none tracking-wide text-white text-shadow">
                  {t(NS.PAGES.SHOP.SPECIAL_OFFER_CARD)}
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex aspect-[9/1] items-center justify-center px-4">
            <Image src={TapeBlueImage} alt="tape" fill />
            <span className="text-stroke-1 relative z-10 mb-1 text-2xl font-black text-white text-shadow-sm">
              {t(NS.PAGES.SHOP.STARTER_SET)}
            </span>
          </div>
          <div className="relative left-1/2 mb-4 w-fit -translate-x-1/2 rounded-b-[8px] bg-black/60 px-11 py-2 text-center text-[11px] font-semibold leading-none tracking-wide text-gray-550 shadow-[inset_0_-1px_1px_0_rgba(255,255,255,0.2),inset_0_6px_12px_0_rgba(0,0,0,0.6)]">
            {t(NS.PAGES.SHOP.EXPRESS_YOUR_MOOD)}
          </div>
          <div className="mb-4 aspect-[2.75/1] rounded-xl bg-[#403BB7] pb-1 outline outline-1 outline-black">
            <div className="h-full w-full rounded-xl bg-gradient-to-b from-[#9099FD] to-[#777AF0] p-1 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.3)]">
              <div className="flex h-full w-full flex-col items-start rounded-xl bg-[url('/assets/png/shop/starter-kit.webp')] bg-cover p-4 shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25),inset_0_-2px_4px_0_rgba(0,0,0,0.15)]">
                <div className="mb-2 mt-auto flex items-center justify-start gap-2 rounded-full bg-[#192632]/50 px-3 py-1">
                  <div className="flex items-center gap-1">
                    <StarSVG className="size-4" />
                    <span className="text-stroke-half text-xs font-extrabold uppercase text-white text-shadow">
                      +50.000
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChestSVG className="size-4.5" />
                    <span
                      className={classNames(
                        "text-stroke-1 text-xs font-extrabold text-shadow-sm",
                        "md:text-lg",
                      )}
                    >
                      +1
                    </span>
                  </div>
                </div>
                <p className="text-stroke-1 w-2/4 text-sm font-black uppercase leading-none tracking-wide text-white text-shadow">
                  {t(NS.PAGES.SHOP.STARTER_SET_CARD)}
                </p>
              </div>
            </div>
          </div>
          <Chests cards={chestsShopItems ?? []} />
          <Stars cards={starsShopItems ?? []} />
          <Friends cards={friendsShopItems ?? []} />
          <AutoCollect cards={autoCollectShopItems ?? []} />
        </div>
      </div>
    </PageWrapper>
  );
};
