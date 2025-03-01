import React, { FunctionComponent, useEffect, useRef } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { LevelBadge } from "@/components/pages/battle-pass/components/level-badge/LevelBadge";
import { CollectButton, CollectButtonColor } from "@/components/ui";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import LargeFx from "@/public/assets/png/battle-pass/large-fx.webp";
import SmallFx from "@/public/assets/png/battle-pass/small-fx.webp";
import {
  useGetBattlePass,
  useGetBattlePassReward,
} from "@/services/battle-pass/queries";
import { BattlePassItem } from "@/services/battle-pass/types";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import { NotificationEnum } from "@/types/telegram";
import { getImgByReward } from "@/utils/rewards";

import { ModalType } from "../../../../constants";

import CellRenderer from "./cell-renderer";

type Props = {
  battlePassLevel: number;
  renderLevel: number;
  lastFreeReward: number;
  lastPaidReward: number;
  isPaid: boolean;
  item: BattlePassItem;
  openModal: (type: ModalType) => void;
};

export const BattlePassCell: FunctionComponent<Props> = ({
  battlePassLevel,
  renderLevel,
  lastFreeReward,
  lastPaidReward,
  isPaid,
  item,
  openModal,
}) => {
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);
  const { handleNotificationOccurred } = useHapticFeedback();
  const { data: heroes } = useGetAllAppsHeroes();
  const { refetch: refetchBattlePass } = useGetBattlePass();
  const { mutate: getBattlePassReward, isPending: isGettingBattlePassReward } =
    useGetBattlePassReward();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isPremium = item.is_paid;
  const lastTakenReward = isPremium ? lastPaidReward : lastFreeReward;
  const isTaken = renderLevel <= lastTakenReward;
  const isLocked = renderLevel > battlePassLevel;
  const isCollectible = !isTaken && !isLocked;
  const ItemImage = heroes
    ? getImgByReward(item.type, item.value, heroes)
    : undefined;
  const FxImage = isPremium ? LargeFx : SmallFx;

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

  const onCollectItem = () => {
    if (isTaken) {
      handleNotificationOccurred(NotificationEnum.WARNING);
    } else if (isLocked) {
      handleNotificationOccurred(NotificationEnum.ERROR);
    } else {
      handleNotificationOccurred(NotificationEnum.SUCCESS);
    }

    if (isPremium && !isPaid) {
      openModal(ModalType.ENHANCE);

      return;
    }

    if (isLocked || isTaken) return;

    getBattlePassReward(
      { level: renderLevel, isPaid: isPremium },
      {
        onSuccess: () => {
          refetchBattlePass();
          toast(<Toast type="done" text={`You've taken Battle Pass reward`} />);
        },
        onError: (error) => {
          toast(
            <Toast
              type="destructive"
              text={`Taking Battle Pass reward has failed: ${error.message}`}
            />,
          );
        },
      },
    );
  };

  return (
    <div className="relative" onClick={onCollectItem}>
      <canvas className="h-30 w-full" ref={canvasRef} />
      {isCollectible && (
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
      {ItemImage && (
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
            src={ItemImage}
            alt=""
            style={{ objectFit: "contain" }}
            quality={100}
          />
        </motion.div>
      )}
      {!isPremium && (
        <LevelBadge
          className="absolute -right-[20px] top-1/2 z-10 h-10 w-10 -translate-y-1/2"
          level={renderLevel}
          isInactive={renderLevel > battlePassLevel}
        />
      )}
      {isCollectible && (
        <CollectButton
          className="absolute -top-2 left-1/2 z-10 -translate-x-1/2"
          color={
            isPremium && !isPaid
              ? CollectButtonColor.YELLOW
              : CollectButtonColor.GREEN
          }
          isLocked={isPremium && !isPaid}
          isLoading={isGettingBattlePassReward}
        >
          {t(
            `${NS.PAGES.BATTLE_PASS.BUTTONS.ROOT}.${NS.PAGES.BATTLE_PASS.BUTTONS.COLLECT}`,
          )}
        </CollectButton>
      )}
    </div>
  );
};
