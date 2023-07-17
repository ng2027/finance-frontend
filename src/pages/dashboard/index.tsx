import { Button, message, Spin } from "antd";
import { useLogout } from "@/hooks/useUserApi";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import LoadingSpinner from "@/lib/loading";
import { Layout } from "@/lib/(auth)/layout";

export default function DashBoard() {
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const { logout } = useLogout();
  function handleLogout(e: any) {
    logout();
    messageApi.open({
      type: "success",
      content: "Successfully Logged out.",
      duration: 5,
    });

    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  return (
    <div className="h-screen" style={{ backgroundColor: "cyan" }}>
      {contextHolder}

      <div>
        Dashboard
        <Button
          type="primary"
          style={{ backgroundColor: "black", borderRadius: "6px" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Button
          onClick={() =>
            messageApi.open({
              type: "success",
              content: "Successfully Logged out.",
              duration: 5,
            })
          }
        >
          state isloading
        </Button>
      </div>
    </div>
  );
}

DashBoard.getLayout = function PageLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
