import axios from "axios";
import { useState, useCallback, useEffect } from "react";

import { User } from "components/features/ProfilePageHead";

export const useGetUser = (id: string) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  const sendUser = useCallback(
    async (id: string) => {
      try {
        await setLoading(true);
        await setError(false);
        const { data } = await axios.get<User>(
          `https://localhost:7227/users/${id}`
        );
        setUser(await data);
      } catch (err) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    },
    [id]
  );

  useEffect(() => {
    sendUser(id);
  }, [id]);

  return { user, loading, error };
};
