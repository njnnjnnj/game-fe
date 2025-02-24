import { ITask, TaskStatus } from "@/services/tasks/types";

export function sortTasks(tasks: ITask[]): ITask[] {
  return tasks.sort((a, b) => {
    const orderA =
      a.status === TaskStatus.COMPLETED
        ? 2
        : a.status === TaskStatus.IN_PROGRESS
          ? 1
          : 0;
    const orderB =
      b.status === TaskStatus.COMPLETED
        ? 2
        : b.status === TaskStatus.IN_PROGRESS
          ? 1
          : 0;
    return orderA - orderB;
  });
}
