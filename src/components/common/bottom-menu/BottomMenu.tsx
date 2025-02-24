import React from "react";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";

export const BottomMenu = () => {
  const t = useTranslations(NS.COMMON.ROOT);
  const { back } = useRouter();

  return (
    <div className="fixed bottom-0 z-30 flex h-26 w-full justify-center bg-bp-bottom-menu-pattern py-3 shadow-bp-bottom-menu">
      <div className="h-14 w-[95px]">
        <PrimaryButton buttonClassName="h-full" onClick={back} fontSize={24}>
          {t(NS.COMMON.OK)}
        </PrimaryButton>
      </div>
    </div>
  );
};
