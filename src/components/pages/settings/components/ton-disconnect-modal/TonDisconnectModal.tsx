import React, { useState } from "react";

import { useTranslations } from "next-intl";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import CloseIcon from "@/public/assets/svg/close.svg";
import { NotificationEnum } from "@/types/telegram";

interface ITonDisconnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDisconnect: () => void;
}

export const TonDisconnectModal = ({
  onClose,
  onDisconnect,
}: ITonDisconnectModalProps) => {
  const t = useTranslations(NS.PAGES.SETTINGS.ROOT);
  const [isChecked, setIsChecked] = useState(false);
  const { handleSelectionChanged, handleNotificationOccurred } =
    useHapticFeedback();

  const handleClose = () => {
    setIsChecked(false);
    onClose();
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
    <DrawerContent className="flex w-full flex-col items-center rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <DrawerClose
        asChild
        className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full"
      >
        <CloseIcon />
      </DrawerClose>
      <div className="z-10 mb-6 flex w-full flex-col items-center gap-3">
        <DrawerTitle className="text-stroke-1 px-5 text-center font-rubik text-[28px] font-black leading-none text-white text-shadow-sm">
          {t(
            `${NS.PAGES.SETTINGS.DISCONNECT_MODAL.ROOT}.${NS.PAGES.SETTINGS.DISCONNECT_MODAL.TITLE}`,
          )}
        </DrawerTitle>
        <DrawerDescription className="text-center text-sm font-medium tracking-wide text-gray-550">
          {t(
            `${NS.PAGES.SETTINGS.DISCONNECT_MODAL.ROOT}.${NS.PAGES.SETTINGS.DISCONNECT_MODAL.DESCRIPTION}`,
          )}
        </DrawerDescription>

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
      <PrimaryButton
        className="uppercase tracking-wide"
        color="red"
        onClick={handleDisconnect}
      >
        {t(
          `${NS.PAGES.SETTINGS.DISCONNECT_MODAL.ROOT}.${NS.PAGES.SETTINGS.DISCONNECT_MODAL.BUTTON}`,
        )}
      </PrimaryButton>
    </DrawerContent>
  );
};
