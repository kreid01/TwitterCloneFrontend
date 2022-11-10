import React from "react";

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfilePostFilters: React.FC<Props> = ({ handleChange }) => {
  return (
    <div className="mt-8 pl-5 mb-5 ">
      <div className="flex justify-around">
        <li className="list-none">
          <input
            value="tweets"
            className="hidden peer"
            data-testid="profileFilter"
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
  );
};
