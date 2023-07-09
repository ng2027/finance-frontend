import { Layout } from "@/lib/layout";
import type { ReactElement } from "react";

export default function Home() {
  return <div>home page</div>;
}

Home.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
