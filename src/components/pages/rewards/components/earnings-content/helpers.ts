import { Cards, Events } from "@/services/rewards/types";

import { MAX_LEVEL_CARD } from "./components/events/constants";
import { PreparedCard, PreparedEvent } from "./types";

export const prepareCards = (cards: Cards): PreparedCard[] => {
  return Object.entries(cards).map(([name, data]) => ({
    name,
    level: data.level,
    profit: data.profit,
    need: data.need,
    price: data.need.price,
    isValid: true,
    currency: data.need.currency,
  }));
};

export const prepareEvents = (
  appsCards: Events,
  preparedCards: ReturnType<typeof prepareCards>,
): PreparedEvent[] => {
  return Object.entries(appsCards).map(([name, data]) => {
    const needCardName = data.need_for_open?.need_card;
    const needCardLevel = data.need_for_open?.need_lvl_card;

    const findCard = preparedCards.find((card) => card.name === name);

    const isCardValid = needCardName
      ? preparedCards.some(
          (card) =>
            card.name === needCardName && card.level >= (needCardLevel || 0),
        )
      : true;

    return {
      name,
      level: findCard?.level ?? 0,
      profit: data.earn,
      need: data.need_for_open,
      price: data.price,
      isValid: isCardValid,
      currency: data.currency,
    };
  });
};

export const mergeCards = (
  preparedEvents: PreparedEvent[],
  preparedCards: PreparedCard[],
) => {
  return preparedEvents
    .map((event) => {
      const matchingCard = preparedCards.find(
        (card) => card.name === event.name,
      );
      return matchingCard || event;
    })
    .sort((a, b) => {
      const getPriority = (item: PreparedEvent | PreparedCard) => {
        if (item.isValid && item.level < MAX_LEVEL_CARD) return 2;
        if (item.level === MAX_LEVEL_CARD) return 1;
        return 0;
      };

      return getPriority(b) - getPriority(a);
    });
};
