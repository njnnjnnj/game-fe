import React, { useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { Modal } from "@/components/common";
import { Checkbox } from "@/components/ui/checkbox";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import CloseIcon from "@/public/assets/svg/close.svg";
import { NotificationEnum } from "@/types/telegram";

interface ITonDisconnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDisconnect: () => void;
}

export const TonDisconnectModal = ({
  isOpen,
  onClose,
  onDisconnect,
}: ITonDisconnectModalProps) => {
  const t = useTranslations(NS.PAGES.SETTINGS.ROOT);
  const { webApp } = useTelegram();
  const [isChecked, setIsChecked] = useState(false);

  const handleClose = () => {
    setIsChecked(false);
    onClose();
  };

  const handleSelectionChanged = () => {
    if (webApp) {
      webApp.HapticFeedback.selectionChanged();
    }
  };

  const handleNotificationOccurred = (type: NotificationEnum) => {
    if (webApp) {
      webApp.HapticFeedback.notificationOccurred(type);
    }
  };

  const handleDisconnect = () => {
    if (isChecked) {
      handleNotificationOccurred(NotificationEnum.SUCCESS);
      onDisconnect();
      handleClose();
    } else {
      handleNotificationOccurred(NotificationEnum.ERROR);
    }
  };

  return (
    <Modal
      isVisible={isOpen}
      onClose={handleClose}
      className="relative flex w-full flex-col items-center rounded-t-4xl border border-b-0 border-white/10 bg-blue-700 px-4 pb-8 pt-9 shadow-modal"
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-white/5"
      >
        <CloseIcon />
      </motion.button>
      <div className="z-10 mb-6 flex w-full flex-col items-center gap-3">
        <h4 className="text-stroke-1 px-5 text-center font-rubik text-[28px] font-black leading-none text-white text-shadow-sm">
          {t(
            `${NS.PAGES.SETTINGS.DISCONNECT_MODAL.ROOT}.${NS.PAGES.SETTINGS.DISCONNECT_MODAL.TITLE}`,
          )}
        </h4>
        <p className="text-center text-sm font-medium tracking-wide text-gray-550">
          {t(
            `${NS.PAGES.SETTINGS.DISCONNECT_MODAL.ROOT}.${NS.PAGES.SETTINGS.DISCONNECT_MODAL.DESCRIPTION}`,
          )}
        </p>

        <div className="flex w-full gap-2 rounded-2xl bg-white/5 p-4">
          <Checkbox
            className="size-6"
            checked={isChecked}
            onCheckedChange={(checked) => {
              setIsChecked(!!checked);
              handleSelectionChanged();
            }}
          />
          <p
            className="text-sm font-medium tracking-wide text-white"
            onClick={() => {
              setIsChecked(!isChecked);
              handleSelectionChanged();
            }}
          >
            {t(
              `${NS.PAGES.SETTINGS.DISCONNECT_MODAL.ROOT}.${NS.PAGES.SETTINGS.DISCONNECT_MODAL.AGGREEMENT}`,
            )}
          </p>
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        onClick={handleDisconnect}
        className={classNames(
          "group z-10 h-[56px] w-full cursor-pointer overflow-hidden rounded-2xl shadow-inset-black",
          { "bg-blue-800 pb-0": !isChecked },
          { "bg-[#AF2F27] pb-[3px]": isChecked },
        )}
      >
        <div
          className={classNames(
            "mx-auto flex h-13 w-[99%] items-center justify-center rounded-xl p-[3px] pb-1",
            { "bg-blue-800 shadow-none": !isChecked },
            { "bg-[#FF453A] shadow-inset-btn": isChecked },
          )}
        >
          <div
            className={classNames(
              "text-stroke-1 flex h-11 w-full items-center justify-center gap-1 rounded-xl p-3 text-center font-black uppercase tracking-wide text-white text-shadow-sm",
              { "bg-blue-800/100 shadow-none": !isChecked },
              { "bg-white/15 shadow-link": isChecked },
            )}
          >
            {t(
              `${NS.PAGES.SETTINGS.DISCONNECT_MODAL.ROOT}.${NS.PAGES.SETTINGS.DISCONNECT_MODAL.BUTTON}`,
            )}
          </div>
        </div>
      </motion.button>
    </Modal>
  );
};
