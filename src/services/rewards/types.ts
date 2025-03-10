export enum RewardsStatusEnum {
  OK = "Ok",
}

export enum UpgradeBoosterType {
  CAPACITY = "capacity",
  RECOVERY = "recovery",
}

export interface IRewardsEarn {
  reward: number;
  status: RewardsStatusEnum;
}

export interface IDailyRewardInfo {
  combo: number;
  available: boolean;
}

export type FullBooster = {
  amount: number;
  nextRestore: number;
  fullRestore: number;
};

export type TempEnergyBooster = {
  amount: number;
  end: number;
};

export type CapacityBooster = {
  level: number;
  price: number;
  currence: string;
  current: number;
  new: number;
};

export type RecoveryBooster = {
  level: number;
  price: number;
  currence: string;
  current: number;
  new: number;
};

export interface IBoosters {
  full: FullBooster;
  temp_energy: TempEnergyBooster;
  capacity: CapacityBooster;
  recovery: RecoveryBooster;
}

export enum Currency {
  COINS = "coins",
  STARS = "stars",
  FRIENDS = "friends",
}

export enum EventNames {
  StarsBank = "StarsBank",
  OilCompany = "OilCompany",
  GreenEnergy = "GreenEnergy",
  ChargingStation = "ChargingStation",
  Psychologist = "Psychologist",
  SuccessfulTrading = "SuccessfulTrading",
  Barbershop = "Barbershop",
  Streamer = "Streamer",
  ComputerClub = "ComputerClub",
  GameCompany = "GameCompany",
  Shop = "Shop",
  FoodDelivery = "FoodDelivery",
  Restaurant = "Restaurant",
  EducationalCourses = "EducationalCourses",
  CyberSecurity = "CyberSecurity",
  Starlink = "Starlink",
  Startup = "Startup",
  ElecticalCommercy = "ElecticalCommercy", // Исправлена опечатка в названии
  SocialNetworks = "SocialNetworks", // Исправлена опечатка в названии
  Blogging = "Blogging",
  Podcaster = "Podcaster",
  OpinionLeader = "OpinionLeader",
  Conference = "Conference",
  Taxi = "Taxi", // Исправлена опечатка в названии
  Hotel = "Hotel",
  Autosalon = "Autosalon",
}

export interface EventRequirement {
  need_card: string | null;
  need_lvl_card: number | null;
  invite_friends: number | null;
}

interface Event {
  price: number;
  currency: Currency;
  earn: number;
  first_price_upgrade: number;
  always_price_upgrade: number;
  first_earn_upgrade: number;
  always_earn_upgrade: number;
  give_exp: number;
  first_give_exp_upgrade: number;
  always_give_exp_upgrade: number;
  need_for_open: EventRequirement | null;
}

export type Events = Record<string, Event>;

export interface Requirement {
  price: number;
  currency: Currency;
}

interface Card {
  level: number;
  profit: number;
  need: Requirement;
}

export type Cards = Record<string, Card>;

export interface DataStructure {
  cards: Cards;
  daily: (string | null)[];
}
