import React, { createElement, FunctionComponent } from "react";

import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Timeline } from "@/components/common";
import {
  ASSIGNMENTS_ICONS,
  REWARD_ICONS,
} from "@/components/pages/assignments/components/assignments-list/constants";
import { DrawerTitle } from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import ExternalSVG from "@/public/assets/svg/external.svg";
import { ITask } from "@/services/tasks/types";
import { formatNumber } from "@/utils/number";
import { UseMutateFunction } from "@tanstack/react-query";

import { CHECK_TASKS_MODAL_TID } from "../../constants";

import { DoubleCheck } from "./components/double-check/DoubleCheck";

type Props = Pick<ITask, "id" | "type" | "reward" | "title" | "penalty"> & {
  isLoading: boolean;
  isChecked: boolean;
  isInit: boolean;
  isPending: boolean;
  onCheck: (id: string) => void;
  onClick: () => void;
  onSubmit: UseMutateFunction<void, unknown, string, unknown>;
  onClose: () => void;
};

export const CommonModal: FunctionComponent<Props> = ({
  id,
  type,
  reward,
  penalty,
  title,
  isPending,
  isLoading,
  isChecked,
  isInit,
  onCheck,
  onClick,
  onSubmit,
  onClose,
}) => {
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);
  const { locale } = useRouter();

  const handleButtonClick = () => {
    onClick();
  };

  const handleCheck = () => {
    if (!isInit) return;
    onCheck(id);
  };

  return (
    <>
      {!isChecked ? (
        <>
          <DrawerTitle className="text-stroke-1 mb-3 flex flex-col items-center gap-6 text-center text-[28px] font-black uppercase leading-none tracking-[0.04em] !text-white text-shadow">
            {createElement(ASSIGNMENTS_ICONS[type], {
              className: "size-23 rounded-full",
            })}
            {locale === "en" ? title.en : title.ru}
          </DrawerTitle>
          <div
            className={classNames(
              "mx-auto mb-3 flex w-fit items-center gap-2 rounded-full bg-blue-800/50 px-3 py-1",
            )}
          >
            {reward.map(({ type, value }) => (
              <div
                key={type}
                className="flex items-center gap-1 text-base font-extrabold text-yellow-500"
              >
                {React.createElement(REWARD_ICONS[type], {
                  className: "size-6",
                })}
                + {formatNumber(value)}
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col gap-4 rounded-2xl bg-white/5 p-4">
            <Timeline
              items={[
                {
                  id: 1,
                  isDone: isInit,
                  description: (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-gray-550">
                        {t(
                          `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.DO_ASSIGNMENT}`,
                        )}
                      </p>
                      <button
                        onClick={handleButtonClick}
                        className="flex items-baseline gap-1 font-extrabold uppercase tracking-wide text-white text-shadow"
                      >
                        {t(CHECK_TASKS_MODAL_TID[type])}
                        <ExternalSVG className="size-4" />
                      </button>
                    </div>
                  ),
                },
                {
                  id: 2,
                  isDone: false,
                  description: (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-gray-550">
                        {t(
                          `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.CHECK_ASSIGNMENTS}`,
                        )}
                      </p>
                    </div>
                  ),
                },
              ]}
            />
            <PrimaryButton
              className="uppercase"
              disabled={!isInit}
              isLoading={isLoading}
              onClick={handleCheck}
              size="large"
            >
              {t(
                `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.BUTTON}`,
              )}
            </PrimaryButton>
          </div>
        </>
      ) : (
        <DoubleCheck
          id={id}
          reward={reward}
          penalty={penalty}
          isPending={isPending}
          onCheck={onCheck}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      )}
    </>
  );
};
