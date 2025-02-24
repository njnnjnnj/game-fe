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
import BatteryImage from "@/public/assets/png/rewards/full-energy.webp";
import { invalidateProfileQuery } from "@/services/profile/queries";
import {
  invalidateBoostersQuery,
  useTempEnergyBooster,
} from "@/services/rewards/queries";
import { TempEnergyBooster } from "@/services/rewards/types";
import { useBuyShopItem, useGetShop } from "@/services/shop/queries";
import { ShopItem, ShopItemTypeEnum } from "@/services/shop/types";
import { useQueryClient } from "@tanstack/react-query";

import { PremiumBoosterModal } from "./components/premium-booster-modal/PremiumBoosterModal";

type Props = {
  booster: TempEnergyBooster;
  isAnimated?: boolean;
};

export const PremiumBoosters: FunctionComponent<Props> = ({
  isAnimated,
  booster,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile } = useTelegram();
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const { handleSelectionChanged } = useHapticFeedback();
  const queryClient = useQueryClient();
  const { data } = useGetShop();
  const { mutate } = useTempEnergyBooster(queryClient);
  const { mutate: mutateBuyShopItem } = useBuyShopItem();
  const [isRequesting, setRequesting] = useState(false);
  const [selectedBooster, setSelectedBooster] = useState<ShopItem | null>(null);

  const boosterShopItems = useMemo(
    () => data?.items.filter((item) => item.type === ShopItemTypeEnum.BOOSTER),
    [data],
  );

  const handlePlankClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!(e.target instanceof HTMLButtonElement)) {
      setIsModalOpen(true);
    }
  };

  const handleUseBoosterMutation = (
    event: MouseEvent<HTMLButtonElement>,
    amount?: number,
  ) => {
    event.stopPropagation();
    setRequesting(true);
    handleSelectionChanged();

    mutate(amount ?? 1, {
      onSuccess: () => {
        invalidateBoostersQuery(queryClient);
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
      onSettled: () => setRequesting(false),
    });
  };

  const handleBoosterClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (selectedBooster) {
      handleBuyBooster(selectedBooster.id, () => setSelectedBooster(null));
    } else if (booster.amount > 0) {
      handleUseBoosterMutation(e);
    }
  };

  const handleBuyBooster = (id: number, onSuccess?: () => void) => {
    setRequesting(true);
    mutateBuyShopItem(id, {
      onSuccess: async () => {
        await mutate(selectedBooster?.amount ?? 1, {
          onSuccess: async () => {
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

        invalidateBoostersQuery(queryClient);
        invalidateProfileQuery(queryClient);
        handleSelectionChanged();

        toast(
          <Toast
            type="done"
            text={t(
              `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.SUCCESS_BUY_BOOSTER}`,
            )}
          />,
        );
        if (onSuccess) onSuccess();
      },
      onError: (error) =>
        toast(<Toast type="destructive" text={error.message} />),
      onSettled: () => setRequesting(false),
    });
  };

  const handleUseBooster = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!booster?.amount) {
      setIsModalOpen(true);
    } else {
      handleUseBoosterMutation(event);
    }
  };

  const handleSelectBooster = (booster: ShopItem) =>
    setSelectedBooster(booster);

  return (
    <Drawer
      open={isModalOpen}
      onOpenChange={(open) => {
        setIsModalOpen(open);
        if (!open) {
          setSelectedBooster(null);
        }
      }}
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-stroke-1 text-nowrap text-xl font-black leading-none tracking-[0.04em] text-white text-shadow-sm">
            {t(
              `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.PREMIUM}.${NS.PAGES.REWARDS.BOOSTERS.TITLE}`,
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
            <div className="relative flex size-15 items-center justify-center rounded-lg bg-gradient-to-b from-[#EE84FF] to-[#7740F5] p-1.5 shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]">
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
                  `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.PREMIUM}.${NS.PAGES.REWARDS.BOOSTERS.ENERGY_BOOSTERS}`,
                )}
              </span>
              <div className="self-start rounded-full bg-white/10 px-2.5 py-[5px] text-xs font-semibold text-gray-550">
                {t(
                  `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.AVAILABLE}`,
                )}
              </div>
            </div>
          </div>
          <div className="pointer-events-auto w-[122px]">
            <PrimaryButton
              onClick={handleUseBooster}
              size="small"
              isLoading={isRequesting}
              color={!booster?.amount ? "primary" : "secondary"}
              buttonClassName="relative z-50"
              className="text-stroke-1 text-xs font-extrabold text-shadow-sm"
            >
              {!booster?.amount
                ? t(
                    `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.BUY}`,
                  )
                : t(
                    `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.APPLY}`,
                  )}
            </PrimaryButton>
          </div>
        </div>
      </div>
      <PremiumBoosterModal
        onSubmit={handleBoosterClick}
        selectedBooster={selectedBooster}
        setSelectedBooster={handleSelectBooster}
        currentEnergy={profile?.energy ?? 0}
        maxEnergy={profile?.max_energy ?? 1}
        endTime={booster.end}
        boosterShopItems={boosterShopItems ?? []}
        amount={booster.amount}
        isRequesting={isRequesting}
      />
    </Drawer>
  );
};
