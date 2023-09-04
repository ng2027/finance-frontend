import { Layout } from "@/lib/(not-auth)/layout";
import { ReactElement } from "react";

export default function FAQ() {
  return <div className="">Under Construction</div>;
}

FAQ.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
