import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { GetRewardCard } from "@/components/common/get-reward-card/GetRewardCard";
import { RewardsStatusEnum } from "@/components/pages/rewards/enums";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { IDailyRewardInfo } from "@/services/rewards/types";
import { RewardShape } from "@/types/rewards";
import { NotificationEnum } from "@/types/telegram";
import { ImpactStyleEnum } from "@/types/telegram";
import { formatValue } from "@/utils/lib/utils";
import { UseMutateFunction } from "@tanstack/react-query";

import { CARD_CAPTION } from "../constants";

import { REWARDS, RewardTypeEnum } from "./reward.data";

type Props = {
  dailyRewardInfo: IDailyRewardInfo;
  isActive: boolean;
  onCollectReward: UseMutateFunction<RewardShape, Error, void, unknown>;
};

export const RewardsContent: FunctionComponent<Props> = ({
  isActive,
  dailyRewardInfo,
  onCollectReward,
}) => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const { handleNotificationOccurred, handleImpactOccurred } =
    useHapticFeedback();

  const handleClick = (status: RewardsStatusEnum) => {
    try {
      if (status === RewardsStatusEnum.AVAILABLE) {
        handleImpactOccurred(ImpactStyleEnum.SOFT);
      } else if (status === RewardsStatusEnum.CURRENT) {
        handleImpactOccurred(ImpactStyleEnum.LIGHT);
      } else {
        handleNotificationOccurred(NotificationEnum.ERROR);
      }

      if (status === RewardsStatusEnum.CURRENT) {
        onCollectReward();
      }
    } catch {}
  };

  const getStatusForDay = (dayIndex: number) => {
    const { combo, available } = dailyRewardInfo;

    if (dayIndex < combo) {
      return RewardsStatusEnum.AVAILABLE;
    } else if (dayIndex === combo) {
      return available
        ? RewardsStatusEnum.CURRENT
        : RewardsStatusEnum.AVAILABLE;
    } else {
      return RewardsStatusEnum.UNAVAILABLE;
    }
  };

  return (
    <div
      aria-roledescription={isActive ? "slide-content" : undefined}
      className="relative mx-4 flex flex-col gap-4"
    >
      <div className="grid grid-cols-4 gap-2 pb-26">
        {REWARDS.map((item, index) => {
          const status = getStatusForDay(index + 1);

          return (
            <GetRewardCard
              key={index}
              status={status}
              isAnimated={status !== RewardsStatusEnum.UNAVAILABLE && isActive}
              isActive={isActive}
              caption={
                status === RewardsStatusEnum.UNAVAILABLE
                  ? item.time && item.type === RewardTypeEnum.ENERGY_BOOSTER
                    ? t(NS.PAGES.REWARDS.TIMER, { time: item.time })
                    : item.type !== RewardTypeEnum.COINS &&
                        item.type !== RewardTypeEnum.ENERGY_BOOSTER
                      ? t(NS.PAGES.REWARDS.COUNT, { num: item.amount })
                      : `x${formatValue(item.amount)}`
                  : t(CARD_CAPTION[status])
              }
              onClick={() => handleClick(status)}
            >
              <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden p-2">
                <span
                  className={classNames(
                    "text-stroke-1 text-nowrap text-x font-extrabold text-shadow-sm",
                  )}
                >
                  {t(NS.PAGES.REWARDS.DAY, { num: index + 1 })}
                </span>
                <div className={classNames("relative aspect-square w-full")}>
                  {item.image && (
                    <Image
                      src={item.image}
                      objectFit="contain"
                      quality={100}
                      alt=""
                      fill
                    />
                  )}
                  {status !== RewardsStatusEnum.UNAVAILABLE && (
                    <span
                      className={classNames(
                        "text-stroke-1 absolute bottom-1 right-1 text-nowrap text-xs font-extrabold text-shadow-sm",
                        "md:text-lg",
                      )}
                    >
                      {item.time
                        ? t(NS.PAGES.REWARDS.TIMER, { time: item.time })
                        : item.type !== RewardTypeEnum.COINS
                          ? t(NS.PAGES.REWARDS.COUNT, { num: item.amount })
                          : `x${formatValue(item.amount)}`}
                    </span>
                  )}
                </div>
              </div>
            </GetRewardCard>
          );
        })}
      </div>
    </div>
  );
};
