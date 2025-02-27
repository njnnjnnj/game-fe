import React, { FunctionComponent } from "react";

import Image from "next/image";

import classNames from "classnames";

import { GetRewardCard } from "@/components/common/get-reward-card/GetRewardCard";
import { RewardsStatusEnum } from "@/components/pages/rewards/enums";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import RegularChest from "@/public/assets/png/battle-pass/mega-chest.webp";
import { IDailyReward, IDailyRewardInfo } from "@/services/rewards/types";
import { NotificationEnum } from "@/types/telegram";
import { ImpactStyleEnum } from "@/types/telegram";
import { UseMutateFunction } from "@tanstack/react-query";

import { CARD_CAPTION } from "../constants";

type Props = {
  dailyRewardInfo: IDailyRewardInfo;
  isActive: boolean;
  onCollectReward: UseMutateFunction<IDailyReward, Error, void, unknown>;
};

export const RewardsContent: FunctionComponent<Props> = ({
  isActive,
  dailyRewardInfo,
  onCollectReward,
}) => {
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

    if (dayIndex + 1 < combo) {
      return RewardsStatusEnum.AVAILABLE;
    } else if (dayIndex + 1 === combo) {
      return available
        ? RewardsStatusEnum.CURRENT
        : RewardsStatusEnum.UNAVAILABLE;
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
        {Array(20)
          .fill(0)
          .map((_, index) => {
            const status = getStatusForDay(index);

            return (
              <GetRewardCard
                key={index}
                status={status}
                isAnimated={
                  status !== RewardsStatusEnum.UNAVAILABLE && isActive
                }
                isActive={isActive}
                caption={CARD_CAPTION[status]}
                onClick={() => handleClick(status)}
              >
                <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden p-2">
                  <span
                    className={classNames(
                      "text-stroke-1 text-nowrap text-x font-extrabold text-shadow-sm",
                    )}
                  >
                    День {index + 1}
                  </span>
                  <div className={classNames("relative aspect-square w-full")}>
                    <Image
                      src={RegularChest}
                      objectFit="contain"
                      quality={100}
                      alt=""
                      fill
                    />
                    {status !== RewardsStatusEnum.UNAVAILABLE && (
                      <span
                        className={classNames(
                          "text-stroke-1 absolute bottom-1 right-1 text-xs font-extrabold text-shadow-sm",
                          "md:text-lg",
                        )}
                      >
                        x{1}
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
