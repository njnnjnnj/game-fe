import { FunctionComponent, ReactNode } from "react";

import classNames from "classnames";

import { HeaderInfo } from "../header-info/HeaderInfo";

type Props = {
  topInfoComponent: ReactNode;
  bottomInfoComponent: ReactNode;
  imageNode: ReactNode;
  hasBorder?: boolean;
  onClick?: () => void;
};

export const HeaderItem: FunctionComponent<Props> = ({
  topInfoComponent,
  bottomInfoComponent,
  imageNode,
  hasBorder,
  onClick,
}) => (
  <div
    className={classNames(
      "flex h-full flex-grow flex-row items-center justify-between px-3",
      {
        "border-r border-solid border-white/10": hasBorder,
      },
    )}
    onClick={onClick}
  >
    <div className="flex h-full w-full flex-1 flex-row items-center justify-center gap-x-[9px] transition-all active:scale-95">
      {imageNode}
      <HeaderInfo
        topComponent={topInfoComponent}
        bottomComponent={bottomInfoComponent}
      />
    </div>
  </div>
);
