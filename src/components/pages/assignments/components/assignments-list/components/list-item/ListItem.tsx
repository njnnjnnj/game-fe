import React, { createElement, FunctionComponent, useState } from "react";

import { useRouter } from "next/router";

import classNames from "classnames";
import { motion } from "framer-motion";

import { Spinner } from "@/components/common";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import ArrowIcon from "@/public/assets/svg/arrow.svg";
import DoneSvg from "@/public/assets/svg/toast/done.svg";
import { ITask, TaskStatus } from "@/services/tasks/types";
import { NotificationEnum } from "@/types/telegram";
import { formatNumber } from "@/utils/number";

import { ASSIGNMENTS_ICONS, REWARD_ICONS } from "../../constants";

import { CheckTaskModal } from "./components/check-task-modal/CheckTaskModal";

type Props = ITask;

export const ListItem: FunctionComponent<Props> = ({
  reward,
  type,
  title,
  status,
  id,
  needValidate,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useRouter();
  const { handleNotificationOccurred, handleSelectionChanged } =
    useHapticFeedback();

  const handleOpenChange = (open: boolean) => {
    if (status === TaskStatus.COMPLETED || status === TaskStatus.IN_PROGRESS) {
      setIsOpen(false);
    } else {
      setIsOpen(open);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <li
          className={classNames(
            "border-b border-solid border-white/10 px-4 py-3",
            "last:border-none",
            {
              "bg-blue-950":
                status === TaskStatus.COMPLETED ||
                status === TaskStatus.IN_PROGRESS,
            },
            {
              "cursor-not-allowed":
                status === TaskStatus.COMPLETED ||
                status === TaskStatus.IN_PROGRESS,
            },
          )}
        >
          <motion.div
            whileTap={{ scale: status === TaskStatus.COMPLETED ? 1 : 0.99 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="grid grid-cols-[32px_1fr_24px] items-center gap-2"
            onClick={() => {
              if (status !== TaskStatus.COMPLETED) {
                handleSelectionChanged();
              } else {
                handleNotificationOccurred(NotificationEnum.ERROR);
              }
            }}
          >
            {createElement(ASSIGNMENTS_ICONS[type], {
              className: "size-8 rounded-full object-contain",
            })}
            <div className="flex flex-col gap-1">
              <p className="text-stroke-1 text-sm font-black tracking-wide text-white text-shadow-sm">
                {locale === "en" ? title.en : title.ru}
              </p>
              <div className="flex gap-2">
                {reward.map(({ type, value }) => (
                  <div
                    key={type}
                    className="flex items-center gap-1 text-xs font-extrabold leading-none text-yellow-500"
                  >
                    {createElement(REWARD_ICONS[type], {
                      className: "size-4",
                    })}
                    + {formatNumber(value)}
                  </div>
                ))}
              </div>
            </div>

            {status === TaskStatus.AVAILABLE ? (
              <ArrowIcon className="ml-auto size-6 stroke-white" />
            ) : status === TaskStatus.IN_PROGRESS ? (
              <Spinner className="stroke-gray-550" />
            ) : (
              <DoneSvg className="ml-auto size-4" />
            )}
          </motion.div>
        </li>
      </DrawerTrigger>
      <CheckTaskModal
        onClose={() => setIsOpen(false)}
        id={id}
        type={type}
        title={title}
        reward={reward}
        status={status}
        value={value}
        needValidate={needValidate}
      />
    </Drawer>
  );
};
