import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import { HSTitleBoard } from "@/components/hs-shared";
import { NS } from "@/constants/ns";

import { ClothList } from "./components/cloth-list/ClothList";
import { Inventory } from "./components/inventory/Inventory";

export const ClothView: FunctionComponent = () => {
  const t = useTranslations(NS.PAGES.SHOP_CLOTHES.ROOT);

  return (
    <div className="relative flex grow flex-col">
      <HSTitleBoard
        className="absolute inset-x-0 -top-11 mx-auto"
        title={t(NS.PAGES.SHOP_CLOTHES.TITLE)}
      />
      <Inventory />
      <ClothList />
    </div>
  );
};
