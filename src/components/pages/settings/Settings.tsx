import { FC, useEffect, useMemo, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { PageWrapper } from "@/components/common";
import { Drawer } from "@/components/ui/drawer";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useModalVisibility } from "@/hooks/useModalVisibility";
import WalletIcon from "@/public/assets/svg/wallet.svg";
import { useDeleteWallet, useSetWallet } from "@/services/profile/queries";
import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

import { LevelIndicator } from "./components/level-indicator/LevelIndicator";
import { ProfileBalance } from "./components/profile-balance/ProfileBalance";
import { ProfileHeader } from "./components/profile-header/ProfileHeader";
import { ProfileLink } from "./components/profile-link/ProfileLink";
import { TonDisconnectModal } from "./components/ton-disconnect-modal/TonDisconnectModal";
import { PROFILE_BALANCE_ITEMS } from "./constants";

export const Settings: FC = () => {
  const t = useTranslations(NS.PAGES.SETTINGS.ROOT);
  const buttonRef = useRef(null);
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const rawAddress = useTonAddress(false);
  const wallet = useTonWallet();
  const { mutate: setWalletMutate } = useSetWallet();
  const { mutate: deleteWalletMutate } = useDeleteWallet();

  const { isModalVisible } = useModalVisibility();
  const { webApp, profile } = useTelegram();
  const progress = useMemo(
    () => ((Number(profile?.exp) / Number(profile?.need_exp)) * 100).toFixed(0),
    [profile],
  );
  const [isTonDisconnectModalVisible, setTonDisconnectModalVisible] =
    useState(false);

  const { handleSelectionChanged } = useHapticFeedback();

  const handleOpenTon = () => {
    handleSelectionChanged();
    tonConnectUI?.openModal();
  };

  const handleDisconnect = () => {
    handleSelectionChanged();
    tonConnectUI?.disconnect();
    deleteWalletMutate();
  };

  useEffect(() => {
    if (address.length) {
      setWalletMutate({
        address: rawAddress,
        userfriendly: address,
        chain: String(wallet?.account.chain),
        publickey: String(wallet?.account.publicKey),
      });
    }
  }, [address]);

  const { first_name, photo_url } = webApp?.initDataUnsafe.user || {};

  return (
    <PageWrapper className="bg-settings-pattern pt-10">
      <Drawer
        open={isTonDisconnectModalVisible}
        onOpenChange={setTonDisconnectModalVisible}
      >
        <div className="relative flex flex-col items-center">
          <div className="h-34" />
          <div className="w-full">
            <div
              className={classNames(
                "transform rounded-t-[32px] bg-blue-800 transition-all duration-500 ease-in-out",
                isModalVisible ? "translate-y-0" : "translate-y-20",
              )}
            >
              <div className={classNames("relative p-4 pt-[78px]")}>
                <ProfileHeader
                  first_name={first_name || ""}
                  photo_url={photo_url || ""}
                />
                <LevelIndicator
                  currentLevel={profile?.level || 1}
                  progress={+progress}
                />
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={classNames(
                    "group mb-6 h-14 w-full cursor-pointer overflow-hidden rounded-2xl border border-black bg-[#0655a4] pb-[3px]",
                    { "bg-[rgb(27,48,68)]": address.length },
                  )}
                  onClick={() =>
                    address
                      ? setTonDisconnectModalVisible(true)
                      : handleOpenTon()
                  }
                  ref={buttonRef}
                >
                  <div
                    className={classNames(
                      "shadow-inner-btn flex h-full w-full items-center justify-center rounded-xl bg-[#0075ff] p-[3px] pb-1",
                      {
                        "shadow-inner-btn bg-[#1B3044]": address.length,
                      },
                    )}
                  >
                    <div
                      className={classNames(
                        "shadow-a flex h-full w-full items-center rounded-xl p-3",
                        address.length
                          ? "justify-between bg-white/5"
                          : "justify-center bg-white/20",
                      )}
                    >
                      {address.length ? (
                        <>
                          <div className="flex h-full w-full flex-row items-center justify-start gap-x-2 text-sm">
                            <WalletIcon />
                            <p className="text-shadowed flex items-center font-extrabold uppercase leading-none tracking-wide text-white">
                              {t(
                                `${NS.PAGES.SETTINGS.WALLET.ROOT}.${NS.PAGES.SETTINGS.WALLET.TITLE}`,
                              )}
                            </p>
                          </div>
                          <p className="text-nowrap text-sm font-black tracking-wide text-white/30">
                            {`${address.slice(0, 5)}...${address.slice(-5)}`}
                          </p>
                        </>
                      ) : (
                        <p className="text-stroke-half text-nowrap text-lg font-black uppercase leading-[19.8px] tracking-wide text-white text-shadow">
                          {t(
                            `${NS.PAGES.SETTINGS.WALLET.ROOT}.${NS.PAGES.SETTINGS.WALLET.CONNECT_WALLET}`,
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
                <ProfileBalance
                  items={PROFILE_BALANCE_ITEMS({
                    coins: profile?.coins ?? 0,
                    stars: profile?.stars ?? 0,
                    friends: profile?.friends ?? 0,
                  })}
                />
                <ProfileLink />
              </div>
            </div>
          </div>
        </div>
        <TonDisconnectModal
          isOpen={isTonDisconnectModalVisible}
          onClose={() => setTonDisconnectModalVisible(false)}
          onDisconnect={handleDisconnect}
        />
      </Drawer>
    </PageWrapper>
  );
};
