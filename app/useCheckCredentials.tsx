import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./SessionProvider";

const useCheckCredentials = (url: string) => {
  const user = useAuth();
  useEffect(() => {
    if (user?.user === null) {
      redirect(url);
    }
  }, [user?.user, url]);
};

export default useCheckCredentials;
