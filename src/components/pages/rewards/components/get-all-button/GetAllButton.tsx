import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useCountdownTimer } from "@/hooks/useCountDownTimer";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { NotificationEnum } from "@/types/telegram";

type Props = {
  isLoading: boolean;
  onClick: () => void;
  disabled: boolean;
};

export const GetAllButton: FunctionComponent<Props> = ({
  isLoading,
  onClick,
  disabled,
}) => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const { handleSelectionChanged, handleNotificationOccurred } =
    useHapticFeedback();
  const timeLeft = useCountdownTimer();

  const handleCollectReward = () => {
    if (disabled) {
      handleNotificationOccurred(NotificationEnum.ERROR);
      return;
    }

    onClick();
    handleSelectionChanged();
  };

  return (
    <div
      className={classNames(
        "animate-slideUp fixed bottom-0 left-0 z-10 w-full bg-gradient-to-b from-[#192632]/0 via-[#192632]/100 to-[#192632]/100 px-4 pb-8 pt-18",
      )}
    >
      <PrimaryButton
        color="secondary"
        className={classNames("uppercase", { "!bg-[#1B3044]": disabled })}
        innerClassname={classNames({ "!bg-[#1B3044]": disabled })}
        isLoading={isLoading}
        onClick={handleCollectReward}
        disabled={disabled}
      >
        {disabled && timeLeft ? (
          <span className="text-stroke-1 text-lg font-black lowercase leading-none text-white text-shadow-sm">
            {timeLeft.h}ч <span className="text-gray-550">:</span> {timeLeft.m}м{" "}
            <span className="text-gray-550">:</span> {timeLeft.s}с
          </span>
        ) : (
          t(NS.PAGES.REWARDS.GET_REWARDS)
        )}
      </PrimaryButton>
    </div>
  );
};
