import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../loading";

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
    const timeoutId = setTimeout(() => {
      if (isLoading && !user) {
        router.push("/");
      }
    }, 1200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return <>{children}</>;
}

export { Layout };
