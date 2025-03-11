import { useEffect } from "react";

import { useRouter as useNextRouter } from "next/navigation";
import { useRouter } from "next/router";

import { ROUTES, ROUTES_WITH_CLOSE_BUTTON } from "@/constants/routes";
import { useNavigation } from "@/context/navigation-context/NavigationContext";
import { IWebApp } from "@/types/telegram";
// import { getUserDeviceInfo } from "@/utils/lib/userDevice";

export const useTelegramEffects = (webApp: IWebApp, pathname: string) => {
  const { goBack } = useNavigation();
  const { push } = useRouter();

  // const deviceInfo = getUserDeviceInfo();

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
      webApp.BackButton.onClick(() => goBack());
    } else {
      webApp.BackButton.hide();
    }
  }, [webApp, pathname]);
};
