import React, { FC } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import { EmotionCache } from "@emotion/cache";
import { createEmotionCache } from "@/utils";
import { MUIProvider } from "@/providers";
import { NextPageWithLayout } from "@/interfaces/layout";
import Script from "next/script";
import "@fontsource/poppins"; 
import "@fontsource/yellowtail"; 
import "@/styles/globals.css";
import "@/styles/react-slick.css";
import "slick-carousel/slick/slick.css";
import 'leaflet/dist/leaflet.css';

type AppPropsWithLayout = AppProps & {
  emotionCache: EmotionCache;
  Component: NextPageWithLayout;
};

const clientSideEmotionCache = createEmotionCache();

const App: FC<AppPropsWithLayout> = (props: AppPropsWithLayout) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script async defer src="//www.instagram.com/embed.js"></Script>

      <Script id="google-analytics-script" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Pedabrain</title>
      </Head>
      <MUIProvider>{getLayout(<Component {...pageProps} />)}</MUIProvider>
    </CacheProvider>
  );
};

export default App;
