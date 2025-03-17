import { FC } from "react";

import { useTranslations } from "next-intl";

import { NS } from "@/constants/ns";
import { useSettings, useTelegram } from "@/context";
import InfoIcon from "@/public/assets/svg/info.svg";
import QuestionIcon from "@/public/assets/svg/question.svg";
import SoundIcon from "@/public/assets/svg/sound.svg";
import TelegramIcon from "@/public/assets/svg/telegram.svg";
import VibroIcon from "@/public/assets/svg/vibro.svg";

import { Language } from "../language/Language";
import { Layout } from "../layout/Layout";
import { SwitchSetting } from "../switch-setting/SwitchSetting";

export const ProfileLink: FC = () => {
  const t = useTranslations(NS.PAGES.SETTINGS.ROOT);
  const { handleUpdateSettings } = useSettings();
  const { webApp } = useTelegram();

  return (
    <div className="mt-8 flex h-fit w-full flex-col justify-between gap-y-6 text-white">
      <div className="flex h-max w-full flex-col gap-y-4">
        <Layout
          items={[
            {
              title: t(
                `${NS.PAGES.SETTINGS.GENERAL_SETTINGS.ROOT}.${NS.PAGES.SETTINGS.GENERAL_SETTINGS.TITLE}`,
              ),
              items: [
                {
                  icon: SoundIcon,
                  text: t(
                    `${NS.PAGES.SETTINGS.GENERAL_SETTINGS.ROOT}.${NS.PAGES.SETTINGS.GENERAL_SETTINGS.SOUND}`,
                  ),
                  onClick: () => handleUpdateSettings("sound"),
                  children: <SwitchSetting settingKey="sound" />,
                },
                {
                  icon: VibroIcon,
                  text: t(
                    `${NS.PAGES.SETTINGS.GENERAL_SETTINGS.ROOT}.${NS.PAGES.SETTINGS.GENERAL_SETTINGS.VIBRATIONS}`,
                  ),
                  onClick: () => handleUpdateSettings("vibrations"),
                  children: <SwitchSetting settingKey="vibrations" />,
                },
              ],
            },
            {
              title: t(
                `${NS.PAGES.SETTINGS.ABOUT_THE_APP.ROOT}.${NS.PAGES.SETTINGS.ABOUT_THE_APP.TITLE}`,
              ),
              items: [
                {
                  icon: InfoIcon,
                  text: t(
                    `${NS.PAGES.SETTINGS.ABOUT_THE_APP.ROOT}.${NS.PAGES.SETTINGS.ABOUT_THE_APP.RULES}`,
                  ),
                  isLink: true,
                  onClick: () =>
                    webApp && webApp.openTelegramLink("https://telegra.ph/api"),
                },
                {
                  icon: QuestionIcon,
                  text: t(
                    `${NS.PAGES.SETTINGS.ABOUT_THE_APP.ROOT}.${NS.PAGES.SETTINGS.ABOUT_THE_APP.SUPPORT}`,
                  ),
                  isLink: true,
                  onClick: () =>
                    webApp &&
                    webApp.openTelegramLink("https://t.me/MajesticGameSupport"),
                },
              ],
            },
            {
              title: t(
                `${NS.PAGES.SETTINGS.COMMUNITY.ROOT}.${NS.PAGES.SETTINGS.COMMUNITY.TITLE}`,
              ),
              items: [
                {
                  icon: TelegramIcon,
                  text: t(
                    `${NS.PAGES.SETTINGS.COMMUNITY.ROOT}.${NS.PAGES.SETTINGS.COMMUNITY.SUBSCRIBE}`,
                  ),
                  isLink: true,
                  onClick: () =>
                    webApp &&
                    webApp.openTelegramLink("https://t.me/Majestic_EN"),
                },
                {
                  icon: TelegramIcon,
                  text: t(
                    `${NS.PAGES.SETTINGS.COMMUNITY.ROOT}.${NS.PAGES.SETTINGS.COMMUNITY.LEARN_MORE}`,
                  ),
                  isLink: true,
                  onClick: () => console.log("learn"),
                },
              ],
            },
          ]}
        />
        <div className="h-px w-full rounded-full bg-white/10" />
        <Language />
      </div>
    </div>
  );
};
