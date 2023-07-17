import { Button, message, Spin } from "antd";
import { useLogout } from "@/hooks/useUserApi";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import LoadingSpinner from "@/lib/loading";
import { Layout } from "@/lib/(auth)/layout";

export default function DashBoard() {
  const router = useRouter();
  // const { user } = useAuthContext();
  // const [initialLoad, setInitialLoad] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  // if (initialLoad) {
  //   setInitialLoad(false);
  //   if (user == null) {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2500);
  //   }
  // }

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
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (isLoading && !user) {
  //       router.push("/");
  //     }
  //   }, 1200);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [user, isLoading]);

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

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
