import React, { FunctionComponent } from "react";

import { useCountdownTimer } from "@/hooks/useCountDownTimer";

type Props = {
  epochTime: number;
};
export const Timer: FunctionComponent<Props> = ({ epochTime }) => {
  const { h, m, s } = useCountdownTimer(epochTime);

  return (
    <div className="flex w-full justify-center rounded-2xl border border-solid border-black bg-[#1B3044] py-5">
      <span className="text-stroke-1 text-lg font-black lowercase leading-none text-white text-shadow-sm">
        {h}ч <span className="text-gray-550">:</span> {m}м{" "}
        <span className="text-gray-550">:</span> {s}с
      </span>
    </div>
  );
};
