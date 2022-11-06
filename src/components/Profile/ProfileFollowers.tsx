import React, { useState } from "react";
import { User } from "components/User/User";
import { useGetFollows } from "hooks/users/useGetFollows";
import { useGetUserProfile } from "hooks/users/useGetUserProfile";

interface Props {
  id: string;
}

export const ProfileFollowers: React.FC<Props> = ({ id }) => {
  const { profile } = useGetUserProfile(id as string);
  const [query, setQuery] = useState("followers");

  const { followers } = useGetFollows(profile?.userId as number, query);

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
        <div className="ml-3 pt-4">{usersList()}</div>
      </div>
    </>
  );
};
