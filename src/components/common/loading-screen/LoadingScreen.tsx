import React, { FunctionComponent, ReactNode } from "react";

import classNames from "classnames";

import { Spinner } from "@/components/common";

type Props = {
  placeholder?: ReactNode;
};

export const LoadingScreen: FunctionComponent<Props> = ({ placeholder }) => (
  <div
    className={classNames(
      "flex h-screen max-h-screen w-full justify-center bg-blue-800",
      { "items-center": !placeholder },
    )}
  >
    {placeholder ? placeholder : <Spinner className="mx-auto stroke-white" />}
  </div>
);
