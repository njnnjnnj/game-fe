import React, { createElement, FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { toast } from "sonner";

import { Timeline } from "@/components/common";
import {
  ASSIGNMENTS_ICONS,
  REWARD_ICONS,
} from "@/components/pages/assignments/components/assignments-list/constants";
import { DrawerTitle } from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { Toast } from "@/components/ui/toast";
import { Locale } from "@/constants/locale";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useLocaleManager } from "@/hooks/useLocaleManager";
import { ITask } from "@/services/tasks/types";
import { formatNumber } from "@/utils/number";
import { UseMutateFunction } from "@tanstack/react-query";
import { useTonAddress, useTonConnectModal } from "@tonconnect/ui-react";

type Props = Pick<ITask, "id" | "type" | "reward" | "title" | "value"> & {
  isPending: boolean;
  onClick: (hasVerify?: boolean) => void;
  onCheck: (id: string) => void;
  onSubmit: UseMutateFunction<void, unknown, string, unknown>;
  onClose: () => void;
};

export const WalletConnect: FunctionComponent<Props> = ({
  type,
  title,
  reward,
  id,
  isPending,
  onSubmit,
  onClose,
}) => {
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);
  const { locale } = useLocaleManager();
  const { open } = useTonConnectModal();
  const address = useTonAddress();
  const { handleSelectionChanged } = useHapticFeedback();

  const handleOpenTon = () => {
    handleSelectionChanged();
    open();
  };

  const handleDisconnect = () => {
    handleSelectionChanged();
    <Toast
      type="warning"
      text="Вы можете отвязать криптокошелек в настройках профиля"
    />;
  };

  const handleSubmit = () => {
    if (address.length > 0) {
      onSubmit(id, {
        onSuccess: () => {
          toast(<Toast type="done" text="Задание выполнено 🚀" />);
          onClose();
        },
        onError: () => {
          toast(<Toast type="destructive" text="Что-то пошло не так" />);
          onClose();
        },
      });
    }
  };

  return (
    <>
      <DrawerTitle className="text-stroke-1 mb-3 flex flex-col items-center gap-6 text-center text-[28px] font-black uppercase leading-none tracking-[0.04em] !text-white text-shadow">
        {createElement(ASSIGNMENTS_ICONS[type], {
          className: "size-23 rounded-full",
        })}
        {locale === Locale.EN ? title.en : title.ru}
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
              isDone: address.length > 0,
              description: (
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-550">
                    {t(
                      `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.DO_ASSIGNMENT}`,
                    )}
                  </p>
                  <PrimaryButton
                    disabled={address.length > 0}
                    className="text-stroke-1"
                    onClick={() => {
                      if (address.length > 0) {
                        handleDisconnect();
                      } else {
                        handleOpenTon();
                      }
                    }}
                    size="small"
                  >
                    {address.length > 0
                      ? `${address.slice(0, 5)}...${address.slice(-5)}`
                      : t(
                          `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.WALLET_CONNECT}`,
                        )}
                  </PrimaryButton>
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
          disabled={address.length === 0}
          onClick={handleSubmit}
          isLoading={isPending}
          size="large"
        >
          {t(
            `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.BUTTON}`,
          )}
        </PrimaryButton>
      </div>
    </>
  );
};
