/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
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
import { useGetShop } from "@/services/shop/queries";
import { ShopItemTypeEnum } from "@/services/shop/types";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";
import { useQueryClient } from "@tanstack/react-query";

import { BalanceInfo } from "./components/balance-info/BalanceInfo";
import { EnergyBar } from "./components/energy-bar/EnergyBar";
import { OfflineBonusModal } from "./components/offline-bonus-modal/OfflineBonusModal";
import { SecondaryNavbar } from "./components/secondary-navbar/SecondaryNavbar";
import { SideLink } from "./components/side-link/SideLink";

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export const Home = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const timeoutRefs = useRef<{ [key: number]: NodeJS.Timeout }>({});
  const { data: offlineBonus, isLoading } = useGetOfflineBonus();
  const { mutate, isPending } = useConfirmOfflineBonus(queryClient);
  const { webApp, profile } = useTelegram();
  const [energy, setEnergy] = useState(profile?.energy ?? 0);
  const [profileBalance, setProfileBalance] = useState(profile?.coins ?? 0);
  const { data } = useGetShop();
  const friendsShopItems = useMemo(
    () => data?.items.filter((item) => item.type === ShopItemTypeEnum.FRIENDS),
    [data],
  );
  const { data: allAppsHeroes } = useGetAllAppsHeroes();
  const { data: battlePass } = useGetBattlePass();
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

  const handlePlusEvent = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { clientX, clientY, currentTarget } = event;
      const rect = currentTarget.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const id = Date.now();

      setClickEffects((prev) => [...prev, { id, x, y }]);

      timeoutRefs.current[id] = setTimeout(() => {
        setClickEffects((prev) => prev.filter((effect) => effect.id !== id));
        delete timeoutRefs.current[id];
      }, 1000);
    },
    [],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setEnergy((prev) => prev - (profile?.reward_per_tap ?? 1));
      setProfileBalance(
        (prevBalance) => prevBalance + (profile?.reward_per_tap ?? 1),
      );

      handlePlusEvent(event);

      clickCountRef.current += 1;
      throttledSetClicker();
    },
    [],
  );

  useEffect(() => {
    const offlineBonusClaimed = Cookies.get("offlineBonusClaimed");

    if (offlineBonus?.reward && !isClaimed && !offlineBonusClaimed) {
      setIsModalOpen(true);
    }
  }, [offlineBonus, isClaimed]);

  if (!webApp || !profile || !allAppsHeroes || !battlePass) return null;

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
        Cookies.set("offlineBonusClaimed", "true", { expires: 1 / 24 });
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
          <ProfileHeader
            className="top-0 z-20 w-full"
            hasFriendsBlock
            shopItemsForBuyFriends={friendsShopItems ?? []}
          />
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
              <AnimatePresence>
                {clickEffects.map(({ id, x, y }) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -150 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="text-stroke-1 pointer-events-none absolute z-50 select-none text-4xl font-black text-white text-shadow-sm"
                    style={{ top: y, left: x }}
                  >
                    +1
                  </motion.div>
                ))}
              </AnimatePresence>
            </button>
            <div className="absolute right-4 top-15 z-40 flex flex-col gap-[22px]">
              <SideLink />
              <SideLink />
              <SideLink />
            </div>
            <EnergyBar energy={energy} max_energy={profile.max_energy} />
            <SecondaryNavbar
              currentExp={battlePass.current_exp}
              needExp={battlePass.need_exp}
              currentLevel={battlePass.current_level}
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
