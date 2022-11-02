import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IComment } from "consts/Interface";

export const useGetComments = (postId: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState<IComment[]>();
  const [hasMore, setHasMore] = useState<boolean>(false);

  const sendQuery = useCallback(
    async (postId: number) => {
      try {
        await setLoading(true);
        await setError(false);
        const { data } = await axios.get(
          `https://localhost:7227/comments/posts/${postId}`
        );
        await setHasMore(data.length > 0);
        await setComments(await data.result);
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
    [postId]
  );

  useEffect(() => {
    sendQuery(postId);
  }, [sendQuery, postId]);
  return { loading, error, comments, hasMore, setComments };
};
