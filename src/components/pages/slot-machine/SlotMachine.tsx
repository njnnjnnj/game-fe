import React from "react";

import { PageWrapper } from "@/components/common";

// import { RewardScreen } from "@/components/common/reward-screen/RewardScreen";
import { Machine } from "./components/machine/Machine";

export const SlotMachine = () => {
  return (
    <PageWrapper
      className="flex flex-col bg-[url('/assets/png/slot-machine/bg.webp')] bg-cover bg-center pt-20"
      disableSafeAreaInset
    >
      <Machine />
      {/* <RewardScreen /> */}
    </PageWrapper>
  );
};
