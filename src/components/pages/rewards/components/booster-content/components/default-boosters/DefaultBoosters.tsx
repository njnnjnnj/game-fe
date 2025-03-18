import React, { FunctionComponent, MouseEvent, useMemo, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import { toast } from "sonner";

import { getCurrencySvg } from "@/components/pages/rewards/helpers";
import { Drawer } from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import GreenBatteryFullImage from "@/public/assets/png/rewards/green-battery-full.webp";
import GreenBatteryHalfImage from "@/public/assets/png/rewards/green-battery-half.webp";
import EnergyIcon from "@/public/assets/svg/energy.svg";
import ClockIcon from "@/public/assets/svg/rewards/clock.svg";
import { useUpgradeBooster } from "@/services/rewards/queries";
import {
  CapacityBooster,
  RecoveryBooster,
  UpgradeBoosterType,
} from "@/services/rewards/types";
import { formatValue } from "@/utils/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

import { RecoveryEnergyModal } from "./components/recovery-energy-modal/RecoveryEnergyModal";
import { ReserveEnergyModal } from "./components/reserve-energy-modal/ReserveEnergyModal";

type Props = {
  capacity: CapacityBooster;
  recovery: RecoveryBooster;
  isAnimated: boolean;
};

const MAX_LEVEL_CARD = 10;

export const DefaultBoosters: FunctionComponent<Props> = ({
  capacity,
  recovery,
  isAnimated,
}) => {
  const queryClient = useQueryClient();
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const { handleSelectionChanged } = useHapticFeedback();
  const [isCapacityModalOpen, setIsCapacityModalOpen] = useState(false);
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);
  const [typeBooster, setTypeBooster] = useState<UpgradeBoosterType | null>(
    null,
  );
  const { profile } = useTelegram();
  const isCapacityAvailable = useMemo(
    () => capacity?.level < 10 && (profile?.coins ?? 0) > capacity.price,
    [capacity, profile],
  );
  const isRecoveryAvailable = useMemo(
    () => recovery?.level < 10 && (profile?.coins ?? 0) > recovery.price,
    [recovery, profile],
  );
  const { mutate, isPending } = useUpgradeBooster(queryClient);
  const isRecoveryDisabled = useMemo(
    () =>
      recovery?.level >= MAX_LEVEL_CARD ||
      recovery.price > (profile?.coins ?? 0),
    [recovery, profile],
  );
  const isCapacityDisabled = useMemo(
    () =>
      capacity?.level >= MAX_LEVEL_CARD ||
      capacity.price > (profile?.coins ?? 0),
    [capacity, profile],
  );

  const handleCapacityContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (capacity.level === MAX_LEVEL_CARD) return;

    if (!(e.target instanceof HTMLButtonElement)) {
      setIsCapacityModalOpen(true);
    }
  };

  const handleRecoveryContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (recovery.level === MAX_LEVEL_CARD) return;

    if (!(e.target instanceof HTMLButtonElement)) {
      setIsRecoveryModalOpen(true);
    }
  };

  const handleUseBoosterMutation = (
    event: MouseEvent<HTMLButtonElement>,
    type: UpgradeBoosterType,
  ) => {
    event.stopPropagation();

    setTypeBooster(type);

    const isAvailable =
      type === UpgradeBoosterType.CAPACITY
        ? isCapacityAvailable
        : isRecoveryAvailable;

    if (!isAvailable) return;

    handleSelectionChanged();

    mutate(type, {
      onSuccess: () => {
        toast(
          <Toast
            type="done"
            text={t(
              `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.SUCCESS_APPLY_BOOSTER}`,
            )}
          />,
        );
      },
      onError: (error) =>
        toast(<Toast type="destructive" text={error.message} />),
    });
  };

  const CapacityCurrencySvg = getCurrencySvg(capacity?.currence);
  const RecoveryCurrencySvg = getCurrencySvg(recovery?.currence);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-stroke-1 text-nowrap text-xl font-black leading-none tracking-[0.04em] text-white text-shadow-sm">
          {t(
            `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.DEFAULT}.${NS.PAGES.REWARDS.BOOSTERS.TITLE}`,
          )}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-550">
          <div className="text-nowrap rounded-[20px] bg-blue-700 px-3 py-1 text-xs font-black tracking-[0.04em] text-white">
            {2}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Drawer
          open={isCapacityModalOpen}
          onOpenChange={setIsCapacityModalOpen}
        >
          <div
            onClick={handleCapacityContainerClick}
            className="relative flex items-center justify-between gap-2 rounded-2xl bg-blue-700 p-3 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]"
          >
            <div className="grid grid-cols-[60px_1fr] items-center gap-3">
              <div className="relative flex size-15 items-center justify-center rounded-lg bg-gradient-to-b from-[#29D6FF] to-[#2596E4] p-1.5 shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]">
                <div
                  className={classNames("relative h-full w-full", {
                    "animate-tilt": isAnimated,
                  })}
                >
                  <Image src={GreenBatteryFullImage} alt="Energy image" fill />
                </div>
                {isAnimated && (
                  <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-xl">
                    <div className="absolute top-0 h-[140%] w-[66px] rotate-[30deg] animate-card-glow-running bg-card-glow-pattern will-change-transform" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-extrabold text-white">
                  {t(
                    `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.DEFAULT}.${NS.PAGES.REWARDS.BOOSTERS.ENERGY}`,
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <span className="self-start rounded-full bg-white/10 px-2.5 py-[5px] text-xs font-semibold text-gray-550">
                    {t(
                      `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.LEVEL}`,
                      {
                        num: capacity?.level || 0,
                      },
                    )}
                  </span>
                  {capacity?.level < MAX_LEVEL_CARD ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-white">
                      <EnergyIcon className="size-4" /> +
                      {capacity?.new - capacity?.current}
                    </span>
                  ) : (
                    <span className="!text-x !text-[#02DB07]">
                      {t(NS.PAGES.REWARDS.MAX_CARD_LEVEL)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {capacity?.level < MAX_LEVEL_CARD ? (
              <div className="pointer-events-auto w-26">
                <PrimaryButton
                  onClick={(e) =>
                    handleUseBoosterMutation(e, UpgradeBoosterType.CAPACITY)
                  }
                  isLoading={
                    isPending && typeBooster === UpgradeBoosterType.CAPACITY
                  }
                  disabled={isCapacityDisabled}
                  size="small"
                  className="text-stroke-1 text-sm font-extrabold text-shadow-sm"
                >
                  <div className="grid grid-cols-[16px_1fr] items-center gap-2">
                    <CapacityCurrencySvg className="size-4" />
                    {formatValue(+capacity?.price)}
                  </div>
                </PrimaryButton>
              </div>
            ) : null}
          </div>
          <ReserveEnergyModal
            onSubmit={handleUseBoosterMutation}
            disabled={isCapacityDisabled}
            capacity={capacity}
          />
        </Drawer>
        <Drawer
          open={isRecoveryModalOpen}
          onOpenChange={setIsRecoveryModalOpen}
        >
          <div
            onClick={handleRecoveryContainerClick}
            className="relative flex items-center justify-between gap-2 rounded-2xl bg-blue-700 p-3 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]"
          >
            <div className="grid grid-cols-[60px_1fr] items-center gap-3">
              <div className="relative flex size-15 items-center justify-center rounded-lg bg-gradient-to-b from-[#29D6FF] to-[#2596E4] p-1.5 shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]">
                <div
                  className={classNames("relative h-full w-full", {
                    "animate-tilt": isAnimated,
                  })}
                >
                  <Image src={GreenBatteryHalfImage} alt="Energy image" fill />
                </div>
                {isAnimated && (
                  <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-xl">
                    <div className="absolute top-0 h-[140%] w-[66px] rotate-[30deg] animate-card-glow-running bg-card-glow-pattern will-change-transform" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-extrabold text-white">
                  {t(
                    `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.DEFAULT}.${NS.PAGES.REWARDS.BOOSTERS.RECOVERY_ENERGY}`,
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <span className="self-start rounded-full bg-white/10 px-2.5 py-[5px] text-xs font-semibold text-gray-550">
                    {t(
                      `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.LEVEL}`,
                      { num: recovery?.level || 0 },
                    )}
                  </span>
                  {recovery?.level < MAX_LEVEL_CARD ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-white">
                      <ClockIcon className="size-4" />
                      {(recovery?.new - recovery?.current).toFixed(2)} c
                    </span>
                  ) : (
                    <span className="!text-x !text-[#02DB07]">
                      {t(NS.PAGES.REWARDS.MAX_CARD_LEVEL)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {recovery?.level < MAX_LEVEL_CARD ? (
              <div className="pointer-events-auto w-26">
                <PrimaryButton
                  onClick={(e) =>
                    handleUseBoosterMutation(e, UpgradeBoosterType.RECOVERY)
                  }
                  isLoading={
                    isPending && typeBooster === UpgradeBoosterType.RECOVERY
                  }
                  disabled={isRecoveryDisabled}
                  size="small"
                  className="text-stroke-1 text-sm font-extrabold text-shadow-sm"
                >
                  <div className="grid grid-cols-[16px_1fr] items-center gap-2">
                    <RecoveryCurrencySvg className="size-4" />
                    {formatValue(+recovery?.price)}
                  </div>
                </PrimaryButton>
              </div>
            ) : null}
          </div>
          <RecoveryEnergyModal
            disabled={isRecoveryDisabled}
            onSubmit={handleUseBoosterMutation}
            recoveryBooster={recovery}
          />
        </Drawer>
      </div>
    </div>
  );
};
