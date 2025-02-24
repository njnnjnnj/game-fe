import { IWebApp, NotificationEnum } from "@/types/telegram";

export const handleSelectionChanged = (webApp: IWebApp | undefined) => {
  if (webApp) {
    webApp.HapticFeedback.selectionChanged();
  }
};

export const handleNotificationOccurred = (
  type: NotificationEnum,
  webApp: IWebApp | undefined,
) => {
  if (webApp) {
    webApp.HapticFeedback.notificationOccurred(type);
  }
};
