import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { PageWrapper, ProfileHeader } from "@/components/common";
import { RewardScreen } from "@/components/common/reward-screen/RewardScreen";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  useGetAllAppsCards,
  useGetBoosters,
  useGetCards,
  useGetDailyReward,
  useGetDailyRewardInfo,
} from "@/services/rewards/queries";
import {
  DataStructure,
  Events,
  IBoosters,
  IDailyRewardInfo,
} from "@/services/rewards/types";
import { RewardShape } from "@/types/rewards";
import { useQueryClient } from "@tanstack/react-query";

import { BoosterContent } from "./components/booster-content/BoosterContent";
import { EarningsContent } from "./components/earnings-content/EarningsContent";
import { GetAllButton } from "./components/get-all-button/GetAllButton";
import { RewardsContent } from "./components/rewards-content/RewardsContent";
import { Tabs } from "./components/tabs/Tabs";
import { TabsEnum } from "./enums";

export const Rewards = () => {
  const queryClient = useQueryClient();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideHeight, setSlideHeight] = useState<number>(0);
  const [reward, setReward] = useState<RewardShape | null>(null);

  const { data: dailyRewardInfo, isLoading: isLoadingDailyReward } =
    useGetDailyRewardInfo();
  const { mutate: getDailyReward, isPending } = useGetDailyReward(
    queryClient,
    setReward,
  );
  const { data, isLoading: isLoadingBoosters } = useGetBoosters();
  const { data: appsCards, isLoading: isLoadingAppsCards } =
    useGetAllAppsCards();
  const { data: cards, isLoading: isLoadingCards } = useGetCards();

  const updateSlideHeight = () => {
    if (containerRef.current) {
      const activeSlide = containerRef.current.querySelector(
        '[aria-roledescription="slide-content"]',
      );

      if (activeSlide) {
        const newHeight = activeSlide.scrollHeight;
        setSlideHeight(newHeight);
      }
    }
  };

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);
    updateSlideHeight();

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      updateSlideHeight();
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    });
  }, [api]);

  useLayoutEffect(() => {
    updateSlideHeight();
  }, [current]);

  const handleTabChange = (index: number) => {
    setCurrent(index);
    if (api) {
      api.scrollTo(index - 1);
    }
  };

  return (
    <PageWrapper
      className="flex flex-col bg-blue-800 pt-4"
      isLoading={
        isLoadingDailyReward ||
        isLoadingBoosters ||
        isLoadingCards ||
        isLoadingAppsCards
      }
    >
      {!reward && (
        <>
          <ProfileHeader />
          <div className="mt-6 flex flex-1 flex-col gap-6">
            <Tabs
              activeTab={current}
              setActiveTab={handleTabChange}
              tabs={Object.values(TabsEnum)}
            />
            <div
              ref={containerRef}
              className="overflow-hidden transition-all duration-300"
              style={{ height: slideHeight || "auto" }}
            >
              <Carousel setApi={setApi}>
                <CarouselContent>
                  <CarouselItem
                    className={current === 1 ? "carousel-item-active" : ""}
                  >
                    <EarningsContent
                      isActive={current === 1}
                      cards={cards ?? ({} as DataStructure)}
                      appsCards={appsCards ?? ({} as Events)}
                    />
                  </CarouselItem>
                  <CarouselItem
                    className={current === 2 ? "carousel-item-active" : ""}
                  >
                    <RewardsContent
                      onCollectReward={getDailyReward}
                      dailyRewardInfo={
                        dailyRewardInfo ?? ({} as IDailyRewardInfo)
                      }
                      isActive={current === 2}
                    />
                  </CarouselItem>
                  <CarouselItem
                    className={current === 3 ? "carousel-item-active" : ""}
                  >
                    <BoosterContent
                      boosters={data ?? ({} as IBoosters)}
                      isActive={current === 3}
                    />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          {current === 2 && (
            <GetAllButton
              disabled={!dailyRewardInfo?.available}
              isLoading={isPending}
              onClick={getDailyReward}
            />
          )}
        </>
      )}
      {reward && (
        <RewardScreen reward={reward} onFinish={() => setReward(null)} />
      )}
    </PageWrapper>
  );
};
