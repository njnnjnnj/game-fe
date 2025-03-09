import React, { FunctionComponent, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { AxiosError } from "axios";
import { toast } from "sonner";

import { Card } from "@/components/common";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useSafeStarsPayment } from "@/hooks/useSafeStarsPayment";
import CloseIcon from "@/public/assets/svg/close.svg";
import {
  invalidateProfileQuery,
  invalidateReferralQuery,
} from "@/services/profile/queries";
import { useBuyShopItem } from "@/services/shop/queries";
import { ShopItem } from "@/services/shop/types";
import { NotificationEnum } from "@/types/telegram";
import { formatNumber } from "@/utils/number";
import { useQueryClient } from "@tanstack/react-query";

import { Badge } from "./components/badge/Badge";
import { CARDS } from "./cards.data";

type Props = {
  friendsShopItems: ShopItem[];
  onClose: () => void;
};

export const InviteModal: FunctionComponent<Props> = ({
  friendsShopItems,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const t = useTranslations(NS.PAGES.FRIENDS.ROOT);
  const tErrors = useTranslations(NS.ERRORS.ROOT);
  const [selectedCard, setSelectedCard] = useState<ShopItem | null>(null);
  const { handleSelectionChanged, handleNotificationOccurred } =
    useHapticFeedback();
  const { mutate, isPending } = useBuyShopItem();
  const { buy: buyFriendsFn, isStarsPaymentLoading } = useSafeStarsPayment(
    () => {
      handleBuyFriends();
    },
    () => {
      toast(
        <Toast
          type="destructive"
          text={t(
            `${NS.PAGES.FRIENDS.MODAL.ROOT}.${NS.PAGES.FRIENDS.MODAL.BOUGHT_SUCCESSFULLY}`,
          )}
        />,
      );
    },
    () => {
      toast(
        <Toast
          type="destructive"
          text={t(
            `${NS.PAGES.FRIENDS.ERRORS.ROOT}.${NS.PAGES.FRIENDS.ERRORS.BUY_FRIENDS}`,
          )}
        />,
      );
    },
  );

  const handleCardClick = (item: ShopItem) => {
    handleSelectionChanged();
    setSelectedCard(item);
  };

  const handleBuyFriends = () => {
    if (selectedCard === null) {
      handleSelectionChanged();
    } else {
      handleNotificationOccurred(NotificationEnum.ERROR);
    }

    if (selectedCard === null) return;

    mutate(selectedCard.id, {
      onSuccess: () => {
        invalidateReferralQuery(queryClient);
        invalidateProfileQuery(queryClient);
        onClose();
        toast(
          <Toast
            type="done"
            text={t(
              `${NS.PAGES.FRIENDS.MODAL.ROOT}.${NS.PAGES.FRIENDS.MODAL.BOUGHT_SUCCESSFULLY}`,
              { number: selectedCard.amount },
            )}
          />,
        );
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const tid = error.response?.data["detail"];

          toast(<Toast type="destructive" text={tErrors(tid)} />);
        }
      },
    });
  };

  return (
    <DrawerContent className="flex w-full flex-col items-center rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <DrawerClose
        asChild
        className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full"
      >
        <CloseIcon />
      </DrawerClose>

      <DrawerTitle className="!text-stroke-1 mb-3 text-center !text-2xl !font-black uppercase !tracking-wide text-white !text-shadow-sm">
        {t(`${NS.PAGES.FRIENDS.MODAL.ROOT}.${NS.PAGES.FRIENDS.MODAL.TITLE}`)}
      </DrawerTitle>
      <DrawerDescription className="mb-6 text-center text-sm font-medium leading-3 tracking-wide text-gray-550">
        {t(
          `${NS.PAGES.FRIENDS.MODAL.ROOT}.${NS.PAGES.FRIENDS.MODAL.DESCRIPTION}`,
        )}
      </DrawerDescription>
      <div className="flex w-full flex-col items-center">
        <div className="relative mb-8 grid w-full grid-cols-3 gap-2">
          {friendsShopItems.map((card, index) => {
            const staticCardData = CARDS[index];

            return (
              <Card
                key={`buy_friends_card_${index}`}
                collectButtonProps={{
                  color: staticCardData.buttonColor,
                  children: staticCardData.buttonText,
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
                  {t(
                    `${NS.PAGES.FRIENDS.MODAL.ROOT}.${NS.PAGES.FRIENDS.MODAL.FRIENDS}`,
                    { number: card.amount },
                  )}
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
          isLoading={isPending || isStarsPaymentLoading}
          onClick={() => buyFriendsFn(selectedCard?.price ?? 0)}
        >
          {t(NS.PAGES.FRIENDS.GET_FRIENDS)}
        </PrimaryButton>
      </div>
    </DrawerContent>
  );
};
