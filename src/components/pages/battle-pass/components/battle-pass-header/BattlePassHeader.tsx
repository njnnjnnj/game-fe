import React, { FunctionComponent } from "react";

type Props = {
  bgScaleDelta: number;
};

export const BattlePassHeader: FunctionComponent<Props> = ({
  bgScaleDelta,
}) => {
  return (
    <div
      className="fixed inset-0 bg-[url('/assets/png/battle-pass/bg.webp')] bg-center-top bg-no-repeat"
      style={{
        backgroundSize: `calc(100% + ${bgScaleDelta}px)`,
      }}
    />
  );
};
