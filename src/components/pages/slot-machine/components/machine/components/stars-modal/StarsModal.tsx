import React, { FunctionComponent, useMemo } from "react";

import { RefillModal } from "@/components/pages/buy-stars/components/refill-modal/RefillModal";
import { useGetShop } from "@/services/shop/queries";
import { ShopItemTypeEnum } from "@/services/shop/types";

type Props = {
  onClose: () => void;
};

export const StarsModal: FunctionComponent<Props> = ({ onClose }) => {
  const { data } = useGetShop();

  const starsShopItems = useMemo(
    () => (data?.items ?? []).filter((item) => item.type === ShopItemTypeEnum.STARS),
    [data],
  );

  return (
    <RefillModal
      starsShopItems={starsShopItems}
      onClose={onClose}
    />
  );
};
