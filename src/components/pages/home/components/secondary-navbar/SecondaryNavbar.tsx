import React, { FunctionComponent, useLayoutEffect, useState } from "react";

import Link from "next/link";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { LevelBadge } from "@/components/pages/battle-pass/components/level-badge/LevelBadge";
import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import SlotsSVG from "@/public/assets/svg/slots.svg";
import { formatValue } from "@/utils/lib/utils";

type Props = {
  currentExp: number;
  needExp: number;
  currentLevel: number;
};

export const SecondaryNavbar: FunctionComponent<Props> = ({
  currentExp,
  currentLevel,
  needExp,
}) => {
  const t = useTranslations(NS.PAGES.HOME.ROOT);
  const [isBpAnimationEnabled, setIsBpAnimationEnabled] = useState(false);
  const progress = ((Number(currentExp) / Number(needExp)) * 100).toFixed(0);
  const { handleSelectionChanged } = useHapticFeedback();

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setIsBpAnimationEnabled(true);
    }, 1000);
    
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <div className="relative z-30 grid w-full grid-cols-[1fr_175px] gap-2">
      <Link
        href={ROUTES.BATTLE_PASS}
        className="relative h-full w-full"
        onClick={() => handleSelectionChanged()}
      >
        <div className="text-stroke-1 bg absolute -top-7 left-[1px] rounded-t-[8px] bg-[#0A4CDE] px-[14px] pb-5 pt-1.5 text-sm font-black text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] text-shadow-sm">
          Battle Pass
        </div>
        <button
          className={classNames(
            "text-stroke-1 relative flex h-full w-full items-center gap-2 rounded-xl border border-solid border-black bg-[#0932A4] pb-1 font-black text-white transition-all text-shadow-sm active:scale-[0.98]",
          )}
        >
          <div className="flex h-full w-full justify-center rounded-xl bg-home-buttons-pattern px-1.5 py-[3px] shadow-[inset_0px_-2px_4px_rgba(4,160,245,0.6),inset_0px_-1px_0px_rgba(4,160,245,0.8)]">
            <div className="relative flex w-full items-center justify-between justify-self-end">
              <LevelBadge
                className="absolute left-0 z-40"
                level={currentLevel}
                iconWrapperClassname="!size-10"
              />
              <div className="relative ml-3 flex h-7 w-full flex-col items-center rounded-r-xl bg-[#42DDFC] py-1 pr-1 shadow-[inset_0px_-2px_2px_0_rgba(255,255,255,0.2),inset_0px_2px_2px_0_rgba(255,255,255,0.2)]">
                <div className="text-stroke-1 relative z-30 inline-block h-full w-full rounded-r-xl bg-[#0932A4] py-[3px] text-sm font-black tracking-wide text-white text-shadow-sm">
                  <span className="absolute left-1/2 z-50 -translate-x-1/2">
                    {`${formatValue(currentExp)}/${formatValue(needExp)}`}
                  </span>
                  <div
                    className={classNames(
                      "absolute bottom-[1px] left-0 top-[1px] z-30 rounded-[8px] bg-home-bp-btn-indicator-pattern shadow-home-bp-btn-indicator drop-shadow-home-bp-btn-indicator",
                      "after:absolute after:left-0.5 after:right-0.5 after:top-0.5 after:z-30 after:h-1.5 after:rounded-t-[8px] after:bg-white after:opacity-30 after:content-['']",
                      { "transition-width duration-300": isBpAnimationEnabled },
                    )}
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </button>
      </Link>
      <Link
        href={ROUTES.SLOT_MACHINE}
        className="h-full w-full"
        onClick={() => handleSelectionChanged()}
      >
        <button className="text-stroke-1 relative flex w-full items-center gap-2 rounded-xl border border-solid border-black bg-[#0932A4] pb-1 font-black text-white transition-all text-shadow-sm active:scale-[0.98]">
          <div className="flex w-full justify-end rounded-xl bg-home-buttons-pattern px-4 py-[15px] shadow-[inset_0px_-2px_4px_rgba(4,160,245,0.6),inset_0px_-1px_0px_rgba(4,160,245,0.8)]">
            <SlotsSVG className="absolute -top-2 left-2" />
            <span className="ml-20 leading-none">{t(NS.PAGES.HOME.SLOTS)}</span>
          </div>
        </button>
      </Link>
    </div>
  );
};
