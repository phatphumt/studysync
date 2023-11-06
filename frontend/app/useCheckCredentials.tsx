import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./SessionProvider";

const useCheckCredentials = () => {
  const user = useAuth();
  useEffect(() => {
    if (user?.user === null) {
      redirect("/login");
    }
  }, [user?.user]);
};

export default useCheckCredentials;
