import "@/styles/globals.css";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

import type { AppProps } from "next/app";
import { cn } from "@/utils/cn";

const queryClient = new QueryClient();

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <HeroUIProvider>
            <ToastProvider placement="top-right" toastOffset={30} />
            <main className={cn(inter.className)}>
              <Component {...pageProps} />
            </main>
          </HeroUIProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
