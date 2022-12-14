import { IUser } from "consts/Interface";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  user: IUser;
}

export const User: React.FC<Props> = ({ user }) => {
  return (
    <Link
      to={`/${user?.userAt}`}
      className=" my-3 flex border-gray-400 md:w-[53vw] lg:w-[40vw] border-b-[1px] px-4 py-4  w-8/12 hover:bg-gray-100"
    >
      <img className="w-12 h-12 rounded-full" src={user?.userImg} alt="" />
      <div className="flex-col pl-4 w-max ">
        <div>
          <strong>{user?.userName}</strong>
        </div>
        <div className="-mt-1 mb-3">
          <span className="text-gray-500">@{user?.userAt}</span>
        </div>
      </div>
    </Link>
  );
};
