import React, { FunctionComponent, MouseEvent, useMemo, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import { toast } from "sonner";

import { Drawer } from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import BatteryImage from "@/public/assets/png/rewards/yellow-battery.webp";
import { useFullBooster } from "@/services/rewards/queries";
import { FullBooster } from "@/services/rewards/types";
import { useQueryClient } from "@tanstack/react-query";

import { EverydayBoosterModal } from "./components/everyday-booster-modal/EverydayBoosterModal";

type Props = {
  isAnimated: boolean;
  booster: FullBooster;
};

export const EverydayBoosters: FunctionComponent<Props> = ({
  isAnimated,
  booster,
}) => {
  const queryClient = useQueryClient();
  const { profile } = useTelegram();
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const { handleSelectionChanged } = useHapticFeedback();
  const PRICE = null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAvailable = useMemo(
    () =>
      booster?.amount > 0 &&
      Number(profile?.energy) < Number(profile?.max_energy),
    [booster, profile],
  );
  const { mutate } = useFullBooster(queryClient);

  const handlePlankClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!(e.target instanceof HTMLButtonElement)) {
      setIsModalOpen(true);
    }
  };

  const handleUseBoosterMutation = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!isAvailable) {
      toast(
        <Toast
          type="destructive"
          text={
            booster.amount === 0
              ? t(
                  `${NS.PAGES.REWARDS.TOASTS.ROOT}.${NS.PAGES.REWARDS.TOASTS.NOT_AVAILABLE}`,
                )
              : t(
                  `${NS.PAGES.REWARDS.TOASTS.ROOT}.${NS.PAGES.REWARDS.TOASTS.FULL_ENERGY}`,
                )
          }
        />,
      );
      return;
    }

    handleSelectionChanged();

    mutate(undefined, {
      onSuccess: () => {
        if (isModalOpen) setIsModalOpen(false);
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

  return (
    <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="flex items-center justify-between">
        <div className="text-stroke-1 text-nowrap text-xl font-black leading-none tracking-[0.04em] text-white text-shadow-sm">
          {t(
            `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.EVERYDAY}.${NS.PAGES.REWARDS.BOOSTERS.TITLE}`,
          )}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-550">
          <div className="text-nowrap rounded-[20px] bg-blue-700 px-3 py-1 text-xs font-black tracking-[0.04em] text-white">
            {1}
          </div>
        </div>
      </div>
      <div
        onClick={handlePlankClick}
        className={classNames(
          "relative z-10 mb-4 flex w-full items-center justify-between gap-2 rounded-2xl bg-blue-700 p-3 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]",
        )}
      >
        <div className="grid grid-cols-[60px_1fr] items-center gap-3">
          <div className="relative flex size-15 items-center justify-center rounded-lg bg-gradient-to-b from-[#FFE04E] to-[#F19F33] p-1.5 shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]">
            <div
              className={classNames("relative h-full w-full", {
                "animate-tilt": isAnimated,
              })}
            >
              <Image src={BatteryImage} alt="Energy image" fill />
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
                `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.EVERYDAY}.${NS.PAGES.REWARDS.BOOSTERS.FULL_ENERGY}`,
              )}
            </span>
            <div className="flex items-center gap-2">
              <span className="self-start rounded-full bg-white/10 px-2.5 py-[5px] text-xs font-semibold text-gray-550">
                {t(
                  `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.COUNT}`,
                  {
                    num1: booster?.amount,
                    num2: 5,
                  },
                )}
              </span>
              <span className="text-x font-medium text-gray-550">
                {t(
                  `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.AVAILABLE}`,
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="pointer-events-auto w-26">
          <PrimaryButton
            onClick={handleUseBoosterMutation}
            size="small"
            disabled={!isAvailable}
            color={PRICE ? "primary" : "secondary"}
            className={classNames(
              "text-stroke-1 text-sm font-extrabold uppercase text-shadow-sm",
              {
                "!bg-[#1B3044] text-xs": !isAvailable,
              },
            )}
            innerClassname={classNames({
              "!bg-[#1B3044]": !isAvailable,
            })}
          >
            {isAvailable
              ? t(
                  `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.APPLY}`,
                )
              : t(
                  `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.NOT_AVAILABLE}`,
                )}
          </PrimaryButton>
        </div>
      </div>
      <EverydayBoosterModal
        onSubmit={handleUseBoosterMutation}
        disabled={!isAvailable}
        currentEnergy={profile?.energy || 0}
        maxEnergy={profile?.max_energy || 0}
        amount={booster?.amount || 0}
      />
    </Drawer>
  );
};
