import { ITask } from "@/services/tasks/types";
import { UseMutateFunction } from "@tanstack/react-query";

export type ModalProps = Pick<
  ITask,
  "id" | "type" | "reward" | "title" | "value"
> & {
  isLoading: boolean;
  isInit: boolean;
  isChecked: boolean;
  isPending: boolean;
  onClick: (hasVerify?: boolean) => void;
  onCheck: (id: string) => void;
  onSubmit: UseMutateFunction<void, unknown, string, unknown>;
  onClose: () => void;
};
