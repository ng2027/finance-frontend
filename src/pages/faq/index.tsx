import { Layout } from "@/lib/layout";
import { ReactElement } from "react";

export default function FAQ() {
  return <div className="">FAQ</div>;
}

FAQ.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
