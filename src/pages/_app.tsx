import "@/styles/globals.css";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <HeroUIProvider>
            <ToastProvider placement="top-right" toastOffset={30} />
            <Component {...pageProps} />
          </HeroUIProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
