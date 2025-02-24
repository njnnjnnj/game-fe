import React, { FunctionComponent } from "react";

type Props = {
  text: string;
};

export const TopComponent: FunctionComponent<Props> = ({ text }) => {
  return (
    <p className="font-inter text-x font-medium text-white text-shadow-sm">
      {text}
    </p>
  );
};
