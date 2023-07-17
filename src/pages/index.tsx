import { Layout } from "@/lib/(not-auth)/layout";
import { type ReactElement } from "react";

export default function Home() {
  return (
    <div style={{ backgroundColor: "red" }} className="h-screen">
      home page
    </div>
  );
}

Home.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
