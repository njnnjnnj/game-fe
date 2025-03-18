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
import { LeaderboardEnum } from "@/services/leaderboard/types";
import { League } from "@/services/profile/types";

import { RewardListItem } from "./components/reward-list-item/RewardListItem";
import { getModalDescription, getModalRewards, getModalTitle } from "./helpers";

type Props = {
  league: League;
  leaderboard: LeaderboardEnum;
};

export const RewardsModal: FunctionComponent<Props> = ({
  league,
  leaderboard,
}) => {
  const t = useTranslations(NS.PAGES.TOP_PLAYERS.ROOT);

  return (
    <DrawerContent
      className={classNames(
        "flex w-full flex-col items-center rounded-t-3xl border-[2px] border-b-0 border-white/10 bg-top-players-modal-pattern px-4 pb-8 pt-14",
      )}
    >
      <DrawerClose
        asChild
        className="absolute right-4 top-4 z-50 flex size-8 items-center justify-center rounded-full"
      >
        <CloseIcon />
      </DrawerClose>
      <div className="relative">
        <UnionIcon className="mb-6" />
        <DiamondIcon className="absolute left-1/2 top-[5px] size-[100px] -translate-x-1/2 drop-shadow-union" />
      </div>
      <DrawerTitle className="!text-stroke-2 mb-3 whitespace-pre-wrap text-center !text-2xl !font-black uppercase !tracking-wide text-white !text-shadow">
        {t(getModalTitle(leaderboard, league))}
      </DrawerTitle>
      <DrawerDescription className="mb-4 px-8 text-center text-sm font-medium tracking-wide text-white">
        {t(getModalDescription(leaderboard, league))}
      </DrawerDescription>
      <div className="flex w-full flex-col gap-2 rounded-[20px] bg-black/30 px-2 py-3 shadow-leaderbord-list-pattern">
        {getModalRewards(leaderboard, league).map((reward, index) => (
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
    </DrawerContent>
  );
};
