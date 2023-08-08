import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../loading";
import { MenuBar } from "./menu";
import { useLogout } from "@/hooks/useUserApi";
import { message } from "antd";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { user } = useAuthContext();
  const [initialLoad, setInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  if (initialLoad) {
    setInitialLoad(false);
    if (user == null) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    }
  }

  useEffect(() => {
    if (isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="flex flex-col sm:flex-row w-full"
      style={{ backgroundColor: "#333333" }}
    >
      <div className="sm:w-1/4 sm:max-w-[280px] sm:min-w-[220px] ">
        <MenuBar user={user} />
      </div>
      <div className="p-0 m-0 grow ">{children}</div>
    </div>
  );
}

export { Layout };
