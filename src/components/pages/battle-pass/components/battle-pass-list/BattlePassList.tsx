import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useRef,
  useState,
} from "react";

import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList } from "react-window";

import { Drawer } from "@/components/ui/drawer";

import { EnhanceBattlePassModal } from "../enhance-battle-pass-modal/EnhanceBattlePassModal";
import { LevelupBattlePassModal } from "../levelup-battle-pass-modal/LevelupBattlePassModal";

import { BattlePassListHeader } from "./components/battle-pass-list-header/BattlePassListHeader";
import { BattlePassRow } from "./components/battle-pass-row/BattlePassRow";
import {
  BATTLE_PASS_BG_ASPECT_RATIO,
  BATTLE_PASS_BOTTOM_MENU_HEIGHT,
  BATTLE_PASS_LIST_PROGRESS_BAR_HEIGHT,
  BATTLE_PASS_ROW_HEIGHT,
  ModalType,
} from "./constants";

let currentWidth = 0;

const BATTLE_PASS_LIST_HEADER_ROW_ID = "battle-pass-list-header-row";
const BATTLE_PASS_ROWS_COUNT = 101; // 100 Battle Pass items and 1 for the Header

type RowProps = {
  index: number;
  style: CSSProperties;
  data: {
    openModal: (type: ModalType) => void;
  };
};

const getItemSize = (index: number) => {
  if (!index)
    return (
      currentWidth * BATTLE_PASS_BG_ASPECT_RATIO +
      BATTLE_PASS_LIST_PROGRESS_BAR_HEIGHT
    );
  if (index === BATTLE_PASS_ROWS_COUNT - 1)
    return BATTLE_PASS_ROW_HEIGHT + BATTLE_PASS_BOTTOM_MENU_HEIGHT;

  return BATTLE_PASS_ROW_HEIGHT;
};

const Row = ({ index, style, data }: RowProps) => {
  const renderLevel = index;

  return (
    <div style={style} id={!index ? BATTLE_PASS_LIST_HEADER_ROW_ID : undefined}>
      {index ? (
        <BattlePassRow
          key={`level-${renderLevel}`}
          renderLevel={renderLevel}
          openModal={data.openModal}
        />
      ) : (
        <BattlePassListHeader
          onEnhanceClick={() => data.openModal(ModalType.ENHANCE)}
        />
      )}
    </div>
  );
};

type Props = {
  onScroll: (e: Event) => void;
};

export const BattlePassList: FunctionComponent<Props> = ({ onScroll }) => {
  const [openModalType, setOpenModalType] = useState<ModalType | null>(null);
  const listContainerRef = useRef<HTMLElement | null>(null);
  const listenToScroll = useCallback((instance: HTMLElement | null) => {
    if (instance) {
      listContainerRef.current = instance;
      listContainerRef.current.addEventListener("scroll", onScroll);
    } else {
      listContainerRef.current?.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (
    <Drawer open={!!openModalType} onClose={() => setOpenModalType(null)}>
      <div className="absolute inset-0">
        <AutoSizer>
          {({ width, height }) => {
            currentWidth = width;

            return (
              <VariableSizeList
                width={width}
                height={height}
                itemCount={BATTLE_PASS_ROWS_COUNT}
                itemSize={getItemSize}
                outerRef={listenToScroll}
                itemData={{ openModal: setOpenModalType }}
              >
                {Row}
              </VariableSizeList>
            );
          }}
        </AutoSizer>
      </div>
      {openModalType === ModalType.LEVEL_UP ? (
        <LevelupBattlePassModal />
      ) : (
        <EnhanceBattlePassModal onClose={() => setOpenModalType(null)} />
      )}
    </Drawer>
  );
};
