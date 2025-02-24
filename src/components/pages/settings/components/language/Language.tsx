import { FC } from "react";

import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/common";
import { Checkbox } from "@/components/ui/checkbox";
import { LOCALES } from "@/constants/locale";
import { NS } from "@/constants/ns";
import { useSettings } from "@/context";

export const Language: FC = () => {
  const t_settings = useTranslations(NS.PAGES.SETTINGS.ROOT);
  const { route, locale } = useRouter();
  const {
    settings: { vibrations },
  } = useSettings();

  const handleLanguageChange = () => {
    if (vibrations) {
      window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }
  };

  return (
    <div className="flex h-max w-full flex-col gap-y-5">
      <h2 className="text-shadowed bold-stroke text-xl font-black">
        {t_settings(
          `${NS.PAGES.SETTINGS.LANGUAGE.ROOT}.${NS.PAGES.SETTINGS.LANGUAGE.TITLE}`,
        )}
      </h2>
      <div className="flex min-h-[70px] w-full flex-col gap-y-[14px]">
        <LocaleSwitcher route={route} locale={LOCALES.RU}>
          <div
            className="flex w-full cursor-pointer flex-row items-center justify-between"
            onClick={() => handleLanguageChange()}
          >
            <p className="text-base font-medium text-white">Русский</p>
            <Checkbox className="size-6" checked={locale === LOCALES.RU} />
          </div>
        </LocaleSwitcher>
        <LocaleSwitcher route={route} locale={LOCALES.EN}>
          <div
            className="flex w-full cursor-pointer flex-row items-center justify-between"
            onClick={() => handleLanguageChange()}
          >
            <p className="text-base font-medium text-white">English</p>
            <Checkbox className="size-6" checked={locale === LOCALES.EN} />
          </div>
        </LocaleSwitcher>
      </div>
    </div>
  );
};
