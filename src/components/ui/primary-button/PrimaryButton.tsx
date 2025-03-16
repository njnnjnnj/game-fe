import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

import classNames from "classnames";

import { Spinner } from "@/components/common";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { NotificationEnum } from "@/types/telegram";

type Color = "primary" | "secondary" | "yellow" | "blue" | "red";

type Size = "small" | "medium" | "large";

type Props = {
  children: React.ReactNode;
  color?: Color;
  size?: Size;
  buttonClassName?: string;
  isLoading?: boolean;
  fontSize?: number;
  innerClassname?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton: FunctionComponent<Props> = ({
  children,
  color = "primary",
  size = "medium",
  disabled = false,
  buttonClassName,
  className,
  isLoading = false,
  onClick,
  fontSize,
  innerClassname,
  ...props
}) => {
  const { handleNotificationOccurred, handleSelectionChanged } =
    useHapticFeedback();
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (disabled) {
      handleNotificationOccurred(NotificationEnum.ERROR);
      return;
    } else {
      handleSelectionChanged();
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={classNames(
        "group w-full cursor-pointer overflow-hidden border border-black transition-all active:scale-[0.98]",
        { "bg-[#0655a4]": color === "primary" },
        { "bg-[#009F00]": color === "secondary" },
        { "bg-[#A6552D]": color === "yellow" },
        { "bg-[#155081]": color === "blue" },
        { "bg-[#AF2F27]": color === "red" },
        { "bg-blue-800 pb-0": disabled },
        { "pb-[3px]": !disabled },
        { "h-10 rounded-xl": size === "small" },
        { "h-13 rounded-2xl": size === "medium" },
        { "h-14 rounded-2xl": size === "large" },
        { "pointer-events-none": isLoading },
        buttonClassName,
      )}
      onClick={handleClick}
      {...props}
    >
      <div
        className={classNames(
          "flex h-full w-full items-center justify-center p-[3px] pb-1",
          { "bg-[#0075ff]": color === "primary" },
          { "bg-[#02DB07]": color === "secondary" },
          { "bg-[#EFC609]": color === "yellow" },
          { "bg-[#FF453A]": color === "red" },
          { "bg-gradient-to-b from-[#29D6FF] to-[#2596E4]": color === "blue" },
          { "bg-blue-800 shadow-none": disabled },
          { "shadow-inset-btn": !disabled },
          { "rounded-xl": size === "small" },
          { "rounded-2xl": size === "medium" },
          { "rounded-2xl": size === "large" },
          innerClassname,
        )}
      >
        <div
          className={classNames(
            "flex h-full w-full items-center justify-center px-5 font-black leading-none tracking-wide text-white",
            {
              "text-stroke-half rounded-lg text-base text-shadow":
                size === "small",
            },
            {
              "text-stroke-1 rounded-xl text-base text-shadow-sm":
                size === "medium",
            },
            {
              "text-stroke-half rounded-xl text-lg text-shadow":
                size === "large",
            },
            { "bg-blue-800/100 text-white/50 shadow-none": disabled },
            { "shadow-link": !disabled },
            { "bg-white/15": color === "primary" && !disabled },
            { "bg-white/40": color === "secondary" && !disabled },
            { "bg-white/20": color === "blue" && !disabled },
            { "bg-white/15": color === "red" && !disabled },
            { "bg-[rgba(251,239,68,0.6)]": color === "yellow" && !disabled },
            className,
          )}
          style={fontSize ? { fontSize } : undefined}
        >
          {isLoading ? <Spinner /> : children}
        </div>
      </div>
    </button>
  );
};
