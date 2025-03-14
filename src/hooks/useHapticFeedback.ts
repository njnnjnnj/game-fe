import { useSettings, useTelegram } from "@/context";
import { ImpactStyleEnum, NotificationEnum } from "@/types/telegram";

export const useHapticFeedback = () => {
  const { webApp } = useTelegram();
  const { settings: { vibrations } } = useSettings();

  const handleSelectionChanged = () => {
    if (vibrations && webApp) {
      webApp.HapticFeedback.selectionChanged();
    }
  };

  const handleNotificationOccurred = (type: NotificationEnum) => {
    if (vibrations && webApp) {
      webApp.HapticFeedback.notificationOccurred(type);
    }
  };

  const handleImpactOccurred = (style: ImpactStyleEnum) => {
    if (vibrations && webApp) {
      webApp.HapticFeedback.impactOccurred(style);
    }
  };

  return {
    handleSelectionChanged,
    handleNotificationOccurred,
    handleImpactOccurred,
  };
};
