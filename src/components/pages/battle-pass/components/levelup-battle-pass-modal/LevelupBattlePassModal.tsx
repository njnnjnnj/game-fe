import React from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { CollectButton, CollectButtonColor } from "@/components/ui";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import LevelImg from "@/public/assets/png/battle-pass/level.webp";
import StartChest from "@/public/assets/png/battle-pass/start-chest.webp";
import CloseIcon from "@/public/assets/svg/close.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { useGetBattlePass } from "@/services/battle-pass/queries";

export const LevelupBattlePassModal = () => {
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);
  const { data: battlePassInfo } = useGetBattlePass();
  // const { data: battlePassConfig } = useGetBattlePassConfig();

  if (!battlePassInfo) return null;

  const currentLevel = battlePassInfo.current_level;

  return (
    <DrawerContent className="flex w-full flex-col items-center rounded-t-3xl border-none bg-gradient-to-b from-[#FAD22C] to-[#FEEE3D] px-[5px] pb-0 pt-[5px] shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <div className="bg-bp-levelup-bp-modal-pattern relative flex w-full flex-col items-center rounded-t-3xl px-3 pb-7 pt-8">
        <DrawerClose
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full"
          asChild
        >
          <CloseIcon />
        </DrawerClose>
        <div className="relative h-25 w-25">
          <Image src={LevelImg} fill sizes="33vw" alt="" />
          <div className="text-stroke-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-black text-white text-shadow">
            {currentLevel}
          </div>
        </div>
        <DrawerTitle className="!text-stroke-2 mb-3 mt-6 whitespace-pre-wrap text-center !text-2xl !font-black uppercase !tracking-wide text-white !text-shadow">
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
          <div className="mb-6 flex w-full justify-center gap-2">
            <div className="aspect-square w-1/4 rounded-lg bg-black/40 p-2 shadow-[0px_2px_4px_0px_#00000066_inset,0px_-2px_4px_0px_#00000033_inset,0px_1px_1px_0px_#FFFFFF66]">
              <div className="relative h-full">
                <Image src={StartChest} alt="" sizes="25vw" fill />
                <div className="text-stroke-1 absolute bottom-1 w-full text-center text-lg font-black text-white text-shadow">
                  x1
                </div>
              </div>
            </div>
            <div className="aspect-square w-1/4 rounded-lg bg-black/40 p-2 shadow-[0px_2px_4px_0px_#00000066_inset,0px_-2px_4px_0px_#00000033_inset,0px_1px_1px_0px_#FFFFFF66]">
              <div className="relative h-full">
                {!battlePassInfo.is_paid && (
                  <CollectButton
                    className="absolute -top-4 left-1/2 z-10 -translate-x-1/2"
                    color={CollectButtonColor.YELLOW}
                    onClick={() => {}}
                    isLocked
                  />
                )}
                <Image src={StartChest} alt="" sizes="25vw" fill />
                <div className="text-stroke-1 absolute bottom-1 w-full text-center text-lg font-black text-white text-shadow">
                  x1
                </div>
              </div>
            </div>
          </div>
          <PrimaryButton
            className="text-stroke-1 w-full uppercase text-shadow-sm"
            color="yellow"
            isLoading={false}
            onClick={() => null}
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
              {"60"}
            </div>
          </PrimaryButton>
        </div>
      </div>
    </DrawerContent>
  );
};
