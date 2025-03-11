import React, { FunctionComponent } from "react";

type Props = {
  topComponent: React.ReactNode;
  bottomComponent: React.ReactNode;
};

export const HeaderInfo: FunctionComponent<Props> = ({
  topComponent,
  bottomComponent,
}) => {
  return (
    <div className="flex h-full w-fit flex-col justify-center gap-y-1">
      <div className="font-inter text-x font-medium text-white">
        {topComponent}
      </div>
      <div className="text-stroke-1 text-nowrap text-xs font-black tracking-[0.04em] text-white text-shadow-sm">
        {bottomComponent}
      </div>
    </div>
  );
};
