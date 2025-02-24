import { useTelegram } from "@/context";
import { ImpactStyleEnum, NotificationEnum } from "@/types/telegram";

export const useHapticFeedback = () => {
  const { webApp } = useTelegram();

  const handleSelectionChanged = () => {
    if (webApp) {
      webApp.HapticFeedback.selectionChanged();
    }
  };

  const handleNotificationOccurred = (type: NotificationEnum) => {
    if (webApp) {
      webApp.HapticFeedback.notificationOccurred(type);
    }
  };

  const handleImpactOccurred = (style: ImpactStyleEnum) => {
    if (webApp) {
      webApp.HapticFeedback.impactOccurred(style);
    }
  };

  return {
    handleSelectionChanged,
    handleNotificationOccurred,
    handleImpactOccurred,
  };
};
