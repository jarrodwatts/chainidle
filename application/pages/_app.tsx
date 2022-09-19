import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../const/mui/theme";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import createEmotionCache from "../lib/mui/createEmotionCache";
import { CHAIN_ID } from "../const/contractAddresses";
import { useState } from "react";
import LoadingContext from "../context/LoadingContext";
import ErrorContext from "../context/ErrorContext";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const [loading, setLoading] = useState<{
    loading: boolean;
    message: string;
  }>({
    loading: false,
    message: "",
  });
  const [error, setError] = useState<boolean>(false);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ThirdwebProvider desiredChainId={CHAIN_ID}>
      <CacheProvider value={emotionCache}>
        <ErrorContext error={error} setError={setError}>
          <LoadingContext loading={loading} setLoading={setLoading}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              {error && <ErrorOverlay />}
              {!error && loading.loading && (
                <LoadingOverlay loadingMessage={loading.message} />
              )}

              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* @ts-ignore */}
              <Component {...pageProps} />
            </ThemeProvider>
          </LoadingContext>
        </ErrorContext>
      </CacheProvider>
    </ThirdwebProvider>
  );
}
