import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGetUser } from "context/UserContext";
import { SignoutButton } from "../SignoutButton/SignoutButton";

import { User } from "../ProfileCover/ProfileCover";

interface Props {
  user: User;
}

export const ProfileHeader: React.FC<Props> = ({ user }) => {
  const currentUser = useGetUser();

  return (
    <header
      className="flex pl-5 py-1 pb-2 fixed w-[84vw]  md:w-[49vw] lg:w-[40vw] pr-3 z-10
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
      {currentUser?.userId === user.userId && <SignoutButton />}
    </header>
  );
};
