import { FC } from "react";

import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/common";
import { Checkbox } from "@/components/ui/checkbox";
import { Locale } from "@/constants/locale";
import { NS } from "@/constants/ns";
import { useLocaleManager } from "@/hooks/useLocaleManager";

export const Language: FC = () => {
  const t_settings = useTranslations(NS.PAGES.SETTINGS.ROOT);
  const { locale, updateLocale } = useLocaleManager();

  const handleLanguageChange = (locale: Locale) => {
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
    updateLocale(locale);
  };

  const currentLocale = locale;

  return (
    <div className="flex h-max w-full flex-col gap-y-5">
      <h2 className="text-shadowed bold-stroke text-xl font-black">
        {t_settings(
          `${NS.PAGES.SETTINGS.LANGUAGE.ROOT}.${NS.PAGES.SETTINGS.LANGUAGE.TITLE}`,
        )}
      </h2>
      <div className="flex min-h-[70px] w-full flex-col gap-y-[14px]">
        <LocaleSwitcher onClick={() => handleLanguageChange(Locale.RU)}>
          <div className="flex w-full cursor-pointer flex-row items-center justify-between">
            <p className="text-base font-medium text-white">Русский</p>
            <Checkbox className="size-6" checked={currentLocale === Locale.RU} />
          </div>
        </LocaleSwitcher>
        <LocaleSwitcher onClick={() => handleLanguageChange(Locale.EN)}>
          <div className="flex w-full cursor-pointer flex-row items-center justify-between">
            <p className="text-base font-medium text-white">English</p>
            <Checkbox className="size-6" checked={currentLocale === Locale.EN} />
          </div>
        </LocaleSwitcher>
      </div>
    </div>
  );
};
