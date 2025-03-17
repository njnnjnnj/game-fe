import { useCallback } from "react";

import { useRouter } from "next/router";

import Cookies from "js-cookie";

import { Locale } from "@/constants/locale";

type LocaleManager = {
  locale: Locale;
  cookieLocale: Locale;
  detectedLocale: Locale;
  updateLocale: (locale: Locale) => void;
};

export const useLocaleManager = (): LocaleManager => {
  const router = useRouter();
  const updateLocale = useCallback(
    (locale: Locale) => {
      router.replace(router.route, router.asPath, { locale });
      Cookies.set("NEXT_LOCALE", locale, { expires: 7 });
    },
    [router],
  );

  const cookieLocale = Cookies.get("NEXT_LOCALE") as Locale;
  const detectedLocale = router.locale as Locale;

  return {
    locale: cookieLocale ?? detectedLocale,
    cookieLocale,
    detectedLocale,
    updateLocale,
  };
};
