import React, { FunctionComponent, ReactNode } from "react";

import { ProfileHeader } from "@/components/common";
import { useTelegram } from "@/context";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

type Props = {
  HeroViewNode?: ReactNode;
  HeroStatsNode?: ReactNode;
};

export const HSProfile: FunctionComponent<Props> = ({
  HeroViewNode,
  HeroStatsNode,
}) => {
  const { webApp } = useTelegram();

  if (!webApp) return null;

  const insetTop = getTgSafeAreaInsetTop(webApp);

  return (
    <div
      className="relative aspect-[0.78] bg-[url('/assets/png/heroes/bg.webp')] bg-cover bg-no-repeat pt-28"
      style={insetTop ? { paddingTop: insetTop } : undefined}
    >
      <ProfileHeader />

      <div className="absolute bottom-[10%] w-full pt-[77%]">
        {HeroViewNode}
        {HeroStatsNode}
      </div>
    </div>
  );
};
