/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { toast } from "sonner";

import { PageWrapper, ProfileHeader, SideLink } from "@/components/common";
import { HeroView } from "@/components/hs-shared";
import { Drawer } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import { useTelegram } from "@/context";
import { useClickEffects } from "@/hooks/useClickEffects";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useThrottledClicker } from "@/hooks/useThrottledClicker";
import BeastImage from "@/public/assets/png/home/beast.webp";
import CupImage from "@/public/assets/png/home/cup.webp";
import FriendsImage from "@/public/assets/png/home/friends.webp";
import PacketImage from "@/public/assets/png/home/packet.webp";
import PrizeImage from "@/public/assets/png/home/prize.webp";
import TicketImage from "@/public/assets/png/home/ticker.webp";
import MainImage from "@/public/assets/png/main-bg.webp";
import { useGetBattlePass } from "@/services/battle-pass/queries";
import { BattlePassInfo } from "@/services/battle-pass/types";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import {
  invalidateOfflineBonusQuery,
  useConfirmOfflineBonus,
  useGetOfflineBonus,
} from "@/services/offline-bonus/queries";
import { OfflineBonus } from "@/services/offline-bonus/types";
import { useGetProfile } from "@/services/profile/queries";
import { useGetShop } from "@/services/shop/queries";
import { ShopItemTypeEnum } from "@/services/shop/types";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";
import { useQueryClient } from "@tanstack/react-query";

import { BalanceInfo } from "./components/balance-info/BalanceInfo";
import { EnergyBar } from "./components/energy-bar/EnergyBar";
import { OfflineBonusModal } from "./components/offline-bonus-modal/OfflineBonusModal";
import { SecondaryNavbar } from "./components/secondary-navbar/SecondaryNavbar";

export const Home = () => {
  const queryClient = useQueryClient();
  const t = useTranslations(NS.PAGES.HOME.ROOT);
  const { data: allAppsHeroes } = useGetAllAppsHeroes();
  const { refetch: refetchProfile } = useGetProfile();
  const { handleSelectionChanged } = useHapticFeedback();
  const {
    data: battlePass,
    isSuccess: isBattlePassSuccess,
    refetch: refetchBattlePass,
  } = useGetBattlePass();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [battlePassExp, setBattlePassExp] = useState(0);
  const { data: offlineBonus, isLoading } = useGetOfflineBonus();
  const { mutate, isPending } = useConfirmOfflineBonus(queryClient);
  const { webApp, profile } = useTelegram();
  const initialEnergy = profile?.energy ?? 0;
  const [energy, setEnergy] = useState(initialEnergy);
  const [profileBalance, setProfileBalance] = useState(profile?.coins ?? 0);
  const { data } = useGetShop();
  const friendsShopItems = useMemo(
    () => data?.items.filter((item) => item.type === ShopItemTypeEnum.FRIENDS),
    [data],
  );

  const { registerClick } = useThrottledClicker();
  const { clickEffects, handlePlusEvent: handleBattlePassPlusEvent } =
    useClickEffects(
      battlePass ?? ({} as BattlePassInfo),
      battlePassExp,
      setBattlePassExp,
    );
  const lastClickTimeRef = useRef<number>(0);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (energy < (profile?.reward_per_tap ?? 1)) return;
      handleSelectionChanged();

      setEnergy((prev) => prev - (profile?.reward_per_tap ?? 1));
      setProfileBalance(
        (prevBalance) => prevBalance + (profile?.reward_per_tap ?? 1),
      );

      handleBattlePassPlusEvent(event);

      registerClick();

      lastClickTimeRef.current = Date.now();
    },
    [energy, profile?.reward_per_tap, battlePass],
  );

  useEffect(() => {
    // Always refetch BP info when getting to this page
    refetchBattlePass({ cancelRefetch: false });

    return () => {
      // Refetch profile when leaving the page so that calculations are correct when user gets back to the page
      refetchProfile();
    };
  }, []);

  useEffect(() => {
    if (isBattlePassSuccess && battlePass) {
      setBattlePassExp(battlePass.current_exp);
    }
  }, [isBattlePassSuccess, battlePass]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastClick = Date.now() - lastClickTimeRef.current;

      if (timeSinceLastClick >= 3000) {
        refetchProfile().then(({ data }) => {
          if (data) {
            setEnergy(data.energy);
          }
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [queryClient, profile]);

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
        toast(
          <Toast
            type="done"
            text={t(
              `${NS.PAGES.HOME.OFFLINE_BONUS.ROOT}.${NS.PAGES.HOME.OFFLINE_BONUS.RECEIVED}`,
            )}
          />,
        );
        setIsModalOpen(false);
        setIsClaimed(true);
        Cookies.set("offlineBonusClaimed", "true", { expires: 1 / 24 });
      },
      onError: () =>
        toast(
          <Toast
            type="destructive"
            text={t(
              `${NS.PAGES.HOME.OFFLINE_BONUS.ROOT}.${NS.PAGES.HOME.OFFLINE_BONUS.ERROR}`,
            )}
          />,
        ),
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
              <SideLink
                image={BeastImage}
                href=""
                text={t(
                  `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.ACTION}`,
                )}
              />
              <SideLink
                image={TicketImage}
                href=""
                text={t(
                  `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.ACTION}`,
                )}
              />
              <SideLink
                image={PrizeImage}
                href={ROUTES.REWARDS}
                text={t(
                  `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.REWARDS}`,
                )}
              />
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
                    +{profile.reward_per_tap}
                  </motion.div>
                ))}
              </AnimatePresence>
            </button>
            <div className="absolute right-4 top-15 z-40 flex flex-col gap-[22px]">
              <SideLink
                image={CupImage}
                href={ROUTES.TOP_PLAYERS}
                text={t(
                  `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.TOP_PLAYERS}`,
                )}
              />
              <SideLink
                image={FriendsImage}
                href={ROUTES.FRIENDS}
                text={t(
                  `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.FRIENDS}`,
                )}
              />
              <SideLink
                image={PacketImage}
                href={ROUTES.SHOP_CLOTHES}
                text={t(
                  `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.CLOTHES}`,
                )}
              />
            </div>
            <EnergyBar energy={energy} max_energy={profile.max_energy} />
            <SecondaryNavbar
              currentExp={battlePassExp}
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
