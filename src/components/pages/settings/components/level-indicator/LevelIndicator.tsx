import { FC } from "react";

import classNames from "classnames";

import { Level } from "@/components/ui";

export const LevelIndicator: FC<{
  currentLevel: number;
  progress: number;
}> = ({ currentLevel, progress }) => (
  <div className="mb-5 flex items-center justify-center">
    <div className="relative left-1 z-10 h-6 w-[40.8px]">
      <Level className="h-6 w-[40.8px]" />
      <p className="level-text absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-[14.4px] font-bold -tracking-wide text-white">
        {currentLevel}
      </p>
    </div>
    <div className="relative h-2.5 w-25 bg-blue-900">
      <div
        className={classNames(
          "transition-width absolute h-full bg-gradient-to-b from-[#F9E50F] via-[#F9E50F] to-[#EFC609] shadow-green-shadow duration-300",
        )}
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
    <div className="relative -left-1 z-10 h-6 w-[40.8px]">
      <Level className="h-6 w-[40.8px]" />
      <p className="level-text absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-[14.4px] font-bold -tracking-wide text-white">
        {currentLevel + 1}
      </p>
    </div>
  </div>
);
