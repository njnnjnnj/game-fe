import React, { FunctionComponent } from "react";

import classNames from "classnames";

import { LevelBadge } from "@/components/pages/battle-pass/components/level-badge/LevelBadge";
import { useGetBattlePass } from "@/services/battle-pass/queries";
import { formatValue } from "@/utils/lib/utils";

import { EnhanceButton } from "./components/enhance-button/EnhanceButton";

type Props = {
  onEnhanceClick: () => void;
};

export const BattlePassProgressBar: FunctionComponent<Props> = ({
  onEnhanceClick,
}) => {
  const { data: battlePassInfo } = useGetBattlePass();
  const currentLevel = battlePassInfo?.current_level ?? 1;
  const currentExp = battlePassInfo?.current_exp ?? 0;
  const needExp = battlePassInfo?.need_exp ?? 0;
  const progress = Math.min(Math.round((currentExp / needExp) * 100), 100);

  return (
    <div className="relative z-10 flex w-full flex-col">
      <div className="h-0.5 w-full bg-[#35637D]" />
      <div className="grid w-full grid-cols-[1fr_1.2fr] items-center justify-center gap-0.5 bg-gradient-to-b from-[#04A0F5] to-[#0A4CDE] px-4 py-3 shadow-[inset_0_-4px_2px_0_rgba(0,0,0,0.3),inset_0_4px_2px_0_rgba(255,255,255,0.4)]">
        <div className="relative flex w-full max-w-[180px] items-center justify-between justify-self-end">
          <LevelBadge className="z-10" level={currentLevel} />
          <div className="absolute left-5 flex w-[calc(100%_-_20px)] flex-col items-center bg-[#0932A4] py-[3px] shadow-[inset_0px_-4px_8px_0_rgba(255,255,255,0.6),inset_0px_4px_8px_0_rgba(255,255,255,0.6)]">
            <div
              className={classNames(
                "transition-width absolute bottom-1 left-0 top-1 rounded-[8px] bg-home-bp-btn-indicator-pattern shadow-home-bp-btn-indicator drop-shadow-home-bp-btn-indicator duration-300",
                "after:absolute after:left-0.5 after:right-0.5 after:top-0.5 after:z-30 after:h-1.5 after:rounded-t-[8px] after:bg-white after:opacity-30 after:content-['']",
              )}
              style={{
                width: `${progress}%`,
              }}
            />
            <div className="absolute left-0 top-0 h-1 w-full bg-[#42DDFC] shadow-[inset_0px_1px_0.5px_rgba(255,255,255,0.3)]" />
            <span className="text-stroke-1 relative z-10 inline-block py-[3px] text-sm font-black tracking-wide text-white text-shadow-sm">
              {`${formatValue(currentExp)}/${formatValue(needExp)}`}
            </span>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-[#42DDFC] shadow-[inset_0px_-1px_0.5px_rgba(255,255,255,0.3)]" />
          </div>
          <LevelBadge className="relative -right-5" level={currentLevel + 1} />
        </div>
        <EnhanceButton onClick={onEnhanceClick} />
      </div>
    </div>
  );
};
