import React, { FunctionComponent } from "react";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import IncomeSvg from "@/public/assets/svg/income.svg";
import StarSvg from "@/public/assets/svg/star.svg";
import TapSvg from "@/public/assets/svg/tap.svg";
import { formatNumber } from "@/utils/number";

type Props = {
  balance: number;
  perHour: number;
  perTap: number;
};

export const BalanceInfo: FunctionComponent<Props> = ({
  balance,
  perHour,
  perTap,
}) => {
  const t = useTranslations(NS.PAGES.HOME.ROOT);
  const { handleSelectionChanged } = useHapticFeedback();

  return (
    <div className="relative z-20 pt-6">
      <div className="mb-3 flex items-center justify-center gap-3">
        <StarSvg className="size-10" />
        <span className="text-stroke-1 text-[40px] font-black leading-none text-white text-shadow-sm">
          {balance ? formatNumber(balance) : "0"}
        </span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Link
          href={ROUTES.REWARDS}
          className="flex items-center justify-center gap-2 rounded-full bg-blue-700/30 p-1 pr-2"
          onClick={() => handleSelectionChanged()}
        >
          <IncomeSvg />
          <span className="text-stroke-1 flex items-center gap-1 text-sm font-black leading-none text-white text-shadow-sm">
            {perHour ? formatNumber(perHour) : "0"}
            <span className="text-xs font-medium">
              {t(NS.PAGES.HOME.PER_HOUR)}
            </span>
          </span>
        </Link>
        <Link
          href={ROUTES.SHOP_CLOTHES}
          className="flex items-center justify-center gap-2 rounded-full bg-blue-700/30 p-1 pr-2"
          onClick={() => handleSelectionChanged()}
        >
          <TapSvg className="size-4.5" />
          <span className="text-stroke-1 flex items-center gap-1 text-sm font-black leading-none text-white text-shadow-sm">
            {perTap ? formatNumber(perTap) : "0"}
            <span className="text-xs font-medium">
              {t(NS.PAGES.HOME.PER_TAP)}
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};
