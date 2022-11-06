import React, { useState, useEffect } from "react";
import { useGetUsers } from "hooks/users/useGetUsers";
import { User } from "../components/User/User";

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const { loading, error, users } = useGetUsers(query);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event?.target.value);
  };

  const usersList = () => {
    if (typeof users !== "undefined") {
      return users.map((user, index) => {
        return <User user={user} />;
      });
    }
  };

  return (
    <div className="ml-10 pt-5">
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
         block w-8/12 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
           dark:focus:border-blue-500" placeholder="Search Users'
        onChange={handleChange}
        placeholder="Search"
      ></input>
      <div>{usersList()}</div>
    </div>
  );
};
