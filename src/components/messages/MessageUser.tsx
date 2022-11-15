import { IUser } from "consts/Interface";
import { useGetUser } from "context/UserContext";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useGetChat } from "../../hooks/messages/useGetChat";
import { MessageInput } from "./MessageInput";
import { sendMessage } from "../../services/messages/sendMessage";
import { connection } from "../../services/messages/sendMessage";

import axios from "axios";
import { InfiniteData, useInfiniteQuery } from "react-query";

interface Props {
  user: IUser;
}

export type Message = {
  id?: number;
  chatId: number;
  senderName: string;
  messageContent: string;
  created: string;
};

const getMesages = async (queryKey: any, pageParam: number) => {
  const { data } = await axios.get<Message[]>(
    `https://localhost:7227/chat/messages`,
    {
      params: {
        chatId: queryKey,
        PageNumber: pageParam,
        PageSize: 8,
      },
    }
  );
  return data as Message[];
};

export const MessageUser: React.FC<Props> = ({ user }) => {
  const currentUser = useGetUser();
  const { chat } = useGetChat(
    user?.userId as number,
    currentUser?.userId as number
  );
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetchingNextPage,
    refetch,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", chat?.id],
    queryFn: ({ pageParam = 1 }) => getMesages(chat?.id, pageParam),
    select: (data) => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams],
    }),
    getNextPageParam: (lastPage: Message[], allPages) => {
      const nextPage: number = allPages.length + 1;
      return lastPage.length !== 0 ? nextPage : undefined;
    },
  });
  const [isMessaging, setIsMessaging] = useState(false);
  const [currentMessanger, setCurrentMessager] = useState<IUser>();
  const [newMessages, setNewMessages] = useState<newMessage[]>([]);
  const startMessage = (user: IUser) => {
    setIsMessaging(true);
    setCurrentMessager(user as IUser);
  };
  const [message, setMessage] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event?.target.value);
  };

  const element = document.getElementById("messages");

  const sendMessageToUser = () => {
    const newMessage = {
      senderName: user?.userName as string,
      messageContent: message,
    };
    if (message.length > 0) {
      setNewMessages((prevState) => [
        ...(prevState as Array<newMessage>),
        newMessage,
      ]);
      sendMessage(currentUser?.userName as string, chat?.id as number, message);
      setMessage("");
      connection.invoke("NotifiyNewMessage", {
        messageContent: message,
        senderName: user?.userName,
        chatId: chat?.id,
        created: "Now",
      });
    }
  };

  useEffect(() => {
    connection.on("RecieveNewMessage", (newMessage) => {
      if (
        chat?.id === newMessage.chatId &&
        currentUser?.userName !== newMessage.senderName
      )
        refetch();
    });
  }, []);

  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );
  const loader = useRef(null);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  type newMessage = {
    senderName: string;
    messageContent: string;
  };

  useEffect(() => {
    if (element != null) element.scrollTop = element.scrollHeight;
  }, [data]);

  useEffect(() => {
    if (element != null) element.scrollTop = element.scrollHeight;
  }, [newMessages]);

  return (
    <div>
      <div
        onClick={() => startMessage(user)}
        className=" my-3 border-gray-400 md:w-[53vw] lg:w-[40vw] border-b-[1px] px-4 py-4  w-[85vw]"
      >
        <div className="flex">
          <img className="w-12 h-12 rounded-full" src={user?.userImg} alt="" />
          <div className="flex-col pl-4 w-max ">
            <div>
              <Link to={`/${user?.userAt}`}>
                <strong>{user?.userName}</strong>
              </Link>
            </div>
            <div className="-mt-1 mb-3">
              <span className="text-gray-500">@{user?.userAt}</span>
            </div>
          </div>
        </div>
        <div
          id="messages"
          className="h-[70vw]  w-[50w] md:w-[53vw] lg:w-[40vw] pl-20 overflow-y-scroll overflow-x-visible"
        >
          {data &&
            data?.pages.map((page) =>
              page.map((message, i) => {
                if ((i = page.length - 1)) {
                  return (
                    <div className="my-4 -ml-20 border-b-2 flex flex-col">
                      <p
                        ref={loader}
                        className="text-sm text-center text-gray-300 "
                      >
                        {message.created.substring(0, 10)}
                      </p>
                      {message.senderName !== user?.userName ? (
                        <p className="bg-blue-500 text-white self-end mr-3 px-4 py-2 rounded-2xl mb-2">
                          {message.messageContent}
                        </p>
                      ) : (
                        <p
                          ref={loader}
                          className="bg-gray-600 text-white self-start px-4 py-2 rounded-2xl mb-2"
                        >
                          {message.messageContent}
                        </p>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div className="my-4 -ml-20 border-b-2 flex flex-col">
                      <p className="text-sm text-center text-gray-300 ">
                        {message.created.substring(0, 10)}
                      </p>
                      {message.senderName !== user?.userName ? (
                        <p className="bg-blue-500 text-white self-end mr-3 px-4 py-2 rounded-2xl mb-2">
                          {message.messageContent}
                        </p>
                      ) : (
                        <p className="bg-gray-600 text-white self-start px-4 py-2 rounded-2xl mb-2">
                          {message.messageContent}
                        </p>
                      )}
                    </div>
                  );
                }
              })
            )}
          {newMessages &&
            newMessages.map((message) => (
              <div className="my-4 -ml-20 border-b-2 flex flex-col">
                <p className="text-sm text-center text-gray-300 ">Now</p>
                <p className="bg-blue-500 text-white self-end mr-3 px-4 py-2 rounded-2xl mb-2">
                  {message.messageContent}
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className="flex">
        <MessageInput
          placeholder="type your message"
          handleChange={handleChange}
          name="message"
          value={message}
        />
        <button
          type="submit"
          onClick={sendMessageToUser}
          className="button-primary ml-20"
        >
          Send
        </button>
      </div>
    </div>
  );
};
