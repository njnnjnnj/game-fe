import { useEffect } from "react";

import { useRouter } from "next/router";

import { Locale } from "@/constants/locale";
import { ROUTES, ROUTES_WITH_CLOSE_BUTTON } from "@/constants/routes";
import { useLocaleManager } from "@/hooks/useLocaleManager";
import { IWebApp } from "@/types/telegram";

export const useTelegramEffects = (webApp: IWebApp, pathname: string) => {
  const { push, back } = useRouter();
  const { cookieLocale, updateLocale } = useLocaleManager();

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

    // Fullscreen mode
    const availablePlatforms = ["android", "ios"];

    if (
      Number(webApp.version) >= 8 &&
      availablePlatforms.includes(webApp.platform || "")
    ) {
      webApp.requestFullscreen();
    }
  }, [webApp]);

  useEffect(() => {
    if (!webApp) return;
    // Set up Back Button
    if (!ROUTES_WITH_CLOSE_BUTTON.includes(pathname)) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(back);
    } else {
      webApp.BackButton.hide();
    }
  }, [webApp, pathname, back]);

  useEffect(() => {
    if (!webApp || !!cookieLocale) return;
    // Set up a locale taken from Telegram
    const tgUserLocale = webApp.initDataUnsafe?.user?.language_code;
    if (tgUserLocale && tgUserLocale !== cookieLocale) {
      if (tgUserLocale === Locale.EN || tgUserLocale === Locale.RU) {
        updateLocale(tgUserLocale as Locale);
      } else {
        updateLocale(Locale.EN);
      }
    }
  }, [webApp]);
};
