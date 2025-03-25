import React, { FunctionComponent, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import { AxiosError } from "axios";
import { toast } from "sonner";

import { SideLink, StarterKitModal } from "@/components/common";
import { Drawer } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useSafeStarsPayment } from "@/hooks/useSafeStarsPayment";
import TicketImage from "@/public/assets/png/home/ticket.webp";
import {
  invalidateProfileQuery,
  invalidateReferralQuery,
} from "@/services/profile/queries";
import { useBuyShopItem, useGetShop } from "@/services/shop/queries";
import { IBoughtItem, ShopItemTypeEnum } from "@/services/shop/types";
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
  const starterKitShopItem = useMemo(
    () =>
      shopItems?.items.find(
        (item) => item.type === ShopItemTypeEnum.STARTER_PACK,
      ),
    [shopItems],
  );

  const handleBuyShopItem = () => {
    if (!starterKitShopItem) return;

    buyShopItem(starterKitShopItem.id, {
      onSuccess: (response: IBoughtItem) => {
        invalidateReferralQuery(queryClient);
        invalidateProfileQuery(queryClient);
        setIsModalOpen(false);

        if (response.coffer) {
          setReward(boughtItemToChestReward(response, ChestType.MEGA));
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

  const { buy: buyItemFn, isStarsPaymentLoading } = useSafeStarsPayment(
    () => {
      handleBuyShopItem();
    },
    () => {
      handleBuyShopItem();
    },
  );

  return (
    <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
      <SideLink
        imageClassnames="!scale-[1.15]"
        image={TicketImage}
        text={t(
          `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.ACTION}`,
        )}
        onClick={() => setIsModalOpen(true)}
        isFullSize
      />

      {starterKitShopItem && (
        <StarterKitModal
          isLoading={buyShopItemPending || isStarsPaymentLoading}
          onSubmit={() => buyItemFn(starterKitShopItem.price)}
          shopItem={starterKitShopItem}
        />
      )}
    </Drawer>
  );
};
