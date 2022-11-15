import React, { useState } from "react";
import { User } from "components/User/User";
import { useGetUserProfile } from "hooks/users/useGetUserProfile";
import { useQuery } from "react-query";
import axios from "axios";
import { IUser } from "../../consts/Interface";

interface Props {
  id: string;
}
const getFollows = async ({ queryKey }: any) => {
  const { id, query } = queryKey[1];
  const { data } = await axios.get<IUser[]>(
    `https://localhost:7227/users/follows`,
    { params: { id: id, query: query } }
  );

  return data as IUser[];
};

export const ProfileFollowers: React.FC<Props> = ({ id }) => {
  const { profile } = useGetUserProfile(id as string);
  const [query, setQuery] = useState("followers");
  const queryKey = {
    id: profile?.userId as number,
    query: query,
  };
  const { data: followers } = useQuery(["followers", queryKey], getFollows);

  const usersList = () => {
    if (typeof followers !== "undefined") {
      return followers.map((user, index) => {
        return <User user={user} />;
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event?.target.value);
  };

  return (
    <>
      <div className="mt-8 ml-5 mb-5 w-8/12 md:w-3/6 lg:w-5/6">
        <div className="flex justify-between">
          <li className="list-none">
            <input
              value="followers"
              className="hidden peer"
              data-testid="followFilter"
              id="followers"
              type="radio"
              name="followFilter"
              onChange={handleChange}
            />
            <label className="profile-link" htmlFor="followers">
              Followers
            </label>
          </li>
          <li className="list-none">
            <input
              name="followFilter"
              className="hidden peer"
              id="following"
              value="following"
              type="radio"
              onChange={handleChange}
            />
            <label htmlFor="following" className="profile-link">
              Following
            </label>
          </li>
        </div>
        <div className="-ml-4 pt-4">{usersList()}</div>
      </div>
    </>
  );
};
