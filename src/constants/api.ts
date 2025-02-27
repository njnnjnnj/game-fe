export const API_ENDPOINTS = {
  API: {
    LOGIN: "/api/login",
  },
  GET: {
    GET_PROFILE: "/get_profile",
    GET_OFFLINE_REWARD: "/get_offline_reward",
    CONFIRM_GET_OFFLINE_REWARD: "/confirm_get_offline_reward",
    GET_TASKS: "/get_tasks",
    GET_BOOSTERS: "/get_boosters",
    CLICKER: "/clicker",
    GET_BATTLEPASS: "/get_battlepass",
    GET_BATTLEPASS_CONFIG: "/get_battlepass_config",
    GET_REFERALS: "/get_referals",
    GET_REWARDS_EARN: "/get_referals_earn",
    GET_DAILY_INFO: "/get_daily_info",
    GET_DAILY_REWARD: "/get_daily_reward",
    GET_CHARACTER: "/get_character",
    GET_ALL_CHARACTERS: "/get_all_characters",
    GET_ALL_APPS_CHARACTERS: "/get_all_apps_characters",
    USE_FULL_BOOSTER: "/use_full_booster",
    USE_TEMP_ENERGY_BOOSTER: "/use_temp_energy_booster",
    UPGRADE_BOOSTER: "/upgrade_booster",
    GET_HERO: "/get_character",
    GET_ALL_HEROES: "/get_all_characters",
    GET_ALL_APPS_HEROES: "/get_all_apps_characters",
    GET_SHOP: "/get_shop",
    GET_ALL_APPS_CARDS: "/get_all_apps_cards",
    GET_CARDS: "/get_cards",
    GET_CLOTH_HERO: "/get_cloth_character",
    GET_ALL_HEROES_WITH_CLOTH: "/get_all_characters_with_cloth",
    LEADERBOARD: "/leaderboard",
    GET_BANDIT: "/get_bandit",
    DELETE_WALLET: "/delete_wallet",
    GET_STARS_INFO: "/get_stars_info",
  },
  POST: {
    AUTH: "/auth",
    UPGRADE_CARD: "/upgrade_card",
    SET_TASK_COMPLETE: "/set_task_complete",
    GET_REWARD_FROM_BATTLEPASS: "/get_reward_from_battlepass",
    STARS_PAYMENT: "/stars_payment",
    SHOP_BUY: "/shop_buy",
    SET_HERO: "/set_character",
    BUY_HERO: "/buy_character",
    SET_CLOTH: "/set_cloth_character",
    BUY_CLOTH: "/buy_cloth_character",
    PLAY_BANDIT: "/bandit_play",
    PLAY_BANDIT_JACKPOT: "/bandit_jackpot_play",
    SET_WALLET: "/set_wallet",
    CLICKER: "/clicker",
  },
};

export const AUTH_COOKIE_TOKEN = "authToken";

export const STALE_TIME = 1000 * 60 * 60;

export const DEFAULT_COUNT_TOP_PLAYERS = 15;
