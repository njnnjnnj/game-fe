import { NS } from "@/constants/ns";
import { League } from "@/services/profile/types";

export const LEAGUES = {
  [League.BRONZE]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.BRONZE_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 3150 },
      { rank: 2, description: "2", value: 1890 },
      { rank: 3, description: "3", value: 800 },
      { rank: "4+", description: "4-10", value: 400 },
    ],
  },
  [League.SILVER]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.SILVER_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 3500 },
      { rank: 2, description: "2", value: 2100 },
      { rank: 3, description: "3", value: 900 },
      { rank: "4+", description: "4-10", value: 450 },
    ],
  },
  [League.GOLD]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.GOLD_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 3850 },
      { rank: 2, description: "2", value: 2310 },
      { rank: 3, description: "3", value: 1000 },
      { rank: "4+", description: "4-10", value: 500 },
    ],
  },
  [League.PLATINUM]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.PLATINUM_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 4200 },
      { rank: 2, description: "2", value: 2500 },
      { rank: 3, description: "3", value: 1100 },
      { rank: "4+", description: "4-10", value: 550 },
    ],
  },
  [League.BRILLIANT]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.BRILLIANT_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 4550 },
      { rank: 2, description: "2", value: 2730 },
      { rank: 3, description: "3", value: 1200 },
      { rank: "4+", description: "4-10", value: 600 },
    ],
  },
  [League.BILLIARD]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.BILLIARD_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 5000 },
      { rank: 2, description: "2", value: 3000 },
      { rank: 3, description: "3", value: 1300 },
      { rank: "4+", description: "4-10", value: 650 },
    ],
  },
};

export const TOP_FRIENDS = {
  TITLE_TID: NS.PAGES.TOP_PLAYERS.FRIENDS_TOP,
  DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
  REWARDS: [
    { rank: 1, description: "1", value: 10000 },
    { rank: 2, description: '2', value: 7500 },
    { rank: 3, description: '3', value: 5000 },
  ]
}

export const WORLD_TOP = {
  TITLE_TID: NS.PAGES.TOP_PLAYERS.WORLD_TOP,
  DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
  REWARDS: [
    { rank: 1, description: "1", value: 15000 },
    { rank: 2, description: '2', value: 10000 },
    { rank: 3, description: '3', value: 4500 },
    { rank: "4+", description: "4-10", value: 1500 },
  ]
}
