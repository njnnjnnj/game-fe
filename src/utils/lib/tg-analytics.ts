import telegramAnalytics from "@telegram-apps/analytics";

const token = process.env.NEXT_PUBLIC_TG_ANALYTICS_AUTH_TOKEN;
const appName = process.env.NEXT_PUBLIC_TG_ANALYTICS_APP_NAME;

export const initTgAnalytics = () => {
  if (token && appName) {
    telegramAnalytics.init({
      token: "YOUR_TOKEN",
      appName: "ANALYTICS_IDENTIFIER",
    });
  }
};
