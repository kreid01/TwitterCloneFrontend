import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export type Chat = {
  id: number;
  user1: number;
  user2: number;
  user1Name: string;
  user2Name: string;
  user1At: string;
  user2At: string;
  user1Img: string;
  user2Img: string;
};

export const useGetChat = (user1: number, user2: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chat, setChat] = useState<Chat>();

  const sendQuery = useCallback(
    async (user1: number, user2: number) => {
      if (user2 !== 0) {
        try {
          await setLoading(true);
          await setError(false);
          const { data } = await axios.get<Chat>(
            `https://localhost:7227/chat`,
            {
              params: { user1: user1, user2: user2 },
            }
          );
          await setChat(data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
          } else {
            console.log("unexpected error: ", error);
            return "An unexpected error occurred";
          }
        }
      }
    },
    [user1, user2]
  );

  useEffect(() => {
    sendQuery(user1, user2);
  }, [user1, user2, sendQuery]);
  return { loading, error, chat };
};
