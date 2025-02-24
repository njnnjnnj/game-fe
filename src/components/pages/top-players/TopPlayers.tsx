import React, { useState } from "react";

import { PageWrapper } from "@/components/common";
import { BottomMenu } from "@/components/common/bottom-menu/BottomMenu";
import { Drawer } from "@/components/ui/drawer";
import { useTelegram } from "@/context";
import { useInfiniteLeaderboard } from "@/services/leaderboard/queries";
import { LeaderboardEnum } from "@/services/leaderboard/types";
import { League } from "@/services/profile/types";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

import { LeagueInfo } from "./components/league-info/LeagueInfo";
import { PlayersList } from "./components/players-list/PlayersList";
import { RewardsBlock } from "./components/rewards-block/RewardsBlock";
import { RewardsModal } from "./components/rewards-modal/RewardsModal";
import { TimerBlock } from "./components/timer-block/TimerBlock";
import { TopPlayersHeader } from "./components/top-players-header/TopPlayersHeader";

export const TopPlayers = () => {
  const [league, setLeague] = useState(LeaderboardEnum.LEAGUE);
  const { webApp, profile } = useTelegram();

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteLeaderboard(league);
  if (!webApp) return null;

  const insetTop = getTgSafeAreaInsetTop(webApp);
  const calculatedPaddingTop = insetTop ? insetTop - 32 : 16;

  return (
    <PageWrapper
      className="bg-top-players-pattern pb-36"
      disableSafeAreaInset
      id="top-players"
    >
      <Drawer>
        <TopPlayersHeader
          league={league}
          webApp={webApp}
          onSetLeague={setLeague}
          paddingTop={calculatedPaddingTop}
        />
        <LeagueInfo
          insetTop={insetTop}
          league={profile?.league ?? League.BRONZE}
        />
        {!isLoading ? (
          <PlayersList
            leaders={data?.pages.flatMap((page) => page.leaders) || []}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        ) : null}
        <TimerBlock />
        <RewardsBlock />
        <BottomMenu />
        <RewardsModal league={profile?.league ?? League.BRONZE} />
      </Drawer>
    </PageWrapper>
  );
};
