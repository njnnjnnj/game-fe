import { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import { ITask } from "@/services/tasks/types";

import { ListItem } from "./components/list-item/ListItem";
import { AssignmentType } from "./types";

type Props = {
  type?: AssignmentType;
  list: ITask[];
  isLoading?: boolean;
};

export const AssignmentsList: FunctionComponent<Props> = ({
  type = AssignmentType.DAILY,
  list,
  isLoading,
}) => {
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);

  return (
    <>
      <div className="mt-6 flex flex-col gap-4 px-4">
        <div className="flex items-center justify-between">
          <div className="text-nowrap text-2xl font-black tracking-[0.04em] text-white">
            {t(`${NS.PAGES.ASSIGNMENTS.TYPES.ROOT}.${type}`)}
          </div>
          {isLoading ? (
            <div className="h-6 w-8 animate-pulse rounded-[20px] bg-blue-700" />
          ) : (
            <div className="text-nowrap rounded-[20px] bg-blue-700 px-3 py-1 text-xs font-black tracking-[0.04em] text-white">
              {list.length}
            </div>
          )}
        </div>
        <ul className="overflow-hidden rounded-[18px] border border-solid border-white/10 bg-blue-700">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <li
                    key={index}
                    className={classNames(
                      "grid grid-cols-[32px_1fr] items-center gap-2 border-b border-solid border-white/10 px-4 py-3",
                      "last:border-none",
                    )}
                  >
                    <div className="size-8 animate-pulse rounded-full bg-blue-400" />
                    <div className="flex flex-col gap-1">
                      <div className="h-4 w-30 animate-pulse rounded-[20px] bg-blue-400" />
                      <div className="flex gap-2">
                        <div className="flex gap-1">
                          <div className="size-4 animate-pulse rounded-[20px] bg-blue-400" />
                          <div className="h-4 w-8 animate-pulse rounded-[20px] bg-blue-400" />
                        </div>
                        <div className="flex gap-1">
                          <div className="size-4 animate-pulse rounded-[20px] bg-blue-400" />
                          <div className="h-4 w-8 animate-pulse rounded-[20px] bg-blue-400" />
                        </div>
                      </div>
                    </div>
                  </li>
                ))
            : list.map((item) => <ListItem key={item.id} {...item} />)}
        </ul>
      </div>
    </>
  );
};
