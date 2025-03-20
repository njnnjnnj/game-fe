import { NS } from "@/constants/ns";
import { League } from "@/services/profile/types";

export const LEAGUES = {
  [League.BRONZE]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.BRONZE_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 350, type: "stars" },
      { rank: 2, description: "2", value: 200, type: "stars" },
      { rank: 3, description: "3", value: 150, type: "stars" },
      { rank: "4+", description: "4-10", value: 5500, type: "coins" },
    ],
  },
  [League.SILVER]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.SILVER_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 450, type: "stars" },
      { rank: 2, description: "2", value: 225, type: "stars" },
      { rank: 3, description: "3", value: 165, type: "stars" },
      { rank: "4+", description: "4-10", value: 6500000, type: "coins" },
    ],
  },
  [League.GOLD]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.GOLD_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 500, type: "stars" },
      { rank: 2, description: "2", value: 250, type: "stars" },
      { rank: 3, description: "3", value: 175, type: "stars" },
      { rank: "4+", description: "4-10", value: 7000000, type: "coins" },
    ],
  },
  [League.PLATINUM]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.PLATINUM_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 650, type: "stars" },
      { rank: 2, description: "2", value: 270, type: "stars" },
      { rank: 3, description: "3", value: 200, type: "stars" },
      { rank: "4+", description: "4-10", value: 7500000, type: "coins" },
    ],
  },
  [League.BRILLIANT]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.BRILLIANT_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 750, type: "stars" },
      { rank: 2, description: "2", value: 350, type: "stars" },
      { rank: 3, description: "3", value: 250, type: "stars" },
      { rank: "4+", description: "4-10", value: 8500000, type: "coins" },
    ],
  },
  [League.BILLIARD]: {
    TITLE_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.BILLIARD_LEAGUE}`,
    DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
    REWARDS: [
      { rank: 1, description: "1", value: 5000, type: "stars" },
      { rank: 2, description: "2", value: 3000, type: "stars" },
      { rank: 3, description: "3", value: 1300, type: "stars" },
      { rank: "4+", description: "4-10", value: 650, type: "coins" },
    ],
  },
};

export const TOP_FRIENDS = {
  TITLE_TID: NS.PAGES.TOP_PLAYERS.FRIENDS_TOP,
  DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
  REWARDS: [
    { rank: 1, description: "1", value: 10000, type: "stars" },
    { rank: 2, description: '2', value: 7500, type: "stars" },
    { rank: 3, description: '3', value: 5000, type: "stars" },
  ]
}

export const WORLD_TOP = {
  TITLE_TID: NS.PAGES.TOP_PLAYERS.WORLD_TOP,
  DESCRIPTION_TID: `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.DESCRIPTION}`,
  REWARDS: [
    { rank: 1, description: "1", value: 15000, type: "stars" },
    { rank: 2, description: '2', value: 10000, type: "stars" },
    { rank: 3, description: '3', value: 4500, type: "stars" },
    { rank: "4+", description: "4-10", value: 1500, type: "stars" },
  ]
}
