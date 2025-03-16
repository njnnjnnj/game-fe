import React, { useState } from "react";

import { PageWrapper } from "@/components/common";
import { RewardScreen } from "@/components/common/reward-screen/RewardScreen";
import { RewardShape } from "@/types/rewards";

import { Machine } from "./components/machine/Machine";

export const SlotMachine = () => {
  const [reward, setReward] = useState<RewardShape | null>(null);

  return (
    <PageWrapper
      className="flex flex-col bg-[url('/assets/png/slot-machine/bg.webp')] bg-cover bg-center pt-20 overflow-hidden"
      disableSafeAreaInset
    >
      <Machine onGetReward={setReward} />
      {reward && (
        <RewardScreen reward={reward} onFinish={() => setReward(null)} />
      )}
    </PageWrapper>
  );
};
