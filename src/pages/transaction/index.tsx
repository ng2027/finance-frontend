import { Button, message, Spin } from "antd";
import { useLogout } from "@/hooks/useUserApi";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import LoadingSpinner from "@/lib/loading";
import { Layout } from "@/lib/(auth)/layout";

export default function Transaction() {
  return (
    <div className="h-screen">
      <div>Transaction</div>
    </div>
  );
}

Transaction.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
