/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import classNames from "classnames";
import Cookies from "js-cookie";
import throttle from "lodash.throttle";
import { toast } from "sonner";

import { PageWrapper, ProfileHeader } from "@/components/common";
import { HeroView } from "@/components/hs-shared";
import { Drawer } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { useTelegram } from "@/context";
import MainImage from "@/public/assets/png/main-bg.webp";
import { useGetBattlePass } from "@/services/battle-pass/queries";
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
import { SideLink } from "./components/side-link/SideLink";

export const Home = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const { data: offlineBonus, isLoading } = useGetOfflineBonus();
  const { mutate, isPending } = useConfirmOfflineBonus(queryClient);
  const { webApp, profile } = useTelegram();
  const [energy, setEnergy] = useState(profile?.energy ?? 0);
  const [profileBalance, setProfileBalance] = useState(profile?.coins ?? 0);
  const { data } = useGetBattlePass();
  console.log("🚀 ~ Home ~ data:", data);
  const { data: allAppsHeroes } = useGetAllAppsHeroes();
  const { mutate: setClicker } = useClicker();
  const clickCountRef = useRef(0);

  const throttledSetClicker = useRef(
    throttle(() => {
      const clicks = clickCountRef.current;
      if (clicks > 0) {
        const unixTimeInSeconds = Math.floor(Date.now() / 1000);
        const token = Cookies.get(AUTH_COOKIE_TOKEN) || "";

        setClicker(
          {
            debouncedClickCount: clicks,
            unixTimeInSeconds,
            token,
          },
          {
            onSuccess: () => {
              invalidateProfileQuery(queryClient);
              clickCountRef.current = 0;
            },
            onError: (error) => {
              toast.error(error.message);
            },
          },
        );
      }
    }, 5000),
  ).current;

  const handleClick = useCallback(() => {
    setEnergy((prev) => prev - (profile?.reward_per_tap ?? 1));
    setProfileBalance(
      (prevBalance) => prevBalance + (profile?.reward_per_tap ?? 1),
    );

    clickCountRef.current += 1;
    throttledSetClicker();
  }, []);

  useEffect(() => {
    if (offlineBonus?.reward && !isClaimed) {
      setIsModalOpen(true);
    }
  }, [offlineBonus, isClaimed]);

  if (!webApp || !profile || !allAppsHeroes) return null;

  const { current, ...heroCloth } = profile?.character;

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
          <ProfileHeader className="top-0 z-20 w-full" hasFriendsBlock />
          <BalanceInfo
            balance={profileBalance}
            perHour={profile.reward_per_hour}
            perTap={profile.reward_per_tap}
          />
          <div className="relative z-20 flex w-full flex-1 flex-col items-center justify-center px-4 pb-32">
            <div className="absolute left-4 top-15 z-40 flex flex-col gap-[22px]">
              <SideLink />
              <SideLink />
              <SideLink />
            </div>
            <button
              onClick={handleClick}
              className="user-select-none relative flex h-full w-full transform-gpu touch-manipulation items-center justify-center transition-all active:scale-[0.98]"
            >
              <HeroView
                className="user-select-none pointer-events-none aspect-[0.72] h-full touch-none"
                source="preview"
                heroCloth={heroCloth}
                heroId={current}
                heroRarity={allAppsHeroes[current].rarity}
              />
            </button>
            <div className="absolute right-4 top-15 z-40 flex flex-col gap-[22px]">
              <SideLink />
              <SideLink />
              <SideLink />
            </div>
            <EnergyBar energy={energy} max_energy={profile.max_energy} />
            <SecondaryNavbar
              currentExp={profile.exp}
              needExp={profile.need_exp}
              currentLevel={profile.level}
            />
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
