import React from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { PageWrapper } from "@/components/common";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import QRImage from "@/public/assets/png/qr.png";
import TelegramSVG from "@/public/assets/svg/telegram.svg";
import XSVG from "@/public/assets/svg/x.svg";

export const Forbidden = () => {
  const t = useTranslations(NS.PAGES.FORBIDDEN.ROOT);

  return (
    <PageWrapper className="relative flex h-screen flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative mb-12 size-60">
          <Image src={QRImage} alt="QR code Application" fill />
        </div>
        <h1 className="text-stroke-1 mb-3 text-center text-3xl font-black uppercase tracking-wider text-white text-shadow">
          {t(NS.PAGES.FORBIDDEN.TITLE)}
        </h1>
        <p className="text-center text-xs font-medium tracking-wide text-gray-550">
          {t(NS.PAGES.FORBIDDEN.DESCRIPTION)}
        </p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <PrimaryButton className="flex items-center gap-2" color="blue">
          <TelegramSVG className="drop-shadow-social-icons size-6" /> Telegram
        </PrimaryButton>
        <PrimaryButton className="flex items-center gap-2">
          <XSVG className="drop-shadow-social-icons size-6" /> Twitter (X)
        </PrimaryButton>
      </div>
    </PageWrapper>
  );
};
