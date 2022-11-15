import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGetUser } from "context/UserContext";
import { SignoutButton } from "../SignoutButton/SignoutButton";
import { updateFollows } from "services/users/updateFollows";
import { IUser } from "consts/Interface";
import { useGetLoggedInUser } from "../../../hooks/users/useGetLoggedInUser";

interface Props {
  user: IUser;
  createChat: (user: IUser) => void;
}

export const ProfileHeader: React.FC<Props> = ({ user, createChat }) => {
  const currentUser = useGetUser();
  const [submit, setSubmit] = useState(false);
  const [isFollowing, setIsFollowing] = useState(
    currentUser?.followers != null &&
      currentUser.followers.includes(user?.userId as number)
      ? true
      : false
  );

  const toggleFollow = () => {
    setIsFollowing((prevState) => !prevState);
    updateFollows(currentUser, user);
    setSubmit(true);
  };

  const loginInData = {
    email: currentUser?.userEmail,
    password: currentUser?.userPassword,
  };

  type loginDetailT = {
    email: string;
    password: string;
  };

  const {} = useGetLoggedInUser(loginInData as loginDetailT, submit, setSubmit);

  return (
    <header
      className="flex pl-5 py-1 pb-2 fixed w-full md:w-[53vw] lg:w-[40vw] pr-3 z-10
            backdrop-blur-lg bg-slate-400 
            bg-opacity-5 z-2"
    >
      <Link to="/home" data-testid="backButton" className="mr-4 mt-4">
        <FaArrowLeft />
      </Link>
      <div>
        <h2 className="font-bold">{user?.userName}</h2>
        <p className="text-sm text-gray-400"> Tweets</p>
      </div>
      {currentUser === null ? null : currentUser?.userId === user?.userId ? (
        <SignoutButton />
      ) : (
        <>
          <Link
            onClick={() => createChat(user)}
            className="ml-auto button-primary mr-0"
            to="/messages"
          >
            Message
          </Link>
          <button
            onClick={toggleFollow}
            className="button-primary ml-2 mr-2 md:mr-0"
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </>
      )}
    </header>
  );
};
