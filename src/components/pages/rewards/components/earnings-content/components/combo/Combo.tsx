import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import LockSvg from "@/public/assets/svg/lock.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { DataStructure, EventNames } from "@/services/rewards/types";
import { formatNumber } from "@/utils/number";

import { EVENTS_IMAGES, EVENTS_NAMES_TID } from "../events/constants";

type Props = {
  isAnimated: boolean;
  cards: DataStructure;
};

export const Combo: FunctionComponent<Props> = ({ cards }) => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);

  return (
    <div
      className={classNames(
        "relative mb-4 flex w-full flex-col items-center justify-between gap-3 rounded-2xl bg-blue-700 p-3 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]",
      )}
    >
      <div className="combo-border-radius relative w-full bg-white/5 px-3 py-2">
        <span className="text-stroke-1 text-sm font-black leading-none tracking-[0.04em] text-white text-shadow-sm">
          {t(NS.PAGES.REWARDS.COMBO)}
        </span>
        <div
          className={classNames(
            "absolute right-0 top-0 h-full rounded-full border border-solid border-black bg-[#0655A4] pb-0.5",
          )}
        >
          <div className="flex h-full w-full items-center rounded-full bg-[#0075FF] px-4 py-1.5 shadow-inset-btn">
            <div className="text-stroke-half grid grid-cols-[16px_1fr] items-center gap-1 text-xs font-extrabold text-white text-shadow-sm">
              <StarSVG className="size-4" />+{formatNumber(3000000)}
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-3 items-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <div
            className={classNames(
              "relative flex aspect-square w-full items-center justify-center rounded-lg p-3",
              {
                "after:absolute after:inset-0 after:z-10 after:rounded-lg after:bg-transparent after:shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]":
                  cards.daily[0],
              },
              {
                "bg-white/5": !cards.daily[0],
              },
            )}
          >
            {cards.daily[0] &&
              Object.keys(EventNames).includes(cards.daily[0]) && (
                <Image
                  src={EVENTS_IMAGES[cards.daily[0]]}
                  fill
                  alt=""
                  className="rounded-lg"
                />
              )}
            {!cards.daily[0] && <LockSvg className="size-8 fill-white/30" />}
          </div>
          <span className="text-sm font-black text-[#F0F2F5]">
            {cards.daily[0] ? (
              t(EVENTS_NAMES_TID[cards.daily[0]])
            ) : (
              <span className="text-xs font-semibold text-[#F0F2F5]/30">?</span>
            )}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className={classNames(
              "relative flex aspect-square w-full items-center justify-center rounded-lg p-3",
              {
                "after:absolute after:inset-0 after:z-10 after:rounded-lg after:bg-transparent after:shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]":
                  cards.daily[1],
              },
              {
                "bg-white/5": !cards.daily[1],
              },
            )}
          >
            {cards.daily[1] &&
              Object.keys(EventNames).includes(cards.daily[1]) && (
                <Image
                  src={EVENTS_IMAGES[cards.daily[1]]}
                  fill
                  alt=""
                  className="rounded-lg"
                />
              )}
            {!cards.daily[1] && <LockSvg className="size-8 fill-white/30" />}
          </div>
          <span className="text-sm font-black text-[#F0F2F5]">
            {cards.daily[1] ? (
              t(EVENTS_NAMES_TID[cards.daily[1]])
            ) : (
              <span className="text-xs font-semibold text-[#F0F2F5]/30">?</span>
            )}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className={classNames(
              "relative flex aspect-square w-full items-center justify-center rounded-lg p-3",
              {
                "after:absolute after:inset-0 after:z-10 after:rounded-lg after:bg-transparent after:shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]":
                  cards.daily[2],
              },
              {
                "bg-white/5": !cards.daily[2],
              },
            )}
          >
            {cards.daily[2] &&
              Object.keys(EventNames).includes(cards.daily[2]) && (
                <Image
                  src={EVENTS_IMAGES[cards.daily[2]]}
                  fill
                  alt=""
                  className="rounded-lg"
                />
              )}
            {!cards.daily[2] && <LockSvg className="size-8 fill-white/30" />}
          </div>
          <span className="text-sm font-black text-[#F0F2F5]">
            {cards.daily[2] ? (
              t(EVENTS_NAMES_TID[cards.daily[2]])
            ) : (
              <span className="text-xs font-semibold text-[#F0F2F5]/30">?</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
