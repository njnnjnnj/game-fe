import React, { useState } from "react";

import { PageWrapper } from "@/components/common";
import { BottomMenu } from "@/components/common/bottom-menu/BottomMenu";
import {
  useGetBattlePass,
  useGetBattlePassConfig,
} from "@/services/battle-pass/queries";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";

import { BattlePassHeader } from "./components/battle-pass-header/BattlePassHeader";
import { BattlePassList } from "./components/battle-pass-list/BattlePassList";

export const BattlePass = () => {
  const [bgScaleDelta, setBgScaleDelta] = useState(0);

  const { isPending: isBattlePassPending } = useGetBattlePass();
  const { isPending: isBattlePassConfigPending } = useGetBattlePassConfig();
  const { isPending: isAllAppsHeroesPending } = useGetAllAppsHeroes();

  const onScroll = (e: Event) => {
    const { scrollTop } = e.target as HTMLDivElement;

    if (scrollTop <= 0) {
      setBgScaleDelta(Math.abs(scrollTop) * 2);
    } else {
      setBgScaleDelta(0);
    }
  };

  return (
    <PageWrapper
      className="bg-blue-800 pb-26 pt-[56.25%]"
      isLoading={isBattlePassPending || isBattlePassConfigPending || isAllAppsHeroesPending}
      disableSafeAreaInset
    >
      <BattlePassHeader bgScaleDelta={bgScaleDelta} />
      <BattlePassList onScroll={onScroll} />

      <BottomMenu />
    </PageWrapper>
  );
};
