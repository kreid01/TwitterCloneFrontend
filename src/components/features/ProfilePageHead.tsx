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
  userId: number;
};

interface Props {
  user: User;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfilePageHead: React.FC<Props> = ({ user, handleChange }) => {
  return (
    <div className="ml-20">
      <header
        className="flex pl-5 pt-1 pb-1 fixed w-full
            backdrop-blur-lg bg-slate-400 
            bg-opacity-5 z-2"
      >
        <Link to="/" className="mr-4 mt-4">
          <FaArrowLeft bg-red-100 />
        </Link>
        <div>
          <h2 className="font-bold">{user.userName}</h2>
          <p className="text-sm text-gray-400"> Tweets</p>
        </div>
      </header>
      <div className="pt-12">
        <img src={user.userCoverImg} alt="" className="h-44 w-full z-1" />
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
        <div className="mt-8 pl-5 mb-5">
          <div className="flex justify-around">
            <li className="list-none">
              <input
                value="tweets"
                className="hidden peer"
                id="tweets"
                type="radio"
                name="filterMethod"
                onChange={handleChange}
              />
              <label className="profile-link" htmlFor="tweets">
                Tweets
              </label>
            </li>
            <li className="list-none">
              <input
                name="filterMethod"
                className="hidden peer"
                id="replies"
                value="replies"
                type="radio"
                onChange={handleChange}
              />
              <label htmlFor="replies" className="profile-link">
                Tweets & Replies
              </label>
            </li>
            <li className="list-none">
              <input
                className="hidden peer"
                id="media"
                name="filterMethod"
                value="media"
                type="radio"
                onChange={handleChange}
              />
              <label className="profile-link" htmlFor="media">
                Media
              </label>
            </li>
            <li className="list-none">
              <input
                className="hidden peer"
                name="filterMethod"
                id="likes"
                value="likes"
                type="radio"
                onChange={handleChange}
              />
              <label className="profile-link" htmlFor="likes">
                Likes
              </label>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};
