import { useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";

import { Navbar } from "@/components/common/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { SettingsProvider } from "@/context";
import { NavigationProvider } from "@/context/navigation-context/NavigationContext";
import { TelegramProvider } from "@/context/telegram-context/TelegramContext";
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
  const [queryClient] = useState(() => new QueryClient());
  const { locale } = useRouter();

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="Europe/Moscow"
      messages={pageProps.messages}
    >
      <GoogleAnalytics gaId={GA_ID} />
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <TonConnectUIProvider manifestUrl="https://taiga-labs.github.io/gorelko.json">
            <NavigationProvider>
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
                    {process.env.NEXT_PUBLIC_IS_ENABLED_ERUDA && (
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
            </NavigationProvider>
          </TonConnectUIProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
