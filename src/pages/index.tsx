import { Layout } from "@/lib/(not-auth)/layout";
import { type ReactElement } from "react";

export default function Home() {
  return (
    <div className="flex flex-col justify-between h-full ">
      <div>hi</div>
      <div>yo</div>
    </div>
  );
}

Home.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
