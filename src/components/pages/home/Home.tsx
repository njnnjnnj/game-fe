/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import Image from "next/image";

import classNames from "classnames";
import Cookies from "js-cookie";
import { toast } from "sonner";

import { PageWrapper, ProfileHeader } from "@/components/common";
import { HeroView } from "@/components/hs-shared";
import { Drawer } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { useTelegram } from "@/context";
import MainImage from "@/public/assets/png/main-bg.webp";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import {
  invalidateOfflineBonusQuery,
  useConfirmOfflineBonus,
  useGetOfflineBonus,
} from "@/services/offline-bonus/queries";
import { OfflineBonus } from "@/services/offline-bonus/types";
import { invalidateProfileQuery, useClicker } from "@/services/profile/queries";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";
import { useQueryClient } from "@tanstack/react-query";

import { BalanceInfo } from "./components/balance-info/BalanceInfo";
import { EnergyBar } from "./components/energy-bar/EnergyBar";
import { OfflineBonusModal } from "./components/offline-bonus-modal/OfflineBonusModal";
import { SecondaryNavbar } from "./components/secondary-navbar/SecondaryNavbar";

export const Home = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [debouncedClickCount, setDebouncedClickCount] =
    useState<number>(clickCount);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { data: offlineBonus, isLoading } = useGetOfflineBonus();
  const { mutate, isPending } = useConfirmOfflineBonus(queryClient);
  const { webApp, profile } = useTelegram();
  const { data: allAppsHeroes } = useGetAllAppsHeroes();
  const { mutate: setClicker } = useClicker();

  useEffect(() => {
    if (offlineBonus?.reward && !isClaimed) {
      setIsModalOpen(true);
    }
  }, [offlineBonus, isClaimed]);

  useEffect(() => {
    localStorage.setItem("clickCount", JSON.stringify(clickCount));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setDebouncedClickCount(clickCount);
    }, 500);

    setTimeoutId(newTimeoutId);

    return () => {
      if (newTimeoutId) clearTimeout(newTimeoutId);
    };
  }, [clickCount]);

  useEffect(() => {
    if (debouncedClickCount > 0) {
      const unixTime = Math.floor(Date.now() / 1000);
      const token = Cookies.get(AUTH_COOKIE_TOKEN);

      setClicker(`${debouncedClickCount}:${unixTime}:${token}`, {
        onSuccess: () => {
          invalidateProfileQuery(queryClient);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  }, [debouncedClickCount]);

  if (!webApp || !profile || !allAppsHeroes) return null;

  const { current, ...heroCloth } = profile.character;

  const insetTop = getTgSafeAreaInsetTop(webApp);
  const calculatedPaddingTop = insetTop ? insetTop : 16;

  const handleConfirmOfflineBonus = () => {
    mutate(undefined, {
      onSuccess: () => {
        invalidateOfflineBonusQuery(queryClient);
        toast(<Toast type="done" text="Бонус получен" />);
        setIsModalOpen(false);
        setIsClaimed(true);
      },
      onError: (error) =>
        toast(<Toast type="destructive" text={error.message} />),
    });
  };

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    handleConfirmOfflineBonus();
  };

  return (
    <PageWrapper isLoading={isLoading} disableSafeAreaInset>
      <Drawer
        onClose={handleClose}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <div
          className={classNames(
            "relative flex h-screen max-h-screen w-full flex-col items-center overflow-hidden overflow-y-auto overscroll-contain bg-blue-800",
          )}
          style={{ paddingTop: `${calculatedPaddingTop}px` }}
        >
          <div className="fixed inset-0 z-10 h-full w-full">
            <Image src={MainImage} alt="main-bg" fill />
          </div>
          <ProfileHeader className="top-0 z-20" />
          <BalanceInfo
            balance={profile.coins}
            perHour={profile.reward_per_hour}
            perTap={profile.reward_per_tap}
          />
          <div className="relative z-20 flex w-full flex-1 flex-col items-center justify-center px-4 pb-32">
            <button
              onClick={handleClick}
              className="relative flex h-full w-full items-center justify-center transition-all active:scale-[0.98]"
            >
              <HeroView
                className="aspect-[0.72] w-[90%]"
                source="preview"
                heroCloth={heroCloth}
                heroId={current}
                heroRarity={allAppsHeroes[current].rarity}
              />
            </button>
            <EnergyBar
              energy={profile.energy}
              max_energy={profile.max_energy}
            />
            <SecondaryNavbar />
          </div>

          <OfflineBonusModal
            {...(offlineBonus ?? ({} as OfflineBonus))}
            isPending={isPending}
            onConfirm={handleConfirmOfflineBonus}
          />
        </div>
      </Drawer>
    </PageWrapper>
  );
};
