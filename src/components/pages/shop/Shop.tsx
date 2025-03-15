import React, { useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  OverscrollBehavior,
  PageWrapper,
  ProfileHeader,
  StarterKitModal,
} from "@/components/common";
import { SpecialOfferModal } from "@/components/common";
import { RewardScreen } from "@/components/common/reward-screen/RewardScreen";
import { Drawer } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useSafeStarsPayment } from "@/hooks/useSafeStarsPayment";
import {
  invalidateProfileQuery,
  invalidateReferralQuery,
} from "@/services/profile/queries";
import { useBuyShopItem, useGetShop } from "@/services/shop/queries";
import { IBoughtItem, ShopItem, ShopItemTypeEnum } from "@/services/shop/types";
import { ChestType, RewardShape } from "@/types/rewards";
import { NotificationEnum } from "@/types/telegram";
import { boughtItemToChestReward } from "@/utils/rewards";
import { useQueryClient } from "@tanstack/react-query";

import { AutoCollect } from "./components/auto-collect/AutoCollect";
import { BaseModal } from "./components/base-modal/BaseModal";
import { Chests } from "./components/chests/Chests";
import { Friends } from "./components/friends/Friends";
import { SpecialOffer } from "./components/special-offer/SpecialOffer";
import { Stars } from "./components/stars/Stars";
import { StarterKit } from "./components/starter-kit/StarterKit";

export const Shop = () => {
  const queryClient = useQueryClient();
  const t = useTranslations(NS.PAGES.SHOP.ROOT);
  const tErrors = useTranslations(NS.ERRORS.ROOT);
  const { data: shopData, isLoading } = useGetShop();
  const [selectedCard, setSelectedCard] = useState<ShopItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [reward, setReward] = useState<RewardShape | null>(null);
  const { handleNotificationOccurred, handleSelectionChanged } =
    useHapticFeedback();
  const { mutate, isPending } = useBuyShopItem();

  const { buy: buyItemFn, isStarsPaymentLoading } = useSafeStarsPayment(
    () => {
      handleBuyItem();
    },
    () => {
      handleBuyItem();
    },
  );

  const handleBuyItem = () => {
    if (selectedCard === null) {
      handleNotificationOccurred(NotificationEnum.ERROR);
    } else {
      handleSelectionChanged();
    }

    if (selectedCard === null) return;

    mutate(selectedCard.id, {
      onSuccess: (response: IBoughtItem) => {
        invalidateReferralQuery(queryClient);
        invalidateProfileQuery(queryClient);
        setIsDrawerOpen(false);

        if (response.coffer) {
          let chestType = selectedCard.value as ChestType;

          if (
            selectedCard.type === ShopItemTypeEnum.SPECIAL ||
            selectedCard.type === ShopItemTypeEnum.STARTER_PACK
          ) {
            chestType = ChestType.MEGA;
          }

          setReward(boughtItemToChestReward(response, chestType));
        } else {
          toast(
            <Toast type="done" text={t(NS.PAGES.SHOP.BOUGHT_SUCCESSFULLY)} />,
          );
        }
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const tid = error.response?.data["detail"];

          toast(<Toast type="destructive" text={tErrors(tid)} />);
        }
      },
    });
  };

  const starterKitShopItems = useMemo(
    () =>
      shopData?.items.find(
        (item) => item.type === ShopItemTypeEnum.STARTER_PACK,
      ),
    [shopData],
  );

  const specialOfferShopItem = useMemo(
    () =>
      shopData?.items.find((item) => item.type === ShopItemTypeEnum.SPECIAL),
    [shopData],
  );

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
      shopData?.items.filter(
        (item) => item.type === ShopItemTypeEnum.OFFLINE_BONUS,
      ),
    [shopData],
  );

  const handleSelectCard = (card: ShopItem) => {
    if (!card) return;

    setSelectedCard(card);
    setIsDrawerOpen(true);
  };

  const renderModal = () => {
    if (!selectedCard) return null;

    if (selectedCard.id === 1 && specialOfferShopItem) {
      return (
        <SpecialOfferModal
          shopItem={specialOfferShopItem}
          onSubmit={() => buyItemFn(specialOfferShopItem.price)}
          isLoading={isPending || isStarsPaymentLoading}
        />
      );
    }

    if (selectedCard.id === 2 && starterKitShopItems) {
      return (
        <StarterKitModal
          shopItem={starterKitShopItems}
          isLoading={isPending || isStarsPaymentLoading}
          onSubmit={() => buyItemFn(starterKitShopItems.price)}
        />
      );
    }

    return (
      <BaseModal
        selectedItem={selectedCard}
        isLoading={isPending || isStarsPaymentLoading}
        onSubmit={() => buyItemFn(selectedCard?.price ?? 0)}
      />
    );
  };

  return (
    <PageWrapper
      isLoading={isLoading}
      overscrollBehaviour={OverscrollBehavior.NONE}
    >
      {!reward && (
        <>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <div className="relative w-full pb-23">
              <div className="pointer-events-none fixed inset-0 -z-[1] bg-[url('/assets/png/shop/bg.webp')] bg-[length:100%] bg-center-top bg-no-repeat" />
              <ProfileHeader className="my-5 w-full" />
              <div className="w-full px-4">
                {specialOfferShopItem && (
                  <SpecialOffer
                    onClick={() => handleSelectCard(specialOfferShopItem)}
                  />
                )}
                {starterKitShopItems && (
                  <StarterKit
                    onClick={() => handleSelectCard(starterKitShopItems)}
                  />
                )}
                <Chests
                  cards={chestsShopItems ?? []}
                  onSelect={handleSelectCard}
                />
                <Stars
                  cards={starsShopItems ?? []}
                  onSelect={handleSelectCard}
                />
                <Friends
                  cards={friendsShopItems ?? []}
                  onSelect={handleSelectCard}
                />
                <AutoCollect
                  cards={autoCollectShopItems ?? []}
                  onSelect={handleSelectCard}
                />
              </div>
            </div>
            {renderModal()}
          </Drawer>
        </>
      )}
      {reward && (
        <RewardScreen reward={reward} onFinish={() => setReward(null)} />
      )}
    </PageWrapper>
  );
};
