import { useAuthContext } from "@/hooks/useAuthContext";
import { Login } from "@/lib/account";
import LoadingSpinner from "@/lib/loading";
import { HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function FAQ() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [initialLoad, setInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enterEffect, setEnterEffect] = useState(false);
  useEffect(() => {
    const initialUser = localStorage.getItem("user");
    if (initialLoad) {
      setInitialLoad(false);
      if (initialUser != null) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 2500);
      }
    }

    setTimeout(() => {
      setEnterEffect(true);
    }, 300);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading && user !== null) {
        router.push("/transaction");
      }
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, isLoading]);

  if (!enterEffect || isLoading) {
    return <LoadingSpinner />;
  }
  function changeType() {
    router.push("/signup");
  }

  function goHome() {
    router.push("/");
  }
  // grid place-items-center h-screen sm:pb-6 bg-gradient-to-t from-gray-100 to-gray-300
  return (
    <div className="grid place-items-center h-screen sm:pb-6 bg-gradient-to-t from-gray-100 to-gray-300">
      <HomeOutlined
        className="absolute right-10 top-10"
        style={{ fontSize: "130%" }}
        onClick={goHome}
      />
      <div className="p-10 py-[50px] bg-white">
        <Login change={changeType} />
      </div>
    </div>
  );
}
