import { Layout } from "@/lib/(not-auth)/layout";
import { ReactElement } from "react";

export default function Contact() {
  return <div className="">Contact</div>;
}

Contact.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
