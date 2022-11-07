import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { IUser } from "../consts/Interface";
import { MessageUser } from "./MessageUser";
import { useGetUser } from "context/UserContext";
import { useGetChats } from "../hooks/messages/useGetChats";
import { deleteChat } from "../services/messages/deleteChat";
import { getUserAndSet } from "services/messages/getUserAndSet";

interface Props {
  messanger: IUser;
  setMessanger: (user: IUser) => void;
}

const trashChat = (event: any, chatId: number) => {
  event?.stopPropagation();
  deleteChat(chatId);
  window.location.reload();
};

export const MessagePage: React.FC<Props> = ({ messanger, setMessanger }) => {
  const currentUser = useGetUser();
  const { chats } = useGetChats(currentUser?.userId as number);
  const chatData = chats?.map((chat) => {
    if (chat.user1 === currentUser?.userId) {
      return (
        <div
          onClick={() => getUserAndSet(chat.user2At, setMessanger)}
          className="flex border-gray-400 md:w-[53vw] lg:w-[40vw] border-b-[1px] px-4 py-4  w-8/12 hover:bg-gray-100"
        >
          <img className="w-12 h-12 rounded-full" src={chat?.user2Img} alt="" />
          <div className="flex-col pl-4 w-max ">
            <div>
              <strong>{chat?.user2Name}</strong>
            </div>
            <div className="-mt-1 mb-3">
              <Link to={`/${chat?.user2At}`}>
                <span className="text-gray-500">@{chat?.user2At}</span>
              </Link>
            </div>
          </div>
          <button
            onClick={(event) => trashChat(event, chat.id)}
            className="ml-32"
          >
            <FaTrash>Delete</FaTrash>
          </button>
        </div>
      );
    } else {
      return (
        <div
          onClick={() => getUserAndSet(chat.user1At, setMessanger)}
          className="flex border-gray-400 md:w-[53vw] lg:w-[40vw] border-b-[1px] px-4 py-4  w-8/12 hover:bg-gray-100"
        >
          <img className="w-12 h-12 rounded-full" src={chat?.user1Img} alt="" />
          <div className="flex-col pl-4 w-max ">
            <div>
              <strong>{chat?.user1Name}</strong>
            </div>
            <div className="-mt-1 mb-3">
              <Link to={`/${chat?.user1At}`}>
                <span className="text-gray-500">@{chat?.user1At}</span>
              </Link>
            </div>
          </div>
          <button
            onClick={(event) => trashChat(event, chat.id)}
            className="ml-32"
          >
            <FaTrash>Delete</FaTrash>
          </button>
        </div>
      );
    }
  });

  return (
    <>
      <h1
        className="pl-5 pt-3 lg:ml-[5px] pb-3 fixed w-full md:w-[53vw] lg:w-[40vw]
              backdrop-blur-lg font-bold bg-slate-400 
              bg-opacity-5 font flex"
      >
        {!messanger ? (
          <Link to="/chatpage" data-testid="backButton" className="mr-4 mt-1">
            <FaArrowLeft />
          </Link>
        ) : (
          <button onClick={() => setMessanger(null)} className="mr-4 mt-1">
            <FaArrowLeft />
          </button>
        )}
        Messages
      </h1>
      {!messanger ? (
        <div className="pt-12">{chatData}</div>
      ) : (
        <div className="pt-9 flex-col-reverse">
          {messanger && <MessageUser user={messanger} />}
        </div>
      )}
    </>
  );
};
