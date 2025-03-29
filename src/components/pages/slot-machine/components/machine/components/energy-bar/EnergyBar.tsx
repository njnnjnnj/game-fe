import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import EnergyImage from "@/public/assets/png/game-energy.webp";
import {
  updateGetBanditQuery,
  useGetBandit,
} from "@/services/slot-machine/queries";
import { extractMinutesFromSeconds } from "@/utils/date";
import { formatValue } from "@/utils/lib/utils";
import { calculateProgress } from "@/utils/progress";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  balance: number;
};

const MAX_FREE_ENERGY = 120;
const TICK_INTERVAL = 1000;
const ONE_HOUR = 3600;

export const EnergyBar: FunctionComponent<Props> = ({ balance }) => {
  const t = useTranslations(NS.PAGES.SLOT_MACHINE.ROOT);
  const queryClient = useQueryClient();
  const { data: banditInfo, refetch: refetchBanditInfo } = useGetBandit();
  const [secondsLeft, setSecondsLeft] = useState(
    banditInfo?.timeToEnergyAccrual ?? 0,
  );
  const secondsLeftRef = useRef<number>(secondsLeft);
  const intervalRef = useRef<NodeJS.Timeout>();

  const clearIntervalIfExists = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  useEffect(
    () => () => {
      clearIntervalIfExists();
      console.log(secondsLeftRef.current);
      updateGetBanditQuery(queryClient, {
        timeToEnergyAccrual: Math.max(secondsLeftRef.current - 1, 0),
      });
    },
    [],
  );

  useEffect(() => {
    secondsLeftRef.current = secondsLeft;

    if (secondsLeft > 0) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setSecondsLeft((prev) => {
            const next = prev - 1;

            if (next === 0) {
              clearIntervalIfExists();
              refetchBanditInfo();
            }

            return next;
          });
        }, TICK_INTERVAL);
      }
    } else {
      clearIntervalIfExists();
    }
  }, [secondsLeft]);

  useUpdateEffect(() => {
    if (balance >= MAX_FREE_ENERGY) {
      clearIntervalIfExists();
      setSecondsLeft(0);
    } else if (secondsLeft === 0) {
      setSecondsLeft(ONE_HOUR);
    }
  }, [balance]);

  if (!banditInfo) {
    return null;
  }

  const progress = Math.min(calculateProgress(balance, MAX_FREE_ENERGY), 100);

  const getTimeLabel = () => {
    const minutes = extractMinutesFromSeconds(secondsLeft);
    const seconds = secondsLeft - minutes * 60;

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="absolute left-[24.6%] right-[24.6%] top-[27.8%] h-[4.7%]">
      <div className="text-stroke-2 absolute left-1/2 top-full -translate-x-1/2 -translate-y-[6px] whitespace-nowrap rounded-b-md bg-[#015EC9] p-1 font-black uppercase text-white shadow-[-1px_-2px_1px_0_#0000004D_inset,-1px_1px_1px_0_#FFFFFF26_inset,0_2px_2px_0_#0000004D] text-shadow-sm [font-size:min(3.5vw,1.4vh)]">
        {secondsLeft > 0
          ? t(NS.PAGES.SLOT_MACHINE.ENERGY_RESTORE_LABEL, {
              time: getTimeLabel(),
            })
          : t(NS.PAGES.SLOT_MACHINE.FULL_ENERGY_LABEL)}
      </div>
      <div className="absolute flex h-full w-full flex-col overflow-hidden rounded-full">
        <div className="h-[11.1%] w-full bg-[#FEA700] shadow-inner-light-top" />
        <div className="h-[66.6%] w-full bg-[#800029] py-px">
          <div
            className={classNames(
              "relative h-full rounded-[8px] bg-home-energy-pattern shadow-[4px_1px_2px_0_#00000066] transition-[width] duration-300 ease-in-out",
              "after:absolute after:left-0.5 after:right-0.5 after:top-[8.3%] after:h-[41.6%] after:rounded-t-[8px] after:bg-white after:opacity-30 after:content-['']",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-stroke-2 absolute left-1/2 top-1/2 -mt-0.5 -translate-x-1/2 -translate-y-1/2 font-black text-white text-shadow-sm [font-size:min(3.8vw,1.7vh)]">
          {`${formatValue(balance ?? 0)}/${MAX_FREE_ENERGY}`}
        </span>
        <div className="h-[11.1%] w-full bg-[#FEA700] shadow-inner-light-bottom" />
      </div>
      <div className="absolute left-0 aspect-square h-full rounded-full border border-[#422212] bg-yellow-450 p-1">
        <div className="h-full w-full rounded-full bg-orange-550" />
        <Image
          className="scale-[1.12]"
          src={EnergyImage}
          alt=""
          sizes="50px"
          fill
        />
      </div>

      <div className="absolute right-0 aspect-square h-full rounded-full border border-[#422212] bg-yellow-450 p-1">
        <div className="relative h-full w-full rounded-full bg-orange-550">
          <div className="absolute inset-0 m-auto h-[14.2%] w-[57.1%] rounded-[1px] bg-yellow-450" />
          <div className="absolute inset-0 m-auto h-[14.2%] w-[57.1%] rotate-90 rounded-[1px] bg-yellow-450" />
        </div>
      </div>
    </div>
  );
};
