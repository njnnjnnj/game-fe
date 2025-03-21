import React, { FunctionComponent, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Card } from "@/components/common";
import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useSafeStarsPayment } from "@/hooks/useSafeStarsPayment";
import CloseIcon from "@/public/assets/svg/close.svg";
import {
  invalidateProfileQuery,
  invalidateStarsInfoQuery,
} from "@/services/profile/queries";
import { ShopItem } from "@/services/shop/types";
import { formatNumber } from "@/utils/number";
import { useQueryClient } from "@tanstack/react-query";

import { CARDS } from "./cards.data";

type Props = {
  starsShopItems: ShopItem[];
  onClose: () => void;
};

export const RefillModal: FunctionComponent<Props> = ({
  starsShopItems,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const tStars = useTranslations(NS.PAGES.BUY_STARS.ROOT);
  const tCommon = useTranslations(NS.COMMON.ROOT);
  const [selectedCard, setSelectedCard] = useState<ShopItem | null>(null);
  const { handleSelectionChanged } = useHapticFeedback();
  const { buy: buyStarsFn, isStarsPaymentLoading } = useSafeStarsPayment(
    () => {},
    () => {
      invalidateProfileQuery(queryClient);
      invalidateStarsInfoQuery(queryClient);
      onClose();
    },
    undefined,
    false,
  );

  const handleCardClick = (item: ShopItem) => {
    handleSelectionChanged();
    setSelectedCard(item);
  };

  return (
    <DrawerContent className="flex w-full flex-col items-center rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <DrawerClose
        asChild
        className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full"
      >
        <CloseIcon />
      </DrawerClose>

      <DrawerTitle className="!text-stroke-1 mb-3 px-5 text-center !text-2xl !font-black uppercase !tracking-wide text-white !text-shadow-sm">
        {tStars(
          `${NS.PAGES.BUY_STARS.MODAL.ROOT}.${NS.PAGES.BUY_STARS.MODAL.TITLE}`,
        )}
      </DrawerTitle>
      <DrawerDescription className="mb-6 text-center text-sm font-medium leading-3 tracking-wide text-gray-550">
        {tStars(
          `${NS.PAGES.BUY_STARS.MODAL.ROOT}.${NS.PAGES.BUY_STARS.MODAL.DESCRIPTION}`,
        )}
      </DrawerDescription>
      <div className="flex w-full flex-col items-center">
        <div className="relative mb-8 grid w-full grid-cols-3 gap-2">
          {starsShopItems.map((card, index) => {
            const staticCardData = CARDS[index];

            return (
              <Card
                key={`buy_friends_card_${index}`}
                collectButtonProps={{
                  children: tCommon(staticCardData.buttonText),
                }}
                isSelected={card.id === selectedCard?.id}
                bottomBadge={<Badge value={formatNumber(card.price)} />}
                onClick={() => handleCardClick(card)}
                isAnimated
              >
                <div className="absolute h-full w-full">
                  <Image src={staticCardData.image} alt="" fill />
                </div>
                <span className="text-stroke-1 absolute bottom-6 left-1/2 z-20 w-full -translate-x-1/2 text-center text-xs font-bold text-shadow-sm">
                  {tCommon(NS.COMMON.STARS, { count: card.amount })}
                </span>
              </Card>
            );
          })}
        </div>
        <PrimaryButton
          color="secondary"
          className="text-stroke-1 w-full uppercase text-shadow-sm"
          size="large"
          disabled={selectedCard === null}
          isLoading={isStarsPaymentLoading}
          onClick={() => buyStarsFn(selectedCard?.price ?? 0)}
        >
          {tStars(
            `${NS.PAGES.BUY_STARS.MODAL.ROOT}.${NS.PAGES.BUY_STARS.MODAL.BUTTON}`,
          )}
        </PrimaryButton>
      </div>
    </DrawerContent>
  );
};
