import React from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { PageWrapper } from "@/components/common";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import QRImage from "@/public/assets/png/qr.png";
import TelegramSVG from "@/public/assets/svg/telegram.svg";
import XSVG from "@/public/assets/svg/x.svg";

export const Forbidden = () => {
  const t = useTranslations(NS.PAGES.FORBIDDEN.ROOT);
  const { webApp } = useTelegram();
  const { handleSelectionChanged } = useHapticFeedback();

  return (
    <PageWrapper
      className={classNames(
        "relative flex h-screen flex-col items-center justify-center bg-gradient-to-b from-[#29D6FF] to-[#2596E4] px-8 py-12",
        "after:absolute after:inset-0 after:z-0 after:bg-[url('/assets/png/reward-screen/rays-bg.webp')] after:bg-[position:center_80%] after:bg-no-repeat",
      )}
    >
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center">
        <div className="mb-12 w-2/3 rounded-[20px] bg-black p-0.5 pb-1.5">
          <div className="relative aspect-square rounded-[20px]">
            <Image
              src={QRImage}
              alt="QR code Application"
              className="rounded-[20px]"
              fill
            />
          </div>
        </div>
        <h1 className="text-stroke-1 mb-3 text-center text-3xl font-black uppercase tracking-wider text-white text-shadow">
          {t(NS.PAGES.FORBIDDEN.TITLE)}
        </h1>
        <p className="text-center text-sm font-medium tracking-wide text-white">
          {t(NS.PAGES.FORBIDDEN.DESCRIPTION)}
        </p>
      </div>

      <div className="relative z-10 flex w-full flex-col gap-3">
        <PrimaryButton
          className="flex items-center gap-2"
          color="blue"
          onClick={() => {
            handleSelectionChanged();
            webApp?.openTelegramLink("https://t.me/Majestic_EN");
          }}
        >
          <TelegramSVG className="size-6 drop-shadow-social-icons" /> Telegram
        </PrimaryButton>
        <PrimaryButton
          onClick={() => handleSelectionChanged()}
          className="flex items-center gap-2"
        >
          <XSVG className="size-6 drop-shadow-social-icons" /> Twitter (X)
        </PrimaryButton>
      </div>
    </PageWrapper>
  );
};
