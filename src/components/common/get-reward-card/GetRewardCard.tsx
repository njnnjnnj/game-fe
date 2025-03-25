import React, {
  CSSProperties,
  FunctionComponent,
  useEffect,
  useRef,
} from "react";

import Image from "next/image";

import classNames from "classnames";
import { motion } from "framer-motion";

import { RewardsStatusEnum } from "@/components/pages/rewards/enums";
import BGImage from "@/public/assets/png/reward-card-bg.webp";

type Props = {
  status: RewardsStatusEnum;
  children?: React.ReactNode;
  isAnimated?: boolean;
  caption?: string;
  onClick?: () => void;
  isActive?: boolean;
};

export const GetRewardCard: FunctionComponent<Props> = ({
  status,
  children,
  isAnimated,
  caption,
  onClick,
  isActive,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boxElement = boxRef.current;

    if (!boxElement) {
      return;
    }

    let animationFrameId: number;

    const updateAnimation = () => {
      if (!isActive) {
        return;
      }

      const angle =
        (parseFloat(boxElement.style.getPropertyValue("--angle")) + 3) % 360;
      boxElement.style.setProperty("--angle", `${angle}deg`);

      animationFrameId = requestAnimationFrame(updateAnimation);
    };

    animationFrameId = requestAnimationFrame(updateAnimation);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isActive]);

  return (
    <motion.div
      onTap={onClick}
      whileTap={status !== RewardsStatusEnum.CURRENT ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      ref={boxRef}
      style={
        {
          "--angle": "0deg",
          "--border-color": "linear-gradient(var(--angle), #203950, #0D4B93)",
          "--bg-color": "linear-gradient(#203950, #203950)",
        } as CSSProperties
      }
      className={classNames(
        "relative z-20 aspect-[83/128] rounded-xl pb-1 text-white",
        {
          "bg-[#0069B1]": status === RewardsStatusEnum.AVAILABLE,
          "border-2 border-[#0000] pb-[1px] opacity-50 will-change-transform [background:padding-box_var(--bg-color),border-box_var(--border-color)]":
            status === RewardsStatusEnum.UNAVAILABLE,
          "bg-[#009F00]": status === RewardsStatusEnum.CURRENT,
          "border border-solid border-black":
            status !== RewardsStatusEnum.UNAVAILABLE,
        },
      )}
    >
      <div
        className={classNames(
          "relative z-30 h-full rounded-xl p-1 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.3)]",
          {
            "bg-gradient-to-b from-[#29D6FF] to-[#2596E4]":
              status === RewardsStatusEnum.AVAILABLE,
            "bg-blue-700 shadow-none": status === RewardsStatusEnum.UNAVAILABLE,
            "bg-[#02DB07]": status === RewardsStatusEnum.CURRENT,
          },
        )}
      >
        <div
          className={classNames(
            "relative h-[78%] w-full overflow-hidden rounded-xl",
            {
              "bg-[#0069B1]": status === RewardsStatusEnum.AVAILABLE,
              "bg-blue-800": status === RewardsStatusEnum.UNAVAILABLE,
              "bg-[#009F00]": status === RewardsStatusEnum.CURRENT,
            },
          )}
        >
          {status !== RewardsStatusEnum.UNAVAILABLE && (
            <Image
              src={BGImage}
              fill
              alt=""
              className="rounded-xl"
              quality={100}
            />
          )}
          {children}
        </div>
        <div className="relative h-[22%] w-full">
          {caption && (
            <div
              className={classNames(
                "text-stroke-1 absolute left-1/2 top-[calc(50%_+_2px)] -translate-x-1/2 -translate-y-1/2 text-nowrap text-xs font-black text-white text-shadow-sm",
                "md:text-lg",
              )}
            >
              {caption}
            </div>
          )}
        </div>
      </div>
      {isAnimated && (
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-xl">
          <div className="absolute top-0 h-[130%] w-[66px] rotate-[30deg] animate-card-glow-running bg-card-glow-pattern will-change-transform" />
        </div>
      )}
    </motion.div>
  );
};
