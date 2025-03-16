import React, { FunctionComponent } from "react";

type Props = {
  label: string;
  caption: string;
  progress: number;
  isLoading?: boolean;
};

export const Indicator: FunctionComponent<Props> = ({
  label,
  caption,
  progress,
  isLoading,
}) => (
  <div className="flex grow flex-col gap-y-1">
    <div className="flex justify-between text-xs font-semibold text-white">
      {isLoading ? (
        <div className="h-3 w-2/5 animate-pulse rounded-[20px] bg-[#B9B9B9]" />
      ) : (
        <span>{label}</span>
      )}
      {isLoading ? (
        <div className="h-3 w-1/6 animate-pulse rounded-[20px] bg-[#B9B9B9]" />
      ) : (
        <span>{caption}</span>
      )}
    </div>
    <div className="h-1.5 rounded bg-[rgba(0,0,0,0.3)] shadow-heroes-stat-indicator-inner-dim">
      <div
        className="h-full max-w-full animate-heroes-stat-indicator-pulse rounded bg-[#FFCC00] shadow-heroes-stat-indicator-glow"
        style={{
          width: `${isLoading ? 0 : progress}%`,
          minWidth: !isLoading && progress > 0 ? 1 : undefined,
        }}
      />
    </div>
  </div>
);
