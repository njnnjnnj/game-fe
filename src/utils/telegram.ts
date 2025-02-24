import { IWebApp } from "@/types/telegram";

export const getTgSafeAreaInsetTop = (webApp: IWebApp) => {
  const { safeAreaInset, contentSafeAreaInset } = webApp;

  return safeAreaInset.top + contentSafeAreaInset.top;
};
