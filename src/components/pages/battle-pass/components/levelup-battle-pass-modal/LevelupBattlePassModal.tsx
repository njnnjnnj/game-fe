import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { toast } from "sonner";

import { CollectButton, CollectButtonColor } from "@/components/ui";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useSafeStarsPayment } from "@/hooks/useSafeStarsPayment";
import LevelImg from "@/public/assets/png/battle-pass/level-s.webp";
import CloseIcon from "@/public/assets/svg/close.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import {
  useGetBattlePass,
  useGetBattlePassConfig,
  useLevelupBattlePass,
} from "@/services/battle-pass/queries";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import { getImgByReward } from "@/utils/rewards";

type Props = {
  onClose: () => void;
};

const LEVELUP_PRICE = 200;

export const LevelupBattlePassModal: FunctionComponent<Props> = ({
  onClose,
}) => {
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);
  const { data: battlePassInfo, refetch: refetchBattlePass } =
    useGetBattlePass();
  const { data: battlePassConfig } = useGetBattlePassConfig();
  const { data: heroes } = useGetAllAppsHeroes();
  const { mutate: levelupBattlepass, isPending: isLevelingBattlePass } =
    useLevelupBattlePass();

  const handleLevelupBattlePass = () => {
    levelupBattlepass(undefined, {
      onSuccess: () => {
        refetchBattlePass();
        onClose();

        toast(
          <Toast
            type="done"
            text={`You've successfully leveled up Battle Pass`}
          />,
        );
      },
      onError: (error) => {
        toast(
          <Toast
            type="destructive"
            text={`Leveling up Battle Pass has failed: ${error.message}`}
          />,
        );
      },
    });
  };

  const { buy: tryLevelupBattlePass, isStarsPaymentLoading } =
    useSafeStarsPayment(
      () => {
        handleLevelupBattlePass();
      },
      () => {
        handleLevelupBattlePass();
      },
    );

  if (!battlePassInfo || !battlePassConfig) return null;

  const currentLevel = battlePassInfo.current_level;
  const { free, paid } = battlePassConfig;

  const freeItem = free[currentLevel + 1];
  const paidItem = paid[currentLevel + 1];
  const FreeItemImage = heroes
    ? getImgByReward(freeItem.type, freeItem.value, heroes)
    : undefined;
  const PaidItemImage = heroes
    ? getImgByReward(paidItem.type, paidItem.value, heroes)
    : undefined;

  return (
    <DrawerContent className="flex w-full flex-col items-center rounded-t-3xl border-none bg-gradient-to-b from-[#FFCE08] to-[#E88C0E] px-[5px] pb-0 pt-[5px] shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <div className="relative flex w-full flex-col items-center rounded-t-3xl bg-bp-levelup-bp-modal-pattern px-3 pb-7 pt-8 shadow-[0px_12px_6px_0px_#FFFFFF66_inset,0px_-8px_4px_0px_#00000033_inset]">
        <DrawerClose
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full"
          asChild
        >
          <CloseIcon />
        </DrawerClose>
        <div className="relative h-[148px] w-[148px]">
          <Image src={LevelImg} fill sizes="33vw" alt="" />
          <div className="text-stroke-2 absolute left-1/2 top-[34%] -translate-x-1/2 text-center text-3xl font-black text-white text-shadow">
            {currentLevel + 1}
          </div>
        </div>
        <DrawerTitle className="!text-stroke-2 mb-3 whitespace-pre-wrap text-center !text-2xl !font-black uppercase !tracking-wide text-white !text-shadow">
          {t(
            `${NS.PAGES.BATTLE_PASS.LEVELUP_MODAL.ROOT}.${NS.PAGES.BATTLE_PASS.LEVELUP_MODAL.TITLE}`,
          )}
        </DrawerTitle>

        <DrawerDescription className="mb-6 text-center text-sm font-medium leading-3 tracking-wide text-gray-550 text-white">
          {t(
            `${NS.PAGES.BATTLE_PASS.LEVELUP_MODAL.ROOT}.${NS.PAGES.BATTLE_PASS.LEVELUP_MODAL.DESCRIPTION}`,
          )}
        </DrawerDescription>

        <div className="flex w-full flex-col items-center">
          <div className="mb-6 grid w-full grid-cols-4 gap-2">
            <div className="col-start-2 shrink-0 rounded-lg bg-black/40 p-0.5 shadow-[0px_2px_4px_0px_#00000066_inset,0px_-2px_4px_0px_#00000033_inset,0px_1px_1px_0px_#FFFFFF66]">
              <div className="relative pt-[100%]">
                {FreeItemImage && (
                  <Image src={FreeItemImage} alt="" sizes="25vw" fill />
                )}
                <div className="text-stroke-2 absolute bottom-1 w-full text-center text-lg font-black text-white text-shadow">
                  x1
                </div>
              </div>
            </div>
            <div className="shrink-0 rounded-lg bg-black/40 p-0.5 shadow-[0px_2px_4px_0px_#00000066_inset,0px_-2px_4px_0px_#00000033_inset,0px_1px_1px_0px_#FFFFFF66]">
              <div className="relative pt-[100%]">
                {!battlePassInfo.is_paid && (
                  <CollectButton
                    className="absolute -top-4 left-1/2 z-10 -translate-x-1/2"
                    color={CollectButtonColor.YELLOW}
                    isLocked
                  />
                )}
                {PaidItemImage && (
                  <Image src={PaidItemImage} alt="" sizes="25vw" fill />
                )}
                <div className="text-stroke-2 absolute bottom-1 w-full text-center text-lg font-black text-white text-shadow">
                  x1
                </div>
              </div>
            </div>
          </div>
          <PrimaryButton
            className="text-stroke-1 w-full uppercase text-shadow-sm"
            color="yellow"
            isLoading={isStarsPaymentLoading || isLevelingBattlePass}
            onClick={() => tryLevelupBattlePass(LEVELUP_PRICE)}
          >
            <div className="flex items-center gap-x-1">
              {t(
                `${NS.PAGES.BATTLE_PASS.BUTTONS.ROOT}.${NS.PAGES.BATTLE_PASS.BUTTONS.MODALS_BUY}`,
              )}
              <StarSVG
                className="ml-1"
                width="28px"
                height="28px"
                viewBox="0 0 29 29"
              />
              {LEVELUP_PRICE}
            </div>
          </PrimaryButton>
        </div>
      </div>
    </DrawerContent>
  );
};
