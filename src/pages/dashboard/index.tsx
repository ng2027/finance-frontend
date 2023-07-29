import { ReactElement, useEffect, useState } from "react";
import LoadingSpinner from "@/lib/loading";
import { Layout } from "@/lib/(auth)/layout";

export default function DashBoard() {
  return (
    <div className="h-screen">
      <div>Dashboard</div>
    </div>
  );
}

DashBoard.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
