import { useEffect } from "react";

import { useRouter as useNextRouter } from "next/navigation";
import { useRouter } from "next/router";

import { ROUTES, ROUTES_WITH_CLOSE_BUTTON } from "@/constants/routes";
import { IWebApp } from "@/types/telegram";

export const useTelegramEffects = (webApp: IWebApp, pathname: string) => {
  const { back: navigateBack } = useNextRouter();
  const { push } = useRouter();

  useEffect(() => {
    if (!webApp) return;

    webApp.ready();
    webApp.SettingsButton.show();
    webApp.SettingsButton.onClick(() => {
      push(ROUTES.SETTINGS);
    });

    webApp.lockOrientation();
    webApp.disableVerticalSwipes();
    webApp.enableClosingConfirmation();
  }, [webApp]);

  useEffect(() => {
    if (!webApp) return;

    const availablePlatforms = ["android", "ios"];

    if (
      Number(webApp.version) >= 8 &&
      availablePlatforms.includes(webApp.platform || "")
    ) {
      webApp.requestFullscreen();
    }

    if (!ROUTES_WITH_CLOSE_BUTTON.includes(pathname)) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => navigateBack());
    } else {
      webApp.BackButton.hide();
    }
  }, [webApp, pathname, navigateBack]);
};
