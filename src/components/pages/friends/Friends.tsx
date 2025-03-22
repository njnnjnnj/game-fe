import React, { UIEvent, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

import { PageWrapper, ProfileHeader } from "@/components/common";
import { Drawer } from "@/components/ui/drawer";
import { NS } from "@/constants/ns";
import { useGetReferrals } from "@/services/profile/queries";
import { IReferrals } from "@/services/profile/types";
import { useGetShop } from "@/services/shop/queries";
import { ShopItemTypeEnum } from "@/services/shop/types";

import { FriendsList } from "./components/friends-list/FriendsList";
import { InviteBoard } from "./components/invite-board/InviteBoard";
import { InviteButton } from "./components/invite-button/InviteButton";
import { InviteModal } from "./components/invite-modal/InviteModal";

export const Friends = () => {
  const t = useTranslations(NS.PAGES.FRIENDS.ROOT);
  const [bgScaleDelta, setBgScaleDelta] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: referralData,
    isPending: isPendingReferralData,
  } = useGetReferrals();
  const { data, isLoading: isLoadingShop } = useGetShop();
  const friendsShopItems = useMemo(
    () => data?.items.filter((item) => item.type === ShopItemTypeEnum.FRIENDS),
    [data],
  );

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.target as HTMLDivElement;

    if (scrollTop <= 0) {
      setBgScaleDelta(Math.abs(scrollTop) * 2);
    } else {
      setBgScaleDelta(0);
    }
  };

  return (
    <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
      <PageWrapper
        className="scroll-smooth bg-blue-800 pt-4"
        isLoading={isPendingReferralData || isLoadingShop}
        onScroll={onScroll}
      >
        <div
          className="pointer-events-none fixed inset-0 z-[1] bg-[url('/assets/png/friends/bg.webp')] bg-[length:125%] bg-center-top bg-no-repeat"
          style={{
            backgroundSize: `calc(125% + ${bgScaleDelta}px)`,
          }}
        />
        <div className="relative box-border flex h-[90%] flex-col">
          <div className="relative z-10 w-full">
            <ProfileHeader
              shopItemsForBuyFriends={friendsShopItems}
              hasFriendsBlock
            />
            <p className="text-stroke-1 mx-4 mt-6 w-48 text-justify font-rubik text-xl font-black uppercase leading-none text-white text-shadow-sm">
              {t(`${NS.PAGES.FRIENDS.PROPOSAL}`)}
            </p>
          </div>
          <div className="relative top-20 z-10 w-full flex-1 rounded-t-2xl bg-blue-800">
            <motion.div
              className="w-full rounded-t-2xl"
              initial={{ y: "0%" }}
              animate={{ y: "-16px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <InviteBoard referralsData={referralData || ({} as IReferrals)} />
              <FriendsList referralsData={referralData || ({} as IReferrals)} />
            </motion.div>
          </div>
          <InviteButton />
        </div>
        <InviteModal
          friendsShopItems={friendsShopItems || []}
          onClose={() => setIsModalOpen(false)}
        />
      </PageWrapper>
    </Drawer>
  );
};
