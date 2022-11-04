import { useEffect, useState } from "react";
import { useUpdateUser } from "context/UserContext";

export const useLogoutUser = (logout: boolean) => {
  const logoutUser = useUpdateUser();
  const [logoutSuccessful, setLogoutSuccessful] = useState(false);

  useEffect(() => {
    if (logout) {
      if (logoutUser !== null) logoutUser(null);
      setLogoutSuccessful(true);
    }
  }, [logout]);

  return { logoutSuccessful };
};
