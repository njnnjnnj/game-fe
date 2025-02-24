import React from "react";

import { HSRoot } from "@/components/hs-shared";

import { ClothView } from "./components/cloth-view/ClothView";
import { ShopProfile } from "./components/shop-profile/ShopProfile";

export const Shop = () => (
  <HSRoot wrapperClassName="flex flex-col">
    <ShopProfile />
    <ClothView />
  </HSRoot>
);
