import { useEffect, useState } from "react";
import { NavBar } from "./navbar";
import LoadingSpinner from "../loading";
import { useRouter } from "next/router";
import { useAuthContext } from "@/hooks/useAuthContext";

function Layout({ children }: { children: React.ReactNode }) {
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
        router.push("/dashboard");
      }
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, isLoading]);

  if (!enterEffect || isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export { Layout };
