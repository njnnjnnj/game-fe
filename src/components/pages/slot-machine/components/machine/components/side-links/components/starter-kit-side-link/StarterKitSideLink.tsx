import React, { FunctionComponent, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import { AxiosError } from "axios";
import { toast } from "sonner";

import { SideLink, StarterKitModal } from "@/components/common";
import { Drawer } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import TicketImage from "@/public/assets/png/home/ticket.webp";
import {
  invalidateProfileQuery,
  invalidateReferralQuery,
} from "@/services/profile/queries";
import { useBuyShopItem, useGetShop } from "@/services/shop/queries";
import { IBoughtItem, ShopItem, ShopItemTypeEnum } from "@/services/shop/types";
import { ChestType, RewardShape } from "@/types/rewards";
import { boughtItemToChestReward } from "@/utils/rewards";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  setReward: (reward: RewardShape) => void;
};

export const StarterKitSideLink: FunctionComponent<Props> = ({ setReward }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations(NS.PAGES.HOME.ROOT);
  const tShop = useTranslations(NS.PAGES.SHOP.ROOT);
  const tErrors = useTranslations(NS.ERRORS.ROOT);
  const { mutate: buyShopItem, isPending: buyShopItemPending } =
    useBuyShopItem();
  const { data: shopItems } = useGetShop();
  const starterKitShopItems = useMemo(
    () =>
      shopItems?.items.find(
        (item) => item.type === ShopItemTypeEnum.STARTER_PACK,
      ),
    [shopItems],
  );

  const handleBuyShopItem = (id: number, shopItem: ShopItem) => {
    buyShopItem(id, {
      onSuccess: (response: IBoughtItem) => {
        invalidateReferralQuery(queryClient);
        invalidateProfileQuery(queryClient);
        setIsModalOpen(false);

        if (response.coffer) {
          setReward(
            boughtItemToChestReward(response, shopItem.value as ChestType),
          );
        } else {
          toast(
            <Toast
              type="done"
              text={tShop(NS.PAGES.SHOP.BOUGHT_SUCCESSFULLY)}
            />,
          );
        }
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const tid = error.response?.data["detail"];

          toast(
            <Toast
              type="destructive"
              text={tid ? tErrors(tid) : "Unknown error"}
            />,
          );
        }
      },
    });
  };

  return (
    <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
      <SideLink
        image={TicketImage}
        text={t(
          `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.ACTION}`,
        )}
        onClick={() => setIsModalOpen(true)}
        isFullSize
      />

      {starterKitShopItems && (
        <StarterKitModal
          isLoading={buyShopItemPending}
          onSubmit={() =>
            handleBuyShopItem(starterKitShopItems?.id, starterKitShopItems)
          }
          shopItem={starterKitShopItems}
        />
      )}
    </Drawer>
  );
};
