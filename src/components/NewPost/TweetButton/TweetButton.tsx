import React from "react";

interface Props {
  handleTweet: () => void;
  label: string;
  isDisabled: boolean;
}

export const TweetButton: React.FC<Props> = ({
  handleTweet,
  label,
  isDisabled,
}) => {
  return (
    <button
      disabled={isDisabled}
      id="tweetButton"
      data-testid="tweetButton"
      onClick={handleTweet}
      className="font-bold text-white ml-auto 
        bg-blue-500 hover:bg-blue-400 p-2 pl-4
         pr-4 rounded-2xl"
    >
      {label}
    </button>
  );
};
