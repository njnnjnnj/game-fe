import React, { FunctionComponent } from "react";

import {
  useGetBattlePass,
  useGetBattlePassConfig,
} from "@/services/battle-pass/queries";

import { ModalType } from "../../constants";

import { BattlePassCell } from "./components/battle-pass-cell/BattlePassCell";
import { Star } from "./components/star/Star";

type Props = {
  renderLevel: number;
  openModal: (type: ModalType) => void;
};

export const BattlePassRow: FunctionComponent<Props> = ({
  renderLevel,
  openModal,
}) => {
  const { data: battlePassInfo } = useGetBattlePass();
  const { data: battlePassConfig } = useGetBattlePassConfig();

  if (!battlePassConfig || !battlePassInfo) return null;

  const currentLevel = battlePassInfo.current_level;
  const { free, paid } = battlePassConfig;

  return (
    <div className="relative grid w-full grid-cols-[1fr_1.2fr] gap-0.5 bg-blue-800 py-px">
      <BattlePassCell
        renderLevel={renderLevel}
        battlePassLevel={currentLevel}
        isPaid={battlePassInfo.is_paid}
        item={free[renderLevel]}
        openModal={openModal}
      />
      <BattlePassCell
        renderLevel={renderLevel}
        battlePassLevel={currentLevel}
        isPaid={battlePassInfo.is_paid}
        item={paid[renderLevel]}
        openModal={openModal}
      />
      {currentLevel === renderLevel ? (
        <div className="absolute -bottom-1 left-0 z-20 flex w-full flex-col items-center bg-black pb-0.5">
          <Star
            className="absolute left-[45%] translate-x-[-17px] translate-y-[-16px]"
            onClick={() => openModal(ModalType.LEVEL_UP)}
          />
          <div className="h-1.5 w-full bg-[#FFCE08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0.5px_0_rgba(255,255,255,0.3)]" />
          <div className="h-0.5 w-full bg-[#a6552d]" />
        </div>
      ) : null}
    </div>
  );
};
