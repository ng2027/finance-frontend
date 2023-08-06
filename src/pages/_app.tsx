import { AppProps } from "next/app";
import { useMemo, type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import "@/styles/globals.css";
import "tailwindcss/tailwind.css";
import "../styles/antd-ng.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "react-query";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <AuthContextProvider>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />

          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </NextUIProvider>
    </AuthContextProvider>
  );
}
