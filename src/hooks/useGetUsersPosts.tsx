import axios from "axios";
import { useState, useCallback, useEffect } from "react";

import { IPost } from "consts/Interface";

export const useGetUserPosts = (
  userId: number,
  query: string,
  page: number,
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>,
  isReset: boolean
) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[]>();
  const [hasMore, setHasMore] = useState(false);

  const sendQuery = useCallback(
    async (userId: number, query: string, page: number) => {
      try {
        if (isReset) {
          setPosts([]);
          setIsReset(false);
        }
        await setLoading(true);
        await setError(false);
        const { data } = await axios.get<IPost[]>(
          `https://localhost:7227/posts/users/${userId}`,
          {
            params: {
              filterMethod: query,
              PageNumber: page,
              PageSize: 5,
            },
          }
        );
        await setHasMore(data.length > 0);
        await setPosts((prevData) =>
          prevData !== undefined ? [...prevData, ...data] : []
        );
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
    [userId, , page, isReset]
  );

  useEffect(() => {
    sendQuery(userId, query, page);
  }, [userId, query, page]);

  return { posts, loading, error, hasMore, setPosts };
};
