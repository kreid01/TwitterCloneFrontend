import { IUser } from "consts/Interface";
import { useGetUser } from "context/UserContext";
import { Message, useGetMessages } from "hooks/messages/useGetMessages";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetChat } from "../hooks/messages/useGetChat";
import { MessageInput } from "./MessageInput";
import { sendMessage } from "../services/messages/sendMessage";
import { connection } from "../services/messages/sendMessage";
import { useInfiniteScroll } from "../hooks/utils/useInfiniteScroll";

interface Props {
  user: IUser;
}

export const MessageUser: React.FC<Props> = ({ user }) => {
  const currentUser = useGetUser();
  const { chat } = useGetChat(
    user?.userId as number,
    currentUser?.userId as number
  );
  const [page, setPage] = useState(0);
  const { messages, setMessages, hasMore } = useGetMessages(
    chat?.id as number,
    page as number
  );
  const [isMessaging, setIsMessaging] = useState(false);
  const [currentMessanger, setCurrentMessager] = useState<IUser>();
  const startMessage = (user: IUser) => {
    setIsMessaging(true);
    setCurrentMessager(user as IUser);
  };
  const [message, setMessage] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event?.target.value);
  };
  const { scrollPage, loader } = useInfiniteScroll(page, hasMore);

  useEffect(() => {
    setPage(scrollPage);
  }, [scrollPage]);

  const sendMessageToUser = () => {
    if (message.length > 0) {
      setMessage("");
      sendMessage(currentUser?.userName as string, chat?.id as number, message);
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
      if (chat?.id === newMessage.chatId)
        setMessages((prevState) => [
          ...(prevState as Array<Message>),
          newMessage,
        ]);
    });
  }, []);

  const messageList = () => {
    if (typeof messages !== "undefined") {
      return messages.map((message, index) => {
        return (
          <div className="my-4 -ml-20 border-b-2 flex-col w-[70vw] md:w-[50vw] lg:w-[37vw] justify-between">
            <p className="bg-blue-400 text-white px-4 py-2 rounded-2xl mb-2">
              {message.messageContent}
            </p>
            <p className="text-sm text-gray-300">
              {message.created.substring(16, 11)}
            </p>
            <p className="font-bold">{message?.senderName}:</p>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <div
        onClick={() => startMessage(user)}
        className=" my-3 border-gray-400 md:w-[53vw] lg:w-[40vw] border-b-[1px] px-4 py-4  w-[85vw] hover:bg-gray-100"
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
        <div className="h-64 w-[50w] md:w-[53vw] lg:w-[40vw] pl-20 overflow-y-scroll overflow-x-visible">
          {messageList()}
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
