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
import ErrorOverlay from "../components/overlay/ErrorOverlay";
import SuccessContext from "../context/SuccessContext";
import LoadingOverlay from "../components/overlay/LoadingOverlay";
import SuccessOverlay from "../components/overlay/SuccessOverlay";
import Character from "../types/Character";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  // Loading
  const [loading, setLoading] = useState<{
    loading: boolean;
    message: string;
    character?: Character;
  }>({
    loading: false,
    message: "",
  });

  // Success
  const [success, setSuccess] = useState<{
    success: boolean;
    message: string;
    character?: Character;
  }>({
    success: false,
    message: "",
  });

  // Error
  const [error, setError] = useState<{
    error: boolean;
    message: string;
    character?: Character;
  }>({
    error: false,
    message: "",
  });

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ThirdwebProvider desiredChainId={CHAIN_ID}>
      <CacheProvider value={emotionCache}>
        <ErrorContext error={error} setError={setError}>
          <SuccessContext success={success} setSuccess={setSuccess}>
            <LoadingContext loading={loading} setLoading={setLoading}>
              <Head>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>
              <ThemeProvider theme={theme}>
                {error.error && <ErrorOverlay character={error.character} />}
                {!error.error && loading.loading && (
                  <LoadingOverlay
                    loadingMessage={loading.message}
                    character={loading.character}
                  />
                )}
                {!error.error && !loading.loading && success.success && (
                  <SuccessOverlay
                    successMessage={success.message}
                    character={success.character}
                  />
                )}

                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {/* @ts-ignore */}
                <Component {...pageProps} />
              </ThemeProvider>
            </LoadingContext>
          </SuccessContext>
        </ErrorContext>
      </CacheProvider>
    </ThirdwebProvider>
  );
}
