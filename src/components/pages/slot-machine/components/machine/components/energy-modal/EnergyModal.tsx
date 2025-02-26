import React, { FunctionComponent, useMemo, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { toast } from "sonner";

import { Card, CardType } from "@/components/common";
import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
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
import CloseIcon from "@/public/assets/svg/close.svg";
import { useBuyShopItem, useGetShop } from "@/services/shop/queries";
import { ShopItem, ShopItemTypeEnum } from "@/services/shop/types";
import { formatNumber } from "@/utils/number";

import { CARDS } from "./cards";

type Props = {
  onClose: () => void;
  onSuccessfulBuy: (energyAmount: number) => void;
};

export const EnergyModal: FunctionComponent<Props> = ({
  onClose,
  onSuccessfulBuy,
}) => {
  const t = useTranslations(NS.PAGES.SLOT_MACHINE.ROOT);
  const tCommon = useTranslations(NS.COMMON.ROOT);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const { data: shopItems } = useGetShop();
  const { mutate: buyEnergy, isPending: isBuyingEnergy } = useBuyShopItem();

  const energyItems = useMemo(
    () =>
      (shopItems?.items ?? []).filter(
        (item) => item.type === ShopItemTypeEnum.GAME_ENERGY,
      ),
    [shopItems],
  );

  const handleBuyEnergy = () => {
    if (!selectedItem) return;

    buyEnergy(selectedItem.id, {
      onSuccess: () => {
        onSuccessfulBuy(selectedItem.amount);
        onClose();

        toast(
          <Toast
            type="done"
            text={`You've successfully bought ${selectedItem.amount} of energy`}
          />,
        );
      },
      onError: (error) => {
        toast(
          <Toast
            type="destructive"
            text={`Buying energy has failed: ${error.message}`}
          />,
        );
      },
    });
  };

  const { buy: tryBuyEnergy, isStarsPaymentLoading } = useSafeStarsPayment(
    () => {
      handleBuyEnergy();
    },
    () => {
      handleBuyEnergy();
    },
  );

  return (
    <DrawerContent className="flex w-full flex-col items-center rounded-t-3xl border-none bg-gradient-to-b from-[#FAD22C] to-[#FEEE3D] p-[5px] pb-0 shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <div className="relative flex w-full flex-col items-center rounded-t-3xl bg-[#5E0820] px-3 pb-7 pt-8">
        <DrawerClose
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full"
          asChild
        >
          <CloseIcon />
        </DrawerClose>

        <DrawerTitle className="!text-stroke-1 mb-3 text-center !text-2xl !font-black uppercase !tracking-wide text-white !text-shadow-sm">
          {t(
            `${NS.PAGES.SLOT_MACHINE.ENERGY_MODAL.ROOT}.${NS.PAGES.SLOT_MACHINE.ENERGY_MODAL.TITLE}`,
          )}
        </DrawerTitle>

        <DrawerDescription className="mb-6 text-center text-sm font-medium leading-3 tracking-wide text-gray-550">
          {t(
            `${NS.PAGES.SLOT_MACHINE.ENERGY_MODAL.ROOT}.${NS.PAGES.SLOT_MACHINE.ENERGY_MODAL.DESCRIPTION}`,
          )}
        </DrawerDescription>

        <div className="flex w-full flex-col items-center">
          <div className="relative mb-8 grid w-full grid-cols-3 gap-2">
            {energyItems.map((item, index) => {
              const card = CARDS[index];

              return (
                <Card
                  key={item.id}
                  collectButtonProps={{
                    color: card.buttonColor,
                    children: !!parseInt(card.buttonText)
                      ? card.buttonText
                      : tCommon(card.buttonText),
                  }}
                  isSelected={item.id === selectedItem?.id}
                  bottomBadge={<Badge value={formatNumber(item.price)} />}
                  onClick={() => setSelectedItem(item)}
                  type={CardType.RED}
                  isAnimated
                >
                  <div className="absolute h-full w-full">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="33vw"
                      quality={100}
                    />
                  </div>
                  <span className="text-stroke-1 absolute bottom-6 left-1/2 z-20 w-full -translate-x-1/2 text-center text-xs font-bold text-shadow-sm">
                    {t(
                      `${NS.PAGES.SLOT_MACHINE.ENERGY_MODAL.ROOT}.${NS.PAGES.SLOT_MACHINE.ENERGY_MODAL.ENERGY_UNIT}`,
                      { amount: item.amount },
                    )}
                  </span>
                </Card>
              );
            })}
          </div>
          <PrimaryButton
            className="text-stroke-1 w-full uppercase text-shadow-sm"
            color="yellow"
            disabled={selectedItem === null}
            isLoading={isStarsPaymentLoading || isBuyingEnergy}
            onClick={() => tryBuyEnergy(selectedItem?.price ?? 0)}
          >
            {t(
              `${NS.PAGES.SLOT_MACHINE.ENERGY_MODAL.ROOT}.${NS.PAGES.SLOT_MACHINE.ENERGY_MODAL.BUTTON}`,
            )}
          </PrimaryButton>
        </div>
      </div>
    </DrawerContent>
  );
};
