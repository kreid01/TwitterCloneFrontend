import axios from "axios";
import { IUser } from "consts/Interface";
import { useState, useCallback, useEffect } from "react";

export const useGetFollows = (id: number, query: string) => {
  const [followers, setFollowers] = useState<IUser[]>();

  useEffect(() => {
    setFollowers([]);
  }, [query]);

  const sendQuery = useCallback(
    async (id: number, query: string) => {
      try {
        const { data } = await axios.get<IUser[]>(
          `https://localhost:7227/users/follows`,
          { params: { id: id, query: query } }
        );
        await setFollowers(data);
        console.log(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    },
    [query]
  );

  useEffect(() => {
    sendQuery(id, query);
  }, [query, sendQuery]);

  return { followers };
};
