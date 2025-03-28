/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createElement, FunctionComponent, useRef } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useSafeCoinsPayment } from "@/hooks/useSafeCoinsPayment";
import { useSafeStarsPayment } from "@/hooks/useSafeStarsPayment";
import HourIncomeSvg from "@/public/assets/svg/heroes/hour-income-coin.svg";
import LockSvg from "@/public/assets/svg/lock.svg";
import {
  Currency,
  EventNames,
  EventRequirement,
  Requirement,
} from "@/services/rewards/types";
import { formatValue } from "@/utils/lib/utils";

import { PreparedCard, PreparedEvent } from "../../types";

import {
  EVENTS_IMAGES,
  EVENTS_NAMES_TID,
  MAX_LEVEL_CARD,
  PRICE_CURRENCY_ICON,
} from "./constants";

type Props = {
  appsCards: (PreparedCard | PreparedEvent)[];
  onUpgradeCard: (name: string, index: number) => void;
  indexLoading: number | null;
  onOutOfFriends: () => void;
};

export const Events: FunctionComponent<Props> = ({
  appsCards,
  onUpgradeCard,
  indexLoading,
  onOutOfFriends,
}) => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const { profile } = useTelegram();
  const selectedCardRef = useRef<{
    card: PreparedCard | PreparedEvent;
    index: number;
  } | null>(null);

  const { buy: buyForStars, isStarsPaymentLoading } = useSafeStarsPayment(
    () => {
      if (selectedCardRef.current?.card) {
        onUpgradeCard(
          selectedCardRef.current.card.name,
          selectedCardRef.current.index,
        );
      }

      selectedCardRef.current = null;
    },
    () => {
      if (selectedCardRef.current?.card) {
        onUpgradeCard(
          selectedCardRef.current.card.name,
          selectedCardRef.current.index,
        );
      }

      selectedCardRef.current = null;
    },
  );

  const buyForCoins = useSafeCoinsPayment(() => {
    if (selectedCardRef.current?.card) {
      onUpgradeCard(
        selectedCardRef.current.card.name,
        selectedCardRef.current.index,
      );
    }

    selectedCardRef.current = null;
  });

  const onUpgradeClick = (
    card: PreparedCard | PreparedEvent,
    index: number,
  ) => {
    selectedCardRef.current = { card, index };

    if (card.currency === Currency.FRIENDS) {
      if ((profile?.friends ?? 0) < card.price) {
        onOutOfFriends();
        return;
      } else {
        onUpgradeCard(card.name, index);
      }
    } else if (card.currency === Currency.COINS) {
      buyForCoins(card.price);
    } else if (card.currency === Currency.STARS) {
      buyForStars(card.price);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-stroke-1 text-nowrap text-2xl font-black tracking-[0.04em] text-white text-shadow-sm">
        {t(`${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.TITLE}`)}
      </div>
      <div className="grid gap-3">
        {appsCards.map((card, index) => {
          const { name, level, profit, need, price, isValid, currency } = card;
          const isEventRequirement = (
            need: EventRequirement | Requirement | null,
          ): need is EventRequirement => {
            return (
              need !== null && "need_card" in need && "need_lvl_card" in need
            );
          };

          return (
            <div
              key={name}
              className="relative z-10 grid w-full max-w-[calc(100vw_-_2rem)] grid-cols-[1fr_104px] items-center justify-between gap-2 rounded-2xl bg-blue-700 p-2 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]"
            >
              {currency === "stars" && (
                <div className="absolute -left-1 -top-1 z-40 rounded-full bg-gradient-to-b from-[#F7DE2D] via-[#FABD25] to-[#FD9F1E] px-[7px] py-[5px] text-sm font-semibold text-white">
                  VIP
                </div>
              )}
              <div className="grid grid-cols-[60px_1fr] items-center gap-3">
                <div
                  className={classNames(
                    "size-15.5 relative flex items-center justify-center rounded-xl p-1.5",
                    "after:absolute after:inset-0 after:z-10 after:rounded-xl after:bg-transparent after:shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]",
                  )}
                >
                  <Image
                    className="rounded-xl"
                    src={EVENTS_IMAGES[name as EventNames]}
                    fill
                    alt=""
                    sizes="60px"
                    loading="eager"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-stroke-1 text-sm font-black text-white text-shadow-sm">
                    {t(EVENTS_NAMES_TID[name as EventNames])}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="self-start rounded-full bg-white/10 px-3 py-[5px] text-xs font-semibold text-gray-550">
                      {t(
                        `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.LEVEL}`,
                        { level },
                      )}
                    </span>
                    <div
                      className={classNames(
                        "text-yellow flex items-center gap-1 text-xs font-semibold text-white",
                        {
                          "!text-x !text-[#02DB07]": level === MAX_LEVEL_CARD,
                        },
                      )}
                    >
                      {level !== MAX_LEVEL_CARD ? (
                        <>
                          <HourIncomeSvg className="size-4" /> +
                          {formatValue(profit)}
                        </>
                      ) : (
                        t(NS.PAGES.REWARDS.MAX_CARD_LEVEL)
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {!isValid ? (
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <LockSvg className="size-4 fill-white/30" />
                  <span className="text-center text-x font-medium text-white/30">
                    {t(
                      `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.NEED_CARD}`,
                      {
                        card: isEventRequirement(need)
                          ? t(EVENTS_NAMES_TID[need.need_card as EventNames])
                          : "",
                        level: isEventRequirement(need)
                          ? need.need_lvl_card
                          : "",
                      },
                    )}
                  </span>
                </div>
              ) : level !== MAX_LEVEL_CARD ? (
                <div className="pointer-events-auto w-26">
                  <PrimaryButton
                    isLoading={indexLoading === index || isStarsPaymentLoading}
                    size="small"
                    color={currency === "stars" ? "yellow" : "primary"}
                    className="text-stroke-1 text-sm font-extrabold text-shadow-sm"
                    onClick={() => onUpgradeClick(card, index)}
                    disabled={
                      currency === Currency.COINS
                        ? (profile?.coins ?? 0) < price
                        : false
                    }
                  >
                    <div className="text-stroke-half grid grid-cols-[16px_1fr] items-center gap-1 text-sm font-extrabold text-white text-shadow-sm">
                      {createElement(PRICE_CURRENCY_ICON[currency], {
                        className: "size-4",
                      })}
                      {formatValue(price)}
                    </div>
                  </PrimaryButton>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
