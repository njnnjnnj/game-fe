import { useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";

import { Navbar } from "@/components/common/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { SettingsProvider } from "@/context";
import { TelegramProvider } from "@/context/telegram-context/TelegramContext";
import { useClientOnce } from "@/hooks/useClientOnce";
import { useLocaleManager } from "@/hooks/useLocaleManager";
import { initTgAnalytics } from "@/utils/lib/tg-analytics";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/styles/globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "";

export default function App({ Component, pageProps }: AppProps) {
  const isDev = process.env.NODE_ENV === "development";

  const [queryClient] = useState(() => new QueryClient());
  const { locale } = useLocaleManager();

  useClientOnce(() => {
    if (!isDev) {
      initTgAnalytics();
    }
  });

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="Europe/Moscow"
      messages={pageProps.messages}
    >
      <GoogleAnalytics gaId={GA_ID} />
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <TonConnectUIProvider manifestUrl="https://njnnjnnj.github.io/game-fe/manifest.json">
            <TelegramProvider>
              <SettingsProvider>
                <Head>
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                  />
                </Head>
                <div
                  className={`flex min-h-screen flex-col items-center justify-center font-[family-name:var(--font-rubik)]`}
                >
                  <Component {...pageProps} />
                  <Navbar />
                  <SpeedInsights />
                  <Toaster />
                  {isDev &&
                    process.env.NEXT_PUBLIC_IS_ENABLED_ERUDA === "true" && (
                      <Script
                        src="https://cdn.jsdelivr.net/npm/eruda"
                        strategy="afterInteractive"
                        onLoad={() => {
                          if (typeof window.eruda !== "undefined")
                            window.eruda.init({
                              tool: [
                                "console",
                                "elements",
                                "network",
                                "sources",
                              ],
                              useShadowDom: true,
                              autoScale: true,
                              defaults: {
                                displaySize: 50,
                                transparency: 0.9,
                                theme: "Monokai Pro",
                              },
                            });
                        }}
                      />
                    )}
                </div>
              </SettingsProvider>
            </TelegramProvider>
          </TonConnectUIProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
