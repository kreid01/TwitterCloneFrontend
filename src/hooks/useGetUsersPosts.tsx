import axios from "axios";
import { useState, useCallback, useEffect } from "react";

import { IPost } from "consts/Interface";

export const useGetUserPosts = (postIds: Array<number>) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[]>();
  const [hasMore, setHasMore] = useState(false);

  const sendPosts = useCallback(
    async (postIds: Array<number>) => {
      try {
        await setLoading(true);
        await setError(false);
        const { data } = await axios.get<IPost[]>(
          `https://localhost:7227/posts/users/1`
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
    [postIds]
  );

  useEffect(() => {
    sendPosts(postIds);
  }, [postIds]);

  return { posts, loading, error, hasMore, setPosts };
};
