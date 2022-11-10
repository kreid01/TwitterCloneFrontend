import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IUser } from "../../consts/Interface";

export const useGetUsers = (query: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<IUser[]>();
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setUsers([]);
  }, [query]);

  const sendQuery = useCallback(
    async (query: string) => {
      try {
        await setLoading(true);
        await setError(false);
        const { data } = await axios.get<IUser[]>(
          `https://localhost:7227/users/search`,
          { params: { PageSize: 15, query: query } }
        );
        await setHasMore(data.length > 0);
        await setUsers((prevData) =>
          prevData !== undefined ? [...prevData, ...data] : []
        );
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
    sendQuery(query);
  }, [query, sendQuery]);
  return { loading, error, users };
};
