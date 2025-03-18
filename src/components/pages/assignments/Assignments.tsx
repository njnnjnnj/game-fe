import { useState } from "react";

import { PageWrapper, ProfileHeader } from "@/components/common";
import { RewardScreen } from "@/components/common/reward-screen/RewardScreen";
import { useGetTasks } from "@/services/tasks/queries";
import { RewardShape } from "@/types/rewards";

import { AssignmentsCarousel } from "./components/assignments-carousel/AssignmentsCarousel";
import { AssignmentsList } from "./components/assignments-list/AssignmentsList";
import { AssignmentType } from "./components/assignments-list/types";
import { sortTasks } from "./helpers";

export const Assignments = () => {
  const { data: tasks, isLoading: isTasksLoading } = useGetTasks();
  const [reward, setReward] = useState<RewardShape | null>(null);

  return (
    <PageWrapper className="bg-blue-800 pb-10 pt-4" isLoading={isTasksLoading}>
      {!reward && (
        <div className="flex flex-col pb-23">
          <ProfileHeader />
          <AssignmentsCarousel onGetReward={setReward} />
          <div className="flex flex-col gap-4">
            <AssignmentsList
              isLoading={isTasksLoading}
              list={sortTasks(tasks?.everyday || [])}
            />
            <AssignmentsList
              isLoading={isTasksLoading}
              list={sortTasks(tasks?.other.slice(0, 10) || [])}
              type={AssignmentType.ONE_OFF}
            />
          </div>
        </div>
      )}
      {reward && (
        <RewardScreen reward={reward} onFinish={() => setReward(null)} />
      )}
    </PageWrapper>
  );
};
