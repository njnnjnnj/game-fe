import { ASSIGNMENTS_ICONS } from "./constants";

export enum RewardType {
  COIN = "coins",
  CHEST = "chest",
}

type Reward = {
  type: RewardType;
  count: number;
};

export enum AssignmentType {
  DAILY = "DAILY",
  ONE_OFF = "ONE_OFF",
}

export type AssignmentListItem = {
  id: string;
  icon: keyof typeof ASSIGNMENTS_ICONS;
  title: string;
  rewards: Reward[];
};
