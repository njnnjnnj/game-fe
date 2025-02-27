import React from "react";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import SlotsSVG from "@/public/assets/svg/slots.svg";

export const SecondaryNavbar = () => {
  const t = useTranslations(NS.PAGES.HOME.ROOT);
  return (
    <div className="grid grid-cols-2 gap-2">
      <Link href={ROUTES.BATTLE_PASS} className="w-45">
        <button className="text-stroke-1 relative flex w-full items-center gap-2 rounded-xl border border-solid border-black bg-[#0932A4] pb-1 font-black text-white drop-shadow-home-button transition-all text-shadow-sm active:scale-[0.98]">
          <div className="flex w-full justify-center rounded-xl bg-gradient-to-b from-[#04A0F5] to-[#0A4CDE] px-4 py-[15px]">
            <span className="leading-none">Battle Pass</span>
          </div>
        </button>
      </Link>
      <Link href={ROUTES.SLOT_MACHINE} className="w-45">
        <button className="text-stroke-1 relative flex w-full items-center gap-2 rounded-xl border border-solid border-black bg-[#0932A4] pb-1 font-black text-white drop-shadow-home-button transition-all text-shadow-sm active:scale-[0.98]">
          <div className="flex w-full justify-end rounded-xl bg-gradient-to-b from-[#04A0F5] to-[#0A4CDE] px-4 py-[15px]">
            <SlotsSVG className="absolute -top-2 left-2" />
            <span className="ml-20 leading-none">{t(NS.PAGES.HOME.SLOTS)}</span>
          </div>
        </button>
      </Link>
    </div>
  );
};
