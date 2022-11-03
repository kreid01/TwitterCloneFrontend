import React from "react";
import { IPost, INewComment } from "../../../consts/Interface";

interface Props {
  handleReply: (Post: IPost, newComment: INewComment) => void;
  post: IPost;
  newComment: INewComment;
  label: string;
}

export const CommentButton: React.FC<Props> = ({
  handleReply,
  post,
  newComment,
  label,
}) => {
  return (
    <button
      data-testid="replyButton"
      onClick={() => handleReply(post, newComment)}
      className="button-primary mb-3"
    >
      {label}
    </button>
  );
};
