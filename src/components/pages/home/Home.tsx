import { useEffect, useState } from "react";

import Link from "next/link";

import { toast } from "sonner";

import { PageWrapper } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { ROUTES } from "@/constants/routes";
import {
  invalidateOfflineBonusQuery,
  useConfirmOfflineBonus,
  useGetOfflineBonus,
} from "@/services/offline-bonus/queries";
import { OfflineBonus } from "@/services/offline-bonus/types";
import { useQueryClient } from "@tanstack/react-query";

import { OfflineBonusModal } from "./components/offline-bonus-modal/OfflineBonusModal";

export const Home = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const { data: offlineBonus, isLoading } = useGetOfflineBonus();
  console.log("🚀 ~ Home ~ offlineBonus:", offlineBonus);
  const { mutate, isPending } = useConfirmOfflineBonus(queryClient);

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

  useEffect(() => {
    if (offlineBonus?.reward && !isClaimed) {
      setIsModalOpen(true);
    }
  }, [offlineBonus, isClaimed]);

  return (
    <PageWrapper isLoading={isLoading}>
      <Drawer
        onClose={handleClose}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <div className="flex h-screen max-h-screen w-full flex-col items-center justify-center overflow-y-auto overscroll-contain bg-blue-800">
          <h1 className="text-stroke-1 mb-5 text-center text-3xl font-black tracking-wide text-white text-shadow">
            Главная страница
          </h1>
          <div className="flex flex-col gap-4">
            <Link href={ROUTES.ASSIGNMENTS}>
              <Button variant="link" className="w-full text-white">
                Задания
              </Button>
            </Link>
            <Link href={ROUTES.HEROES}>
              <Button variant="link" className="w-full text-white">
                Герои
              </Button>
            </Link>
            <Link href={ROUTES.SETTINGS}>
              <Button variant="link" className="w-full text-white">
                Настройки
              </Button>
            </Link>
            <Link href={ROUTES.BATTLE_PASS}>
              <Button variant="link" className="w-full text-white">
                Battle pass
              </Button>
            </Link>
            <Link href={ROUTES.FRIENDS}>
              <Button variant="link" className="w-full text-white">
                Friends
              </Button>
            </Link>

            <Link href={ROUTES.REWARDS}>
              <Button variant="link" className="w-full text-white">
                Rewards
              </Button>
            </Link>

            <Link href={ROUTES.TOP_PLAYERS}>
              <Button variant="link" className="w-full text-white">
                Top players
              </Button>
            </Link>

            <Link href={ROUTES.FORBIDDEN}>
              <Button variant="link" className="w-full text-white">
                Forbidden page
              </Button>
            </Link>

            <Link href={ROUTES.SLOT_MACHINE}>
              <Button variant="link" className="w-full text-white">
                Slot machine
              </Button>
            </Link>

            <DrawerTrigger asChild>
              <Button variant="link" className="w-full text-white">
                Offline bonus
              </Button>
            </DrawerTrigger>
            <OfflineBonusModal
              {...(offlineBonus ?? ({} as OfflineBonus))}
              isPending={isPending}
              onConfirm={handleConfirmOfflineBonus}
            />
          </div>
        </div>
      </Drawer>
    </PageWrapper>
  );
};
