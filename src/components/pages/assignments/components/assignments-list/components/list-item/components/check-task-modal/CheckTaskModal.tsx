import React, { FunctionComponent, useState } from "react";

import { useTranslations } from "next-intl";

import { toast } from "sonner";

import { DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import CloseIcon from "@/public/assets/svg/close.svg";
import { useGetReferrals } from "@/services/profile/queries";
import { useSetCompleteTask } from "@/services/tasks/queries";
import { ITask, TaskStatus, TaskType } from "@/services/tasks/types";
import { getLinkToApp } from "@/utils/lib/tg";
import { useQueryClient } from "@tanstack/react-query";

import { COMPONENTS_MAP } from "./constants";

type Props = Pick<
  ITask,
  | "type"
  | "title"
  | "reward"
  | "id"
  | "status"
  | "value"
  | "needValidate"
  | "penalty"
> & {
  onClose: () => void;
};

export const CheckTaskModal: FunctionComponent<Props> = ({
  type,
  title,
  reward,
  penalty,
  status,
  id,
  value,
  needValidate,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);
  const tCommon = useTranslations(NS.COMMON.ROOT);
  const [isLoading, setIsLoading] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { mutate: setCompleteTask, isPending } =
    useSetCompleteTask(queryClient);
  const { data: referralData } = useGetReferrals();

  const { handleSelectionChanged } = useHapticFeedback();
  const { webApp } = useTelegram();

  const handleCompleteTask = (id: string) => {
    setCompleteTask(id, {
      onSuccess: () => {
        toast(
          <Toast
            type="warning"
            text={t(
              `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.REVIEW_MESSAGE}`,
            )}
          />,
        );
        onClose();
      },
    });
  };

  const handleClick = async () => {
    setIsLoading(true);
    handleSelectionChanged();

    if (status === TaskStatus.COMPLETED) {
      return;
    }

    switch (type) {
      case TaskType.SOCIAL_SUB:
        try {
          webApp?.openTelegramLink(value as string);
          setTimeout(() => {
            setIsInit(true);
            setIsLoading(false);
          }, 3000);
        } catch (error) {
          toast(<Toast type="destructive" text={(error as Error).message} />);
          setIsLoading(false);
        }
        break;
      case TaskType.STORIES_REPLY: {
        if (!referralData) {
          toast(
            <Toast
              type="destructive"
              text={t(
                `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.REFERRAL_DATA_IS_NOT_AVAILABLE}`,
              )}
            />,
          );
          return;
        }

        const refLink = getLinkToApp(referralData.link);

        try {
          webApp?.shareToStory("https://njnnjnnj.github.io/game-fe/story.png", {
            text: tCommon(NS.COMMON.SHARE_TO_STORY_CAPTION, { link: refLink }),
            widget_link: {
              url: refLink,
              name: tCommon(NS.COMMON.SHARE_TO_STORY_WIDGET_NAME),
            },
          });
          setTimeout(() => {
            setIsInit(true);
            setIsLoading(false);
          }, 3000);
        } catch (error) {
          toast(<Toast type="destructive" text={(error as Error).message} />);
          setIsLoading(false);
        }

        break;
      }
      case TaskType.ADD_TO_HOME:
        try {
          webApp?.addToHomeScreen();
          setTimeout(() => {
            setIsInit(true);
            setIsLoading(false);
          }, 3000);
        } catch (error) {
          toast(<Toast type="destructive" text={(error as Error).message} />);
          setIsLoading(false);
        }
        break;
      case TaskType.EMOJI_SET:
        try {
          webApp?.setEmojiStatus(value as string, {}, (result) => {
            if (result) {
              setIsInit(true);
            } else {
              toast(
                <Toast
                  type="destructive"
                  text={t(
                    `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.EMOJI_STATUS_CANCELED_MESSAGE}`,
                  )}
                />,
              );
            }
            setIsLoading(false);
          });

          // setTimecoout(() => {
          //   setIsInit(true);
          //   setIsLoading(false);
          // }, 3000);
        } catch (error) {
          toast(<Toast type="destructive" text={(error as Error).message} />);
          setIsLoading(false);
        }
        break;
      case TaskType.DONATE:
        // setIsClicked(true);
        // Call the method specific to DONATE
        break;
      case TaskType.WALLET_CONNECT:
        setTimeout(() => {
          setIsInit(true);
          setIsLoading(false);
        }, 3000);
        break;
      case TaskType.BOOST_CHANNEL:
        webApp?.openTelegramLink(value as string);
        setTimeout(() => {
          setIsInit(true);
          setIsLoading(false);
        }, 3000);
        break;
      default:
        // setIsClicked(true);
        // Handle any other cases
        break;
    }
  };

  const handleCheck = (id: string) => {
    handleSelectionChanged();
    if (needValidate) {
      handleCompleteTask(id);
    } else {
      setIsChecked(!isChecked);
    }
  };

  return (
    <DrawerContent
      onInteractOutside={(e) => e.preventDefault()}
      className="flex w-full flex-col items-center overflow-hidden rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]"
    >
      <DrawerClose className="absolute right-4 top-4 z-10">
        <CloseIcon onClick={handleSelectionChanged} />
      </DrawerClose>
      {React.createElement(COMPONENTS_MAP[type], {
        id,
        type,
        reward,
        penalty,
        title,
        value,
        isPending,
        isLoading,
        isChecked,
        isInit,
        onClick: handleClick,
        onCheck: handleCheck,
        onSubmit: handleCompleteTask,
        onClose,
      })}
    </DrawerContent>
  );
};
