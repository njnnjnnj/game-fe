import { useEffect, useState } from "react";

import Image from "next/image";

import { toast } from "sonner";

import { PageWrapper, ProfileHeader } from "@/components/common";
import { Drawer } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import MainImage from "@/public/assets/png/main-bg.webp";
import {
  invalidateOfflineBonusQuery,
  useConfirmOfflineBonus,
  useGetOfflineBonus,
} from "@/services/offline-bonus/queries";
import { OfflineBonus } from "@/services/offline-bonus/types";
import { useQueryClient } from "@tanstack/react-query";

import { Navbar } from "./components/navbar/Navbar";
import { OfflineBonusModal } from "./components/offline-bonus-modal/OfflineBonusModal";

export const Home = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const { data: offlineBonus, isLoading } = useGetOfflineBonus();
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
        <div className="relative flex h-screen max-h-screen w-full flex-col items-center overflow-hidden overflow-y-auto overscroll-contain bg-blue-800">
          <div className="fixed inset-0 z-10 h-full w-full">
            <Image src={MainImage} alt="main-bg" fill />
          </div>
          <ProfileHeader className="top-0 z-20 pt-4" />
          <Navbar />
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
