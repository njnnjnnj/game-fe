import React from "react";

import { HSRoot } from "@/components/hs-shared";

import { HeroesGrid } from "./components/heroes-grid/HeroesGrid";
import { HeroesProfile } from "./components/heroes-profile/HeroesProfile";

export const Heroes = () => (
  <HSRoot wrapperClassName="flex flex-col pb-23">
    <HeroesProfile />
    <HeroesGrid />
  </HSRoot>
);
