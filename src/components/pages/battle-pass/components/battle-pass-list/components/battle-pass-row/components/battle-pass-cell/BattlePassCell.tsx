import React, { FunctionComponent, useEffect, useRef } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { LevelBadge } from "@/components/pages/battle-pass/components/level-badge/LevelBadge";
import { CollectButton, CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import Booster from "@/public/assets/png/battle-pass/booster.webp";
import Bucket from "@/public/assets/png/battle-pass/bucket.webp";
import EnergyBooster from "@/public/assets/png/battle-pass/energy-booster.webp";
import EpicChest from "@/public/assets/png/battle-pass/epic-chest.webp";
import LargeFx from "@/public/assets/png/battle-pass/large-fx.webp";
import MegaChest from "@/public/assets/png/battle-pass/mega-chest.webp";
import SmallFx from "@/public/assets/png/battle-pass/small-fx.webp";
import StartChest from "@/public/assets/png/battle-pass/start-chest.webp";
import {
  BattleBassChestType,
  BattlePassItem,
} from "@/services/battle-pass/types";
import { NotificationEnum } from "@/types/telegram";

import CellRenderer from "./cell-renderer";

type Props = {
  battlePassLevel: number;
  renderLevel: number;
  item: BattlePassItem;
};

export const BattlePassCell: FunctionComponent<Props> = ({
  battlePassLevel,
  renderLevel,
  item,
}) => {
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);
  const { handleNotificationOccurred } = useHapticFeedback();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPremium = item.is_paid;
  const isTaken = battlePassLevel > renderLevel;
  const isLocked = renderLevel > battlePassLevel;
  const isAnimated = !isTaken && !isLocked;
  let ChestImage = isPremium ? MegaChest : StartChest;
  const FxImage = isPremium ? LargeFx : SmallFx;

  switch (item.type) {
    case "chest": {
      if (item.value === BattleBassChestType.EPIC) {
        ChestImage = EpicChest;
      } else if (item.value === BattleBassChestType.MEGA) {
        ChestImage = MegaChest;
      } else {
        ChestImage = StartChest;
      }
      break;
    }
    case "friends": {
      ChestImage = Bucket;
      break;
    }
    case "stars": {
      ChestImage = Bucket;
      break;
    }
    case "coins": {
      ChestImage = Bucket;
      break;
    }
    case "offline": {
      ChestImage = Bucket;
      break;
    }
    case "buster": {
      ChestImage = Booster;
      break;
    }
    case "game_energy": {
      ChestImage = EnergyBooster;
      break;
    }
    case "cloth": {
      ChestImage = StartChest;
      break;
    }
    case "character": {
      ChestImage = MegaChest;
      break;
    }
    default: {
      ChestImage = StartChest;
      break;
    }
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
