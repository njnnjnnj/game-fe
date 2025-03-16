import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";

type Props = {
  isMovingIn: boolean;
  isMovingOut: boolean;
};

export const SceneFooter: FunctionComponent<Props> = ({ isMovingIn, isMovingOut }) => {
  const t = useTranslations(NS.COMMON.ROOT);

  return (
    <div
      className={classNames(
        "absolute inset-x-10 text-center font-black uppercase italic leading-none text-white transition-[top] duration-500 ease-linear text-shadow [font-size:min(7.6vw,3.5vh)]",
        {
          "top-[85vh]": isMovingIn,
          "top-[120vh]": isMovingOut,
        },
      )}
    >
      <div className="animate-slot-win-view-text-pulse">
        {t(`${NS.COMMON.TAP_TO_CONTINUE}`)}
      </div>
    </div>
  );
};
