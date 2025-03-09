/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createElement, FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import LockSvg from "@/public/assets/svg/lock.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import {
  EventNames,
  EventRequirement,
  Requirement,
} from "@/services/rewards/types";
import { formatValue } from "@/utils/lib/utils";
import { formatNumber } from "@/utils/number";

import { PreparedCard, PreparedEvent } from "../../types";

import { EVENTS_NAMES_TID, PRICE_CURRENCY_ICON } from "./constants";

type Props = {
  isAnimated: boolean;
  appsCards: (PreparedCard | PreparedEvent)[];
  onUpgradeCard: (name: string) => void;
  isPending?: boolean;
};

export const Events: FunctionComponent<Props> = ({
  appsCards,
  onUpgradeCard,
  isPending,
}) => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-stroke-1 text-nowrap text-2xl font-black tracking-[0.04em] text-white text-shadow-sm">
        {t(`${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.TITLE}`)}
      </div>
      <div className="grid gap-3">
        {appsCards.map(
          ({ name, level, profit, need, price, isValid, currency }) => {
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
                className="relative z-10 flex w-full max-w-[calc(100vw_-_2rem)] items-center justify-between gap-2 rounded-2xl bg-blue-700 p-3 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]"
              >
                <div className="grid grid-cols-[60px_1fr] items-center gap-3">
                  <div className="relative flex size-15 items-center justify-center rounded-lg bg-gradient-to-b from-[#FFE04E] to-[#F19F33] p-1.5 shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]">
                    {/* Placeholder for Image */}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-stroke-1 text-sm font-black text-white text-shadow-sm">
                      {t(EVENTS_NAMES_TID[name as EventNames])}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="self-start rounded-full bg-white/10 px-2.5 py-[5px] text-xs font-semibold text-gray-550">
                        {t(
                          `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.LEVEL}`,
                          { num: level },
                        )}
                      </span>
                      <div className="text-yellow flex items-center gap-1 text-xs font-semibold">
                        <StarSVG className="size-4" /> +{formatValue(profit)}
                      </div>
                    </div>
                  </div>
                </div>
                {!isValid ? (
                  <div className="flex w-30 flex-col items-center justify-center gap-2">
                    <LockSvg className="size-4 fill-white/30" />
                    <span className="text-center text-x font-medium text-white/30">
                      Нужна карта{" "}
                      {isEventRequirement(need) && (
                        <>
                          {t(EVENTS_NAMES_TID[need.need_card as EventNames])}{" "}
                          {need.need_lvl_card} уровня
                        </>
                      )}
                    </span>
                  </div>
                ) : (
                  <div className="pointer-events-auto w-26">
                    <PrimaryButton
                      isLoading={isPending}
                      size="small"
                      className="text-stroke-1 text-xs font-extrabold text-shadow-sm"
                      onClick={() => onUpgradeCard(name)}
                    >
                      <div className="text-stroke-half grid grid-cols-[16px_1fr] items-center gap-1 text-xs font-extrabold text-white text-shadow-sm">
                        {createElement(PRICE_CURRENCY_ICON[currency], {
                          className: "size-4",
                        })}
                        {formatNumber(price)}
                      </div>
                    </PrimaryButton>
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};
