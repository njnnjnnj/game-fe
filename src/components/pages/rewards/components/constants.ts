import { NS } from "@/constants/ns";

import { RewardsStatusEnum } from "../enums";

export const CARD_CAPTION = {
  [RewardsStatusEnum.AVAILABLE]: NS.PAGES.REWARDS.RECEIVED,
  [RewardsStatusEnum.UNAVAILABLE]: NS.PAGES.REWARDS.COUNT,
  [RewardsStatusEnum.CURRENT]: NS.PAGES.REWARDS.COLLECT,
};
