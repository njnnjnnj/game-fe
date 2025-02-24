import React, { FunctionComponent, useEffect, useRef } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { LevelBadge } from "@/components/pages/battle-pass/components/level-badge/LevelBadge";
import { CollectButton, CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import LargeFx from "@/public/assets/png/battle-pass/large-fx.png";
import MysteryChest from "@/public/assets/png/battle-pass/mystery-chest.webp";
import RegularChest from "@/public/assets/png/battle-pass/regular-chest.webp";
import SmallFx from "@/public/assets/png/battle-pass/small-fx.png";
import { NotificationEnum } from "@/types/telegram";

import CellRenderer from "./cell-renderer";

export enum CellType {
  Regular,
  Premium,
}

type Props = {
  battlePassLevel: number;
  renderLevel: number;
  cellType: CellType;
};

export const BattlePassCell: FunctionComponent<Props> = ({
  battlePassLevel,
  renderLevel,
  cellType,
}) => {
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);
  const { handleNotificationOccurred } = useHapticFeedback();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPremium = cellType === CellType.Premium;
  const isTaken = battlePassLevel > renderLevel;
  const isLocked = renderLevel > battlePassLevel;
  const isAnimated = !isTaken && !isLocked;
  let ChestImage;
  let FxImage;

  switch (cellType) {
    case CellType.Premium:
      ChestImage = MysteryChest;
      FxImage = LargeFx;
      break;
    default:
      ChestImage = RegularChest;
      FxImage = SmallFx;
      break;
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const cellRenderer = new CellRenderer(canvas, {
        isPremium,
        isTaken,
        isLocked,
        fxImageSrc: FxImage.src,
      });

      cellRenderer.render();
    }
  }, [isPremium, isTaken, isLocked, FxImage.src]);

  const handleClick = () => {
    if (isLocked) {
      handleNotificationOccurred(NotificationEnum.ERROR);
    } else if (isTaken) {
      handleNotificationOccurred(NotificationEnum.WARNING);
    } else {
      handleNotificationOccurred(NotificationEnum.SUCCESS);
    }
  };

  return (
    <div className="relative" onClick={handleClick}>
      <canvas className="h-30 w-full" ref={canvasRef} />
      {isAnimated && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={classNames(
              "absolute inset-0 mx-0 my-auto h-60 w-full origin-left animate-bp-glow-running bg-[length:64px] bg-no-repeat blur-[10px] will-change-transform",
              {
                "bg-bp-premium-glow-pattern": isPremium,
                "bg-bp-regular-glow-pattern": !isPremium,
              },
            )}
          />
        </div>
      )}
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="absolute inset-0 m-auto h-20 w-20"
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <Image
          className="pointer-events-none"
          src={ChestImage}
          alt=""
          style={{ objectFit: "contain" }}
          quality={100}
        />
      </motion.div>
      {!isPremium && (
        <LevelBadge
          className="absolute -right-[20px] top-1/2 z-10 h-10 w-10 -translate-y-1/2"
          level={renderLevel}
          isInactive={renderLevel > battlePassLevel}
        />
      )}
      {battlePassLevel === renderLevel && (
        <CollectButton
          className="absolute -top-2 left-1/2 z-10 -translate-x-1/2"
          color={
            isPremium ? CollectButtonColor.YELLOW : CollectButtonColor.GREEN
          }
          isLocked={isPremium}
          onClick={() => {}}
        >
          {t(
            `${NS.PAGES.BATTLE_PASS.BUTTONS.ROOT}.${NS.PAGES.BATTLE_PASS.BUTTONS.COLLECT}`,
          )}
        </CollectButton>
      )}
    </div>
  );
};
