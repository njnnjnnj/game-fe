import { createContext, FC, useContext, useEffect, useState } from "react";

import { NotificationEnum } from "@/types/telegram";

export type Settings = {
  sound: boolean;
  vibrations: boolean;
};

export type SettingsContextValue = {
  settings: Settings;
  handleUpdateSettings: (
    setting: keyof Settings,
    value?: boolean | string,
  ) => void;
  isPromotionModalShown: boolean;
  setIsPromotionModalShown: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined,
);

const SETTINGS_KEY = "app_settings";

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      return savedSettings
        ? JSON.parse(savedSettings)
        : { sound: false, vibrations: false };
    }
    return { sound: false, vibrations: false };
  });
  const [isPromotionModalShown, setIsPromotionModalShown] =
    useState(false);
 
  const handleUpdateSettings = (
    setting: keyof Settings,
    value?: boolean | string,
  ) => {
    if (setting === "sound") {
      if (settings.vibrations) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(
          NotificationEnum.ERROR,
        );
      }
      return;
    }

    setSettings((prev) => {
      const updatedSettings = {
        ...prev,
        [setting]: typeof value === "boolean" ? value : !prev[setting],
      };

      if (setting === "vibrations" && updatedSettings.vibrations === true) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      }

      return updatedSettings;
    });
  };

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        handleUpdateSettings,
        isPromotionModalShown,
        setIsPromotionModalShown,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
