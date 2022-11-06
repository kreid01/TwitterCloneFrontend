import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IUser } from "../consts/Interface";
import { MessageUser } from "./MessageUser";
import { MessageInput } from "./MessageInput";
import { useGetUser } from "context/UserContext";
import { sendMessage } from "../services/messages/sendMessage";

interface Props {
  messanger: IUser;
}

export const MessagePage: React.FC<Props> = ({ messanger }) => {
  const currentUser = useGetUser();
  const [isMessaging, setIsMessaging] = useState(false);
  const [currentMessanger, setCurrentMessager] = useState<IUser>();
  const startMessage = (user: IUser) => {
    setIsMessaging(true);
    setCurrentMessager(user);
  };
  const [message, setMessage] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event?.target.value);
  };

  return (
    <>
      <h1
        className="pl-5 pt-3 pb-3 fixed w-full md:w-[53vw] lg:w-[40vw]
              backdrop-blur-lg font-bold bg-slate-400 
              bg-opacity-5 font flex"
      >
        <Link to="/home" data-testid="backButton" className="mr-4 mt-1">
          <FaArrowLeft />
        </Link>
        Messages
      </h1>
      <div className="pt-8">
        <MessageUser user={messanger} startMessage={startMessage} />
      </div>
      <div className="flex">
        <MessageInput
          placeholder="type your message"
          handleChange={handleChange}
          name="message"
          value={message}
        />
        <button
          onClick={() =>
            sendMessage(currentUser, currentMessanger as IUser, message)
          }
          className="button-primary ml-20"
        >
          Send
        </button>
      </div>
    </>
  );
};
