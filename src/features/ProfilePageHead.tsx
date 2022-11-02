import React from "react";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export type User = {
  userName: string;
  userAt: number;
  userCoverImg: string;
  userImg: string;
  userEmail: string;
  userJoinDate: string;
  postsIds: Array<number>;
};

interface Props {
  user: User;
}

export const ProfilePageHead: React.FC<Props> = ({ user }) => {
  return (
    <div className="ml-20">
      <header
        className="flex pl-5 pt-1 pb-1 fixed w-full
            backdrop-blur-lg bg-slate-400 
            bg-opacity-5"
      >
        <Link to="/" className="mr-4 mt-4">
          <FaArrowLeft />
        </Link>
        <div>
          <h2 className="font-bold">{user.userName}</h2>
          <p className="text-sm text-gray-400"> Tweets</p>
        </div>
      </header>
      <img
        src={user.userCoverImg}
        alt=""
        className=" relative pt-14 h-56 w-full"
      />
      <img
        src={user.userImg}
        alt=""
        className="h-24 w-24 rounded-full border-x-neutral-50 border-2 absolute top-44 left-24"
      />
      <div className="mt-16 ml-5">
        <h2 className="text-lg font-bold">{user.userName}</h2>
        <p className="text-sm text-gray-500">@{user.userAt}</p>
        <div className="mt-4 text-sm flex text-gray-500">
          <FaCalendarAlt className="mr-1 self-center" />
          Joined {user.userJoinDate}
        </div>
      </div>
      <div className="mt-8 pl-5">
        <nav className="flex justify-around">
          <button className="profile-link">Tweets</button>
          <button>Tweets & Replies</button>
          <button>Media</button>
          <button>Likes</button>
        </nav>
      </div>
    </div>
  );
};
