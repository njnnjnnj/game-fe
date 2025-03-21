import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { toast } from "sonner";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import CoinSVG from "@/public/assets/svg/coin.svg";
import { useEarnReferrals, useGetProfile } from "@/services/profile/queries";
import { IReferrals } from "@/services/profile/types";
import { NotificationEnum } from "@/types/telegram";

type Props = {
  referralsData: IReferrals;
};

export const FriendsList: FunctionComponent<Props> = ({ referralsData }) => {
  const t = useTranslations(NS.PAGES.FRIENDS.ROOT);
  const { mutate: earnReferrals, isPending } = useEarnReferrals();
  const { refetch } = useGetProfile();
  const { handleSelectionChanged, handleNotificationOccurred } =
    useHapticFeedback();

  const handleClick = () => {
    earnReferrals(undefined, {
      onSuccess: () => {
        refetch();
        toast(
          <Toast type="done" text={t(NS.PAGES.FRIENDS.SUCCESSFULLY_EARN)} />,
        );
      },
      onError: () => {
        toast(
          <Toast
            type="destructive"
            text={t(
              `${NS.PAGES.FRIENDS.ERRORS}.${NS.PAGES.FRIENDS.ERRORS.EARN_FRIENDS}`,
            )}
          />,
        );
      },
    });
  };

  return (
    <motion.div
      className="relative -top-4 px-4 pb-20 text-white"
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="text-stroke-1 text-nowrap text-2xl font-black tracking-[0.04em] text-white text-shadow-sm">
          {t(NS.PAGES.FRIENDS.TITLE)}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-550">
          {t(NS.PAGES.FRIENDS.INVITED)}{" "}
          <div className="text-nowrap rounded-[20px] bg-blue-700 px-3 py-1 text-xs font-black tracking-[0.04em] text-white">
            {referralsData.count}
          </div>
        </div>
      </div>
      <div className="relative mb-4 flex items-center justify-between rounded-2xl bg-blue-700 p-4 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-gray-550">
            {t(NS.PAGES.FRIENDS.CAN_COLLECT)}
          </span>
          <div className="grid grid-cols-[20px_1fr] items-center gap-2">
            <CoinSVG className="size-5" />
            <div className="flex items-center gap-2">
              <span className="text-stroke-1 font-extrabold text-white text-shadow-sm">
                {referralsData.reward}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[134px]">
          <PrimaryButton
            isLoading={isPending}
            onClick={() => {
              if (referralsData.reward > 0) {
                handleSelectionChanged();
                handleClick();
              } else {
                handleNotificationOccurred(NotificationEnum.ERROR);
              }
            }}
            size="small"
            disabled={referralsData.reward === 0}
          >
            {t(NS.PAGES.FRIENDS.GET)}
          </PrimaryButton>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {referralsData?.friends
          ? referralsData.friends.map((friend, index) => (
              <div
                key={index}
                className="relative flex items-center justify-between rounded-2xl bg-blue-700 p-4 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]"
              >
                <div className="grid grid-cols-[32px_1fr] gap-2">
                  <div className="relative size-8 items-center justify-center overflow-hidden rounded-full bg-white/10">
                    {friend.photo_url ? (
                      <Image src={friend.photo_url} alt={friend.name} fill />
                    ) : (
                      <span className="text-stroke-1 text-xs font-extrabold uppercase text-white text-shadow-sm">
                        {friend.name[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <span className="text-stroke-1 text-sm font-black tracking-wide text-white text-shadow-sm">
                      {friend.name}
                    </span>
                    <span className="text-xs font-medium text-gray-550">
                      {t(NS.PAGES.FRIENDS.PROFIT_PER_HOUR, {
                        reward: friend.reward_per_hour,
                      })}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-[20px_1fr] items-center gap-2 rounded-full bg-white/10 px-2 py-1">
                  <CoinSVG className="size-5" />
                  <span className="text-stroke-1 text-xs font-extrabold text-white text-shadow-sm">
                    +{friend.reward}
                  </span>
                </div>
              </div>
            ))
          : null}
      </div>
    </motion.div>
  );
};
