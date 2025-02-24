import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { NS } from "@/constants/ns";
import CloseIcon from "@/public/assets/svg/close.svg";
import DiamondIcon from "@/public/assets/svg/top-players/lightblue-shield.svg";
import UnionIcon from "@/public/assets/svg/top-players/union.svg";
import { League } from "@/services/profile/types";

import { RewardListItem } from "./components/reward-list-item/RewardListItem";
import { LEAGUES } from "./constants";

type Props = {
  league: League;
};

export const RewardsModal: FunctionComponent<Props> = ({ league }) => {
  const t = useTranslations(NS.PAGES.TOP_PLAYERS.ROOT);

  return (
    <DrawerContent
      className={classNames(
        "flex w-full flex-col items-center rounded-t-3xl border-0 bg-[#109BD8] pt-1.5 font-rubik shadow-modal-shadow",
      )}
    >
      <div className="flex h-full w-full flex-col items-center rounded-t-3xl bg-gradient-to-b from-[#44C2FD] to-[#00AEFF] px-4 pb-8 pt-6 shadow-[inset_0_2px_0_0_rgba(255,255,255,0.3)]">
        <DrawerClose
          asChild
          className="absolute right-4 top-4 z-50 flex size-8 items-center justify-center rounded-full"
        >
          <CloseIcon />
        </DrawerClose>
        <div className="relative">
          <UnionIcon className="mb-6" />
          <DiamondIcon className="drop-shadow-union absolute left-1/2 top-[5px] size-[100px] -translate-x-1/2" />
        </div>
        <DrawerTitle className="text-stroke-1 mb-2 text-2xl font-black uppercase tracking-wide text-white text-shadow">
          {t(LEAGUES[league].TITLE_TID)}
        </DrawerTitle>
        <DrawerDescription className="mb-4 px-8 text-center text-sm font-medium tracking-wide text-white">
          {t(LEAGUES[league].DESCRIPTION_TID)}
        </DrawerDescription>
        <div className="flex w-full flex-col gap-2 rounded-[20px] bg-[#0078B1] px-2 py-3 shadow-leaderbord-list-pattern">
          {LEAGUES[league].REWARDS.map((reward, index) => (
            <RewardListItem
              key={index}
              rank={reward.rank}
              description={t(
                `${NS.PAGES.TOP_PLAYERS.MODAL.ROOT}.${NS.PAGES.TOP_PLAYERS.MODAL.TOP}`,
                { num: reward.description },
              )}
              value={reward.value}
            />
          ))}
        </div>
      </div>
    </DrawerContent>
  );
};
