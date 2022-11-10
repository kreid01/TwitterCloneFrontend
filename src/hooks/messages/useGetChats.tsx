import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { Chat } from "./useGetChat";

export const useGetChats = (user1: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chats, setChats] = useState<Chat[]>();

  const sendQuery = useCallback(
    async (user1: number) => {
      try {
        await setLoading(true);
        await setError(false);
        const { data } = await axios.get<Chat[]>(
          `https://localhost:7227/chat/users`,
          {
            params: { user1: user1 },
          }
        );
        await setChats(data);
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
    [user1]
  );

  useEffect(() => {
    sendQuery(user1);
  }, [user1, sendQuery]);
  return { loading, error, chats };
};
