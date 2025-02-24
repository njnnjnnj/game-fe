import React, { FunctionComponent } from "react";

type Props = {
  label: string;
  caption: string;
  progress: number;
};

export const Indicator: FunctionComponent<Props> = ({
  label,
  caption,
  progress,
}) => (
  <div className="flex grow flex-col gap-y-1">
    <div className="flex justify-between text-xs font-semibold text-white">
      <span>{label}</span>
      <span>{caption}</span>
    </div>
    <div className="h-1.5 rounded bg-[rgba(0,0,0,0.3)] shadow-heroes-stat-indicator-inner-dim">
      <div
        className="h-full max-w-full animate-heroes-stat-indicator-pulse rounded bg-[#FFCC00] shadow-heroes-stat-indicator-glow"
        style={{
          width: `${progress}%`,
          minWidth: progress > 0 ? 1 : undefined,
        }}
      />
    </div>
  </div>
);
