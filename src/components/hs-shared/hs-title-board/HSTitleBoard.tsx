import React, { FunctionComponent } from "react";

import classNames from "classnames";

type Props = {
  className?: string;
  title: string | null;
};

export const HSTitleBoard: FunctionComponent<Props> = ({
  className,
  title,
}) => (
  <div
    className={classNames(
      "w-fit rounded-t-2xl bg-[#FFCE08] px-1 pt-1",
      className,
    )}
  >
    <div
      className={classNames(
        "w-fit rounded-b-md rounded-t-xl bg-[#A6562D] px-[30px] py-2 shadow-battle-pass-combined",
        "text-stroke-half text-2xl font-black uppercase tracking-wide text-white text-shadow",
      )}
    >
      {title}
    </div>
  </div>
);
