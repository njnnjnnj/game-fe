/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";
import Script from "next/script";

import { toast } from "sonner";

import { LoadingScreen } from "@/components/common";
import { Toast } from "@/components/ui/toast";
import { useGetProfile } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";
import { IWebApp, WebAppUser } from "@/types/telegram";

import { useTelegramAuth } from "./hooks/useTelegramAuth";
import { useTelegramEffects } from "./hooks/useTelegramEffects";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: WebAppUser;
  profile?: IProfile | null;
  isAuthenticating: boolean;
  isProfileLoading: boolean;
}

export const TelegramContext = createContext<ITelegramContext>({
  isAuthenticating: true,
  isProfileLoading: true,
});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null);
  const {
    isPending: isAuthenticating,
    isSuccess: isAuthSuccess,
    isError: isAuthError,
    refetch: refetchAuth,
  } = useTelegramAuth(webApp as IWebApp);
  console.log("🚀 ~ TelegramProvider ~ isAuthSuccess:", isAuthSuccess);
  const { pathname } = useRouter();
  const {
    data: profile,
    isPending: isProfileLoading,
    isSuccess: isProfileSuccess,
    error: profileError,
    refetch: refetchProfile,
  } = useGetProfile(isAuthSuccess);

  useEffect(() => {
    if (isAuthError) {
      toast(
        <Toast
          type="destructive"
          text="Authentication failed. Please try again."
        />,
      );
    }
  }, [isAuthError]);

  useEffect(() => {
    if (profileError) {
      toast(
        <Toast
          type="destructive"
          text="Getting profile failed. Please try again."
        />,
      );

      if (profileError.response?.status === 401) {
        // When invalid token, refetch auth and profile
        const refetch = async () => {
          await refetchAuth({ throwOnError: true });
          await refetchProfile();
        };

        refetch();
      }
    }
  }, [profileError, refetchAuth, refetchProfile]);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      setWebApp(window.Telegram.WebApp);
    }
  }, []);

  useTelegramEffects(webApp as IWebApp, pathname);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          user: webApp.initDataUnsafe?.user,
          profile,
          isAuthenticating,
          isProfileLoading,
        }
      : { isAuthenticating, isProfileLoading };
  }, [webApp, profile, isAuthenticating, isProfileLoading]);

  const showChildren =
    !isAuthenticating && !isProfileLoading && isProfileSuccess;

  return (
    <TelegramContext.Provider value={value}>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      {showChildren ? children : <LoadingScreen />}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
