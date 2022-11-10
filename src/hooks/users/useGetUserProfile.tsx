import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { IUser } from "consts/Interface";

export const useGetUserProfile = (id: string) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<IUser>();

  const sendUser = useCallback(
    async (id: string) => {
      try {
        await setLoading(true);
        await setError(false);
        const { data } = await axios.get<IUser>(
          `https://localhost:7227/users/${id}`
        );
        setProfile(await data);
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

  return { profile, loading, error };
};
