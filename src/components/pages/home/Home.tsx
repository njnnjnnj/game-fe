import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import { toast } from "sonner";

import { PageWrapper, ProfileHeader } from "@/components/common";
import { HeroView } from "@/components/hs-shared";
import { Drawer } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import { useTelegram } from "@/context";
import MainImage from "@/public/assets/png/main-bg.webp";
import SlotsSVG from "@/public/assets/svg/slots.svg";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import {
  invalidateOfflineBonusQuery,
  useConfirmOfflineBonus,
  useGetOfflineBonus,
} from "@/services/offline-bonus/queries";
import { OfflineBonus } from "@/services/offline-bonus/types";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";
import { useQueryClient } from "@tanstack/react-query";

import { OfflineBonusModal } from "./components/offline-bonus-modal/OfflineBonusModal";

export const Home = () => {
  const queryClient = useQueryClient();
  const t = useTranslations(NS.PAGES.HOME.ROOT);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  console.log("🚀 ~ Home ~ clickCount:", clickCount);
  const { data: offlineBonus, isLoading } = useGetOfflineBonus();
  const { mutate, isPending } = useConfirmOfflineBonus(queryClient);
  const { webApp, profile } = useTelegram();
  const { data: allAppsHeroes } = useGetAllAppsHeroes();

  useEffect(() => {
    if (offlineBonus?.reward && !isClaimed) {
      setIsModalOpen(true);
    }
  }, [offlineBonus, isClaimed]);

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
            <div className="grid grid-cols-2 gap-2">
              <Link href={ROUTES.BATTLE_PASS} className="w-45">
                <button className="text-stroke-1 drop-shadow-home-button relative flex w-full items-center gap-2 rounded-xl border border-solid border-black bg-[#0932A4] pb-1 font-black text-white transition-all text-shadow-sm active:scale-[0.98]">
                  <div className="flex w-full justify-center rounded-xl bg-gradient-to-b from-[#04A0F5] to-[#0A4CDE] px-4 py-[15px]">
                    <span className="leading-none">Battle Pass</span>
                  </div>
                </button>
              </Link>
              <Link href={ROUTES.SLOT_MACHINE} className="w-45">
                <button className="text-stroke-1 drop-shadow-home-button relative flex w-full items-center gap-2 rounded-xl border border-solid border-black bg-[#0932A4] pb-1 font-black text-white transition-all text-shadow-sm active:scale-[0.98]">
                  <div className="flex w-full justify-end rounded-xl bg-gradient-to-b from-[#04A0F5] to-[#0A4CDE] px-4 py-[15px]">
                    <SlotsSVG className="absolute -top-2 left-2" />
                    <span className="ml-20 leading-none">
                      {t(NS.PAGES.HOME.SLOTS)}
                    </span>
                  </div>
                </button>
              </Link>
            </div>
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
