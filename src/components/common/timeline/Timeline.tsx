import React, { FunctionComponent, ReactNode } from "react";

import classNames from "classnames";

import Done from "@/public/assets/svg/assignments/done.svg";

interface TimelineItem {
  id: number;
  description: ReactNode;
  isDone: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: FunctionComponent<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      <ul className="flex flex-col">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={classNames(
              "relative mb-4 flex w-full justify-start",
              "last:mb-0",
            )}
          >
            <div className="grid grid-cols-[40px_1fr] items-center gap-2">
              <div
                className={classNames(
                  "z-10 flex size-10 items-center justify-center rounded-full",
                  { "bg-blue-500": item.isDone, "bg-blue-800": !item.isDone },
                )}
              >
                {item.isDone ? (
                  <Done />
                ) : (
                  <span className="text-sm font-semibold text-white">
                    {item.id}
                  </span>
                )}
              </div>
              <div>{item.description}</div>
            </div>
            {index < items.length - 1 && (
              <div className="absolute -bottom-2 left-[18.5px] z-0 grid h-4 gap-1 py-0.5">
                <div className="h-1 w-[1px] rounded-full bg-white" />
                <div className="h-1 w-[1px] rounded-full bg-white" />
                <div className="h-1 w-[1px] rounded-full bg-white" />
                <div className="h-1 w-[1px] rounded-full bg-white" />
                <div className="h-1 w-[1px] rounded-full bg-white" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
