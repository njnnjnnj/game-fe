import {
  Currency,
  EventRequirement,
  Requirement,
} from "@/services/rewards/types";

export type PreparedCard = {
  name: string;
  level: number;
  profit: number;
  need: Requirement;
  price: number;
  isValid: boolean;
  currency: Currency;
};

export type PreparedEvent = {
  name: string;
  level: number;
  profit: number;
  need: EventRequirement | null;
  price: number;
  isValid: boolean;
  currency: Currency;
};
