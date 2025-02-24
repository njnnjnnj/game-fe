import React, {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from "react";

import classNames from "classnames";

import { LoadingScreen } from "@/components/common";
import { useTelegram } from "@/context";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

import { PAGE_WRAPPER_ID as PAGE_WRAPPER_INTERNAL_ID } from "./constants";

export { PAGE_WRAPPER_INTERNAL_ID as PAGE_WRAPPER_ID };

export enum OverscrollBehavior {
  CONTAIN = "contain",
  NONE = "none",
}

type Props = {
  isLoading?: boolean;
  disableSafeAreaInset?: boolean;
  placeholder?: ReactNode;
  overscrollBehaviour?: OverscrollBehavior;
  id?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const PageWrapper: FunctionComponent<Props> = ({
  children,
  className,
  isLoading,
  placeholder,
  overscrollBehaviour = OverscrollBehavior.CONTAIN,
  disableSafeAreaInset = false,
  id = PAGE_WRAPPER_INTERNAL_ID,
  ...props
}) => {
  const { webApp, isAuthenticating } = useTelegram();

  if (!webApp?.initDataUnsafe?.user || isAuthenticating || isLoading) {
    return <LoadingScreen placeholder={placeholder} />;
  }

  const insetTop = getTgSafeAreaInsetTop(webApp);

  return (
    <div
      id={id}
      className={classNames(
        "h-screen max-h-screen w-full overflow-y-auto",
        {
          "overscroll-contain":
            overscrollBehaviour === OverscrollBehavior.CONTAIN,
          "overscroll-none": overscrollBehaviour === OverscrollBehavior.NONE,
        },
        className,
      )}
      style={
        !disableSafeAreaInset && insetTop ? { paddingTop: insetTop } : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
};
