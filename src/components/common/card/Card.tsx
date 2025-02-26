import React, {
  ComponentProps,
  FunctionComponent,
  MouseEvent,
  RefObject,
} from "react";

import classNames from "classnames";

import { CollectButton } from "@/components/ui";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { NotificationEnum } from "@/types/telegram";

export enum CardType {
  BLUE = "blue",
  INDIGO = "indigo",
  ORANGE = "orange",
  DARK_BLUE = "dark_blue",
  GREEN = "green",
  RED = "red",
}

type Props = {
  children: React.ReactNode;
  bottomBadge?: React.ReactNode;
  topBadge?: React.ReactNode;
  collectButtonProps?: Omit<ComponentProps<typeof CollectButton>, "className">;
  isAnimated?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  type?: CardType;
  onClick: () => void;
  ref?: RefObject<HTMLDivElement>;
};

export const Card: FunctionComponent<Props> = ({
  children,
  bottomBadge,
  topBadge,
  collectButtonProps,
  isAnimated = false,
  isSelected = false,
  isDisabled = false,
  type = CardType.BLUE,
  ref,
  onClick,
}) => {
  const { handleSelectionChanged, handleNotificationOccurred } =
    useHapticFeedback();

  const handleClick = () => {
    if (!isDisabled) {
      handleSelectionChanged();
    } else {
      handleNotificationOccurred(NotificationEnum.ERROR);
    }

    onClick();
  };

  const onCollectButtonClick = (event: MouseEvent) => {
    if (!isDisabled) {
      handleSelectionChanged();
    } else {
      handleNotificationOccurred(NotificationEnum.ERROR);
    }

    event.stopPropagation();

    if (collectButtonProps?.onClick) {
      collectButtonProps?.onClick(event);
    }
  };

  return (
    <div
      ref={ref}
      className={classNames(
        "relative aspect-[3/4] rounded-xl border border-solid border-black pb-1 text-white transition-transform will-change-transform",
        {
          "bg-[#0069B1]": type === CardType.BLUE,
          "bg-[#403BB7]": type === CardType.INDIGO,
          "bg-[#A6552D]": type === CardType.ORANGE || type === CardType.RED,
          "bg-[#101C28]": type === CardType.DARK_BLUE,
          "bg-[#009F00]": type === CardType.GREEN,
          "scale-105": isSelected,
        },
      )}
      onClick={handleClick}
    >
      {collectButtonProps && (
        <CollectButton
          className="absolute -top-1 left-1/2 z-20 -translate-x-1/2"
          {...collectButtonProps}
          onClick={onCollectButtonClick}
        />
      )}
      <div
        className={classNames(
          "h-full rounded-xl p-1 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.3)]",
          {
            "bg-gradient-to-b from-[#29D6FF] to-[#2596E4]":
              type === CardType.BLUE,
            "bg-gradient-to-b from-[#9099FD] to-[#777AF0]":
              type === CardType.INDIGO,
            "bg-[#EFC609]": type === CardType.ORANGE || type === CardType.RED,
            "bg-[#203950]": type === CardType.DARK_BLUE,
            "bg-[#02DB07]": type === CardType.GREEN,
          },
        )}
      >
        <div
          className={classNames(
            "relative h-full w-full overflow-hidden rounded-xl",
            {
              "bg-[#0069B1]": type === CardType.BLUE,
              "bg-[#883308]": type === CardType.ORANGE,
              "bg-[#403BB7]": type === CardType.INDIGO,
              "bg-[#203950]": type === CardType.DARK_BLUE,
              "bg-[#02DB07]": type === CardType.GREEN,
              "bg-[#8B2542]": type === CardType.RED,
            },
          )}
        >
          <div
            className={classNames(
              "absolute -inset-x-1 top-1/2 h-[155%] -translate-y-1/2 bg-[length:150%_70%] bg-center mix-blend-hard-light",
              {
                "bg-card-blue-bg-pattern": type === CardType.BLUE,
                "bg-card-indigo-bg-pattern": type === CardType.INDIGO,
                "bg-card-orange-bg-pattern": type === CardType.ORANGE,
                "bg-card-dark-blue-bg-pattern": type === CardType.DARK_BLUE,
                "bg-card-green-bg-pattern": type === CardType.GREEN,
                "bg-card-red-bg-pattern": type === CardType.RED,
              },
            )}
          />
          <div className="relative h-full w-full overflow-hidden rounded-xl shadow-card-inner-shadow">
            {children}
          </div>
          {topBadge && (
            <div
              className={classNames(
                "absolute left-1/2 top-0 -translate-x-1/2 rounded-b-md text-xs shadow-[inset_0_-1px_0.5px_0_#FFFFFF33,0_1px_2px_0_#00000033]",
                {
                  "bg-[#2596E4]": type === CardType.BLUE,
                  "bg-[#777AF0]": type === CardType.INDIGO,
                  "bg-[#EFC609]": type === CardType.ORANGE,
                  "bg-[#203950]": type === CardType.DARK_BLUE,
                  "bg-[#02DB07]": type === CardType.GREEN,
                  "bg-[#8B2542]": type === CardType.RED,
                },
              )}
            >
              {topBadge}
            </div>
          )}
          {bottomBadge && (
            <div
              className={classNames(
                "absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-md text-xs shadow-[inset_0_0.5px_0_0_rgba(255,255,255,0.3)]",
                {
                  "bg-[#2596E4]": type === CardType.BLUE,
                  "bg-[#777AF0]": type === CardType.INDIGO,
                  "bg-[#EFC609]": type === CardType.ORANGE,
                  "bg-[#203950]": type === CardType.DARK_BLUE,
                  "bg-[#02DB07]": type === CardType.GREEN,
                  "bg-[#8B2542]": type === CardType.RED,
                },
              )}
            >
              {bottomBadge}
            </div>
          )}
        </div>
      </div>
      {isAnimated && (
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute top-0 h-[130%] w-[66px] rotate-[30deg] animate-card-glow-running bg-card-glow-pattern will-change-transform" />
        </div>
      )}
    </div>
  );
};
