import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";

import { NS } from "@/constants/ns";
import ArrowSVG from "@/public/assets/svg/top-players/arrow.svg";
import { Leader } from "@/services/leaderboard/types";

import { ListItem } from "./components/list-item/ListItem";
import { Tape } from "./components/tape/Tape";

type Props = {
  leaders: Leader[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
};

export const PlayersList: FunctionComponent<Props> = ({
  leaders,
  fetchNextPage,
  hasNextPage,
  isLoading,
}) => {
  const t = useTranslations(NS.PAGES.TOP_PLAYERS.ROOT);
  const MAX_TOP_RECORDS = 300;
  const NUMBER_OF_WINNERS = 10;
  const START_INDEX_FOR_DOWNGRADE_LEAGUE = 50;
  const handleFetchNextPage = () => {
    if (leaders.length >= MAX_TOP_RECORDS) return;
    fetchNextPage();
  };

  return (
    <div
      className={classNames(
        "relative z-10 px-4",
        "after:absolute after:left-0 after:top-2 after:z-0 after:h-32 after:w-full after:rounded-[50%] after:bg-[radial-gradient(rgba(68,194,253,1)_0%,rgba(219,157,255,1)_30%)] after:bg-top after:blur-3xl",
      )}
    >
      <div className="relative top-6 z-30 flex justify-center">
        <Tape className="drop-shadow-tape" />
        <div
          className={classNames(
            "text-stroke-1 absolute inset-0 z-30 flex items-center justify-center pb-4 text-center text-2xl font-extrabold leading-4 tracking-wide text-white text-shadow-sm",
          )}
        >
          {t(`${NS.PAGES.TOP_PLAYERS.BEST_PLAYERS}`)}
        </div>
      </div>
      <InfiniteScroll
        style={{ overflow: "visible" }}
        dataLength={leaders.length}
        next={handleFetchNextPage}
        hasMore={hasNextPage}
        loader={<></>}
        scrollableTarget="top-players"
      >
        <div className="top-list-shadows relative z-20 flex w-full flex-col items-center rounded-t-4xl bg-top-players-list-pattern px-2 pb-3 pt-5">
          <span
            className={classNames(
              "top-players-badge text-stroke-1 relative mb-2 inline-block self-center rounded-md bg-[#C18700] px-5 py-1 font-extrabold leading-none text-white text-shadow-sm",
              "after:absolute after:left-[3px] after:right-[3px] after:top-[3px] after:h-2.5 after:rounded-t-sm after:bg-white after:opacity-20 after:content-['']",
            )}
          >
            Топ 3
          </span>
          <div className="flex w-full flex-col gap-2 rounded-[20px] bg-[#C18700] px-2 py-3 shadow-leaderbord-list-pattern">
            <ListItem leader={leaders[0]} isLoading={isLoading} />
            <ListItem leader={leaders[1]} isLoading={isLoading} />
            <ListItem leader={leaders[2]} isLoading={isLoading} />
          </div>
        </div>
        <div className="top-players-list-inset-shadows flex w-full flex-col gap-2 rounded-b-4xl bg-black/50 px-4 pb-5 pt-3">
          {isLoading
            ? Array(7)
                .fill(null)
                .map((index) => (
                  <ListItem key={index} isLoading leader={{} as Leader} />
                ))
            : leaders.slice(3).map((leader) => (
                <>
                  <ListItem
                    key={`leaderboard_${leader.rank}`}
                    leader={leader}
                    isLoading={isLoading}
                  />
                  {leader.rank === NUMBER_OF_WINNERS && (
                    <div className="my-2 flex items-center justify-center gap-3 border-b border-solid border-white/20 pb-2">
                      <ArrowSVG className="size-6 fill-[#44C2FD]" />
                      <span className="font-extrabold uppercase tracking-wide text-[#44C2FD]">
                        WINNERS
                      </span>
                      <ArrowSVG className="size-6 fill-[#44C2FD]" />
                    </div>
                  )}
                  {leader.rank === START_INDEX_FOR_DOWNGRADE_LEAGUE && (
                    <div className="my-2 flex items-center justify-center gap-3 border-b border-solid border-white/20 pb-2">
                      <ArrowSVG className="size-6 rotate-180 fill-[#FDE333]" />
                      <span className="font-extrabold uppercase tracking-wide text-[#FDE333]">
                        GOLD League
                      </span>
                      <ArrowSVG className="size-6 rotate-180 fill-[#FDE333]" />
                    </div>
                  )}
                </>
              ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
