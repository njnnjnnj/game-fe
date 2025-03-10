import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import CopySVG from "@/public/assets/svg/friends/share.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { IReferrals } from "@/services/profile/types";
import { getLinkToApp } from "@/utils/lib/tg";

type Props = {
  referralsData: IReferrals;
};

export const InviteBoard: FunctionComponent<Props> = ({ referralsData }) => {
  const t = useTranslations(NS.PAGES.FRIENDS.ROOT);
  const { handleSelectionChanged } = useHapticFeedback();
  const { webApp } = useTelegram();

  const handleCopyClipboard = () => {
    handleSelectionChanged();
    navigator.clipboard.writeText(getLinkToApp(referralsData.link));
    toast(<Toast type="done" text={t(NS.PAGES.FRIENDS.LINK_COPIED)} />);
  };

  return (
    <motion.div
      className={classNames(
        "border-b-solid relative -top-10 mx-4 rounded-2xl border-b border-b-black bg-blue-900 pb-[3px]",
        "shadow-[0_2px_0_0_rgba(0,0,0,0.5)]",
      )}
      initial={{ y: "10%" }}
      animate={{ y: "0%" }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <div className="flex flex-col gap-3 rounded-2xl border border-b-0 border-solid border-black bg-blue-700 p-4 shadow-[inset_0_-1px_0.5px_0_rgba(255,255,255,0.1)]">
        <p className="text-stroke-1 font-extrabold text-white text-shadow-sm">
          {t(NS.PAGES.FRIENDS.INVITE_FRIEND)}
        </p>
        <div className="grid grid-cols-[20px_1fr] items-center gap-2">
          <StarSVG className="size-5" />
          <div className="flex items-center gap-2">
            <span className="text-stroke-1 font-extrabold text-white text-shadow-sm">
              +50.000
            </span>
            <span className="text-xs font-medium text-gray-550">
              {t(NS.PAGES.FRIENDS.INVITE_DESCRIPTION)}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_52px] gap-2">
          <PrimaryButton
            onClick={() => {
              handleSelectionChanged();
              webApp?.openTelegramLink(
                `https://t.me/share/url?url=${getLinkToApp(referralsData.link)}`,
              );
            }}
          >
            {t(NS.PAGES.FRIENDS.INVITE_BUTTON_TEXT)}
          </PrimaryButton>
          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={classNames(
              "group h-13 w-full cursor-pointer overflow-hidden rounded-2xl border border-black bg-[#0655a4] pb-[3px]",
            )}
            onClick={handleCopyClipboard}
          >
            <div
              className={classNames(
                "shadow-inner-btn flex h-full w-full items-center justify-center rounded-xl bg-[#0075ff] p-[3px] pb-1",
              )}
            >
              <div
                className={classNames(
                  "shadow-a flex h-full w-full items-center rounded-xl px-3",
                  "justify-center bg-white/20",
                )}
              >
                <CopySVG />
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
