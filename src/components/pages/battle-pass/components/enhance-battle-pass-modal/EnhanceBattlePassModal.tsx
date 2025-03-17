import React, { FunctionComponent, useMemo } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { toast } from "sonner";

import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useSafeStarsPayment } from "@/hooks/useSafeStarsPayment";
import AllCards from "@/public/assets/png/battle-pass/all-cards.webp";
import EnergyBooster from "@/public/assets/png/battle-pass/booster.webp";
import Bucket from "@/public/assets/png/battle-pass/bucket.webp";
import EnergyBucket from "@/public/assets/png/battle-pass/energy-bucket.webp";
import EnhanceBpHero from "@/public/assets/png/battle-pass/enhance-bp-hero.webp";
import EpicChest from "@/public/assets/png/battle-pass/epic-chest.webp";
import FriendsBucket from "@/public/assets/png/battle-pass/friends-bucket.webp";
import MegaChest from "@/public/assets/png/battle-pass/mega-chest.webp";
import Offline24 from "@/public/assets/png/battle-pass/offline24.webp";
import CloseIcon from "@/public/assets/svg/close.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { useGetBattlePass } from "@/services/battle-pass/queries";
import { useBuyShopItem, useGetShop } from "@/services/shop/queries";
import { ShopItemTypeEnum } from "@/services/shop/types";

type Props = {
  onClose: () => void;
};

const ITEMS = [
  { img: MegaChest, amount: 5 },
  { img: EpicChest, amount: 5 },
  { img: AllCards, amount: 11 },
  { img: Offline24, amount: 12 },
  { img: EnergyBucket, amount: 3700 },
  { img: FriendsBucket, amount: 145 },
  { img: Bucket, amount: 950 },
  { img: EnergyBooster, amount: 5 },
];

export const EnhanceBattlePassModal: FunctionComponent<Props> = ({
  onClose,
}) => {
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);
  const { data: shopItems } = useGetShop();
  const { refetch: refetchBattlePass } = useGetBattlePass();
  const { mutate: buyBattlePass, isPending: isBuyingBattlePass } =
    useBuyShopItem();

  const bpItems = useMemo(
    () =>
      (shopItems?.items ?? []).filter(
        (item) => item.type === ShopItemTypeEnum.BATTLE_PASS,
      ),
    [shopItems],
  );

  const handleBuyBattlePass = () => {
    if (!bpItems[0]) return;

    buyBattlePass(bpItems[0].id, {
      onSuccess: () => {
        refetchBattlePass();
        onClose();

        toast(
          <Toast type="done" text={`You've successfully bought Battle Pass`} />,
        );
      },
      onError: (error) => {
        toast(
          <Toast
            type="destructive"
            text={`Buying Battle Pass has failed: ${error.message}`}
          />,
        );
      },
    });
  };

  const { buy: tryBuyBattlePass, isStarsPaymentLoading } = useSafeStarsPayment(
    () => {
      handleBuyBattlePass();
    },
    () => {
      handleBuyBattlePass();
    },
  );

  return (
    <DrawerContent className="flex w-full flex-col items-center rounded-t-3xl border-none bg-gradient-to-b from-[#FFCE08] to-[#E88C0E] px-[5px] pb-0 pt-[5px] shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <div className="relative flex w-full flex-col items-center rounded-t-3xl bg-bp-enhance-bp-modal-pattern px-3 pb-7 pt-8 shadow-[0px_12px_6px_0px_#FFFFFF66_inset,0px_-8px_4px_0px_#00000033_inset]">
        <DrawerClose
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full"
          asChild
        >
          <CloseIcon />
        </DrawerClose>
        <Image src={EnhanceBpHero} width={200} height={113} alt="" />
        <DrawerTitle className="!text-stroke-2 mb-3 whitespace-pre-wrap text-center !text-2xl !font-black uppercase !tracking-wide text-white !text-shadow">
          {t(
            `${NS.PAGES.BATTLE_PASS.ENHANCE_MODAL.ROOT}.${NS.PAGES.BATTLE_PASS.ENHANCE_MODAL.TITLE}`,
          )}
        </DrawerTitle>

        <DrawerDescription className="mb-6 text-center text-sm font-medium leading-3 tracking-wide text-gray-550 text-white">
          {t(
            `${NS.PAGES.BATTLE_PASS.ENHANCE_MODAL.ROOT}.${NS.PAGES.BATTLE_PASS.ENHANCE_MODAL.DESCRIPTION}`,
          )}
        </DrawerDescription>

        <div className="flex w-full flex-col items-center">
          <div className="mb-8 grid w-full grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg bg-black/40 p-0.5 shadow-[0px_2px_4px_0px_#00000066_inset,0px_-2px_4px_0px_#00000033_inset,0px_1px_1px_0px_#FFFFFF66]"
              >
                <div className="relative pt-[100%]">
                  <Image src={ITEMS[i].img} alt="" sizes="25vw" fill />
                  <div className="text-stroke-2 absolute bottom-1 w-full text-center text-lg font-black text-white text-shadow">
                    {`x${ITEMS[i].amount}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <PrimaryButton
            className="text-stroke-1 w-full uppercase text-shadow-sm"
            color="yellow"
            isLoading={isStarsPaymentLoading || isBuyingBattlePass}
            onClick={() => tryBuyBattlePass(bpItems[0]?.price)}
          >
            <div className="flex items-center gap-x-1">
              {t(
                `${NS.PAGES.BATTLE_PASS.BUTTONS.ROOT}.${NS.PAGES.BATTLE_PASS.BUTTONS.MODALS_BUY}`,
              )}
              <StarSVG
                className="ml-1"
                width="28px"
                height="28px"
                viewBox="0 0 29 29"
              />
              {bpItems[0]?.price}
            </div>
          </PrimaryButton>
        </div>
      </div>
    </DrawerContent>
  );
};
