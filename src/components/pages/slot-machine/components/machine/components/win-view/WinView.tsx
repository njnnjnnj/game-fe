import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import WinPaneImg from "@/public/assets/png/slot-machine/win-pane.webp";
import CoinSvg from "@/public/assets/svg/heroes/hour-income-coin.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { Face } from "@/services/slot-machine/types";

import { ReelPane } from "../reel-pane/ReelPane";

import { AnimatedNumber } from "./components/animated-number/AnimatedNumber";

type Props = {
  reward: number;
  isVip: boolean;
  combination: Face[];
  onClose: () => void;
};

const CLOSE_TIMING = 3000;

export const WinView: FunctionComponent<Props> = ({
  reward,
  isVip,
  combination,
  onClose,
}) => {
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout>();
  const tCommon = useTranslations(NS.COMMON.ROOT);
  const tSlotMachine = useTranslations(NS.PAGES.SLOT_MACHINE.ROOT);

  useEffect(() => {
    setIsAnimationActive(false);

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [reward]);

  const isActive = !!reward;

  const stopAnimationAndRunTimer = () => {
    setIsAnimationActive(false);

    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = undefined;
      onClose();
    }, CLOSE_TIMING);
  };

  return (
    <div
      className={classNames("absolute inset-0 z-20", {
        visible: isActive,
        invisible: !isActive,
      })}
      onClick={onClose}
    >
      <div
        className={classNames(
          "absolute bottom-0 left-0 h-screen w-screen bg-black opacity-[0.8]",
          { "slot-win-view-backdrop-fade-in": isActive },
        )}
      />
      <div className="absolute inset-x-10 top-[85%] animate-slot-win-view-text-pulse text-center font-black uppercase italic leading-[36px] text-white text-shadow [font-size:min(7.6vw,3.5vh)]">
        {tCommon(`${NS.COMMON.TAP_TO_CONTINUE}`)}
      </div>
      <ReelPane combination={combination} />
      <div
        className={classNames(
          "absolute inset-x-0 top-[47.6%] z-10 h-[18%] scale-0",
          {
            "animate-slot-win-view-pane-scale-in": isActive,
          },
        )}
        onAnimationEnd={() => {
          setIsAnimationActive(true);
        }}
      >
        <div
          className={classNames("absolute h-full w-full", {
            "animate-slot-win-view-pane-pulse": isAnimationActive,
          })}
        >
          <Image src={WinPaneImg} alt="" fill quality={100} />
          <div className="absolute left-1/2 top-[13%] -translate-x-1/2 font-black uppercase leading-none text-[#542E00] [font-size:min(4vw,1.8vh)]">
            {tSlotMachine(NS.PAGES.SLOT_MACHINE.REWARD)}
          </div>
        </div>
        <div className="absolute left-1/2 top-[51%] h-[26%] -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-full items-center gap-x-2.5">
            <div
              className={classNames("aspect-square h-full shrink-0", {
                "animate-slot-win-view-coin-pulse": isAnimationActive,
              })}
            >
              {isVip ? (
                <StarSVG
                  width="100%"
                  height="100%"
                  viewBox="0 0 29 29"
                  preserveAspectRatio="none"
                />
              ) : (
                <CoinSvg
                  width="100%"
                  height="100%"
                  viewBox="0 0 26 26"
                  preserveAspectRatio="none"
                />
              )}
            </div>
            {isActive && (
              <AnimatedNumber
                className="text-stroke-brown-1.5 font-black leading-none text-[#FDEC50] text-shadow-win [font-size:min(8.2vw,3.7vh)]"
                targetNum={reward}
                onAnimationEnd={stopAnimationAndRunTimer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
