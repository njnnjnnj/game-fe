import React, { useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import { toast } from "sonner";

import { InviteModal } from "@/components/pages/friends/components/invite-modal/InviteModal";
import { Drawer } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { invalidateProfileQuery } from "@/services/profile/queries";
import { useUpgradeCard } from "@/services/rewards/queries";
import { DataStructure, Events as EventsType } from "@/services/rewards/types";
import { useGetShop } from "@/services/shop/queries";
import { ShopItemTypeEnum } from "@/services/shop/types";
import { useQueryClient } from "@tanstack/react-query";

import { Combo } from "./components/combo/Combo";
import { Events } from "./components/events/Events";
import { mergeCards, prepareCards, prepareEvents } from "./helpers";

type Props = {
  isActive: boolean;
  cards: DataStructure;
  appsCards: EventsType;
};

export const EarningsContent = ({ isActive, cards, appsCards }: Props) => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const queryClient = useQueryClient();
  const { mutate: upgradeCard } = useUpgradeCard(queryClient);
  const [indexLoading, setIndexLoading] = useState<null | number>(null);
  const preparedCards = useMemo(() => prepareCards(cards.cards), [cards.cards]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetShop();
  const friendsShopItems = useMemo(
    () => data?.items.filter((item) => item.type === ShopItemTypeEnum.FRIENDS),
    [data],
  );

  const preparedEvents = useMemo(
    () => prepareEvents(appsCards, preparedCards),
    [appsCards, preparedCards],
  );

  const mergedCards = useMemo(
    () => mergeCards(preparedEvents, preparedCards),
    [preparedCards, preparedEvents],
  );

  const handleUpgradeCard = (name: string, index: number) => {
    setIndexLoading(index);
    upgradeCard(name, {
      onSuccess: () => {
        invalidateProfileQuery(queryClient);
        toast(
          <Toast
            type="done"
            text={t(
              `${NS.PAGES.REWARDS.EARNINGS.ROOT}.${NS.PAGES.REWARDS.EARNINGS.CARD_UPDATED}`,
            )}
          />,
        );
      },
      onError: () => {
        toast(
          <Toast
            type="destructive"
            text={t(
              `${NS.PAGES.REWARDS.EARNINGS.ROOT}.${NS.PAGES.REWARDS.EARNINGS.ERROR_CARD_UPDATED}`,
            )}
          />,
        );
      },
      onSettled: () => {
        setIndexLoading(null);
      },
    });
  };

  return (
    <div
      aria-roledescription={isActive ? "slide-content" : undefined}
      className="mx-4 mb-6 flex flex-col gap-[30px]"
    >
      <Combo isAnimated={isActive} cards={cards} />
      <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Events
          appsCards={mergedCards}
          onUpgradeCard={handleUpgradeCard}
          indexLoading={indexLoading}
          onOutOfFriends={() => setIsModalOpen(true)}
        />
        <InviteModal
          friendsShopItems={friendsShopItems || []}
          onClose={() => setIsModalOpen(false)}
        />
      </Drawer>
    </div>
  );
};
