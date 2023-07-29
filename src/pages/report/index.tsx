import { Button, message, Spin } from "antd";
import { useLogout } from "@/hooks/useUserApi";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import LoadingSpinner from "@/lib/loading";
import { Layout } from "@/lib/(auth)/layout";

export default function Report() {
  return (
    <div className="h-screen">
      <div>Report</div>
    </div>
  );
}

Report.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
