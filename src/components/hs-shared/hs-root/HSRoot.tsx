import React, { FunctionComponent, PropsWithChildren } from "react";

import { OverscrollBehavior, PageWrapper } from "@/components/common";
import { HSSharedProvider } from "@/context/hs-shared-context/HSSharedContext";

type Props = PropsWithChildren<{
  wrapperClassName?: string;
}>;

export const HSRoot: FunctionComponent<Props> = ({ wrapperClassName, children }) => (
  <PageWrapper
    className={wrapperClassName}
    overscrollBehaviour={OverscrollBehavior.NONE}
    disableSafeAreaInset
  >
    <HSSharedProvider>{children}</HSSharedProvider>
  </PageWrapper>
);
