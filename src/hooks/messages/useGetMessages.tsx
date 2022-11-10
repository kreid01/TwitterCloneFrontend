import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export type Message = {
  id?: number;
  chatId: number;
  senderName: string;
  messageContent: string;
  created: string;
};

export const useGetMessages = (chatId: number, page: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState<Message[]>();
  const [hasMore, setHasMore] = useState<boolean>(false);

  
async function getBooks() {
  const res = await fetch("https://localhost:7147/books", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data);

  return data;
}

getBooks();
  const sendQuery = useCallback(
    async (chatId: number, page: number) => {
      if (chatId !== 1) {
        try {
          await setLoading(true);
          await setError(false);
          const { data } = await axios.get<Message[]>(
            `https://localhost:7227/chat/messages`,
            { params: { chatId: chatId } }
          );
          await setHasMore(data.length > 0);
          await setMessages((prevData) =>
            prevData !== undefined ? [...prevData, ...data] : []
          );
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
    [chatId]
  );

  useEffect(() => {
    sendQuery(chatId, page);
  }, [chatId, page, sendQuery]);
  return { loading, error, messages, hasMore, setMessages };
};
