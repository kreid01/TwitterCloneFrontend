import React from "react";
import { Link } from "react-router-dom";
import { PostInteraction } from "../../PostInteractions/PostInteraction";

import { IComment } from "../../../consts/Interface";

interface Props {
  comment: IComment;
}

export const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <div className="flex mt-8 mb-4 b border-b-slate-400">
      <img className="w-12 h-12 rounded-full" src={comment.userImg} alt="" />
      <div className="flex-col pl-4">
        <p className="">
          <Link to={`/${comment.userAt}`}>
            <strong>{comment.userName}</strong>
          </Link>
          <span className="text-gray-500">
            @{comment.userAt}·{comment.commentDate.substring(0, 7)}
          </span>
        </p>
        <p>{comment.commentBody}</p>
        <img
          className="w-80 pt-2 max-h-72 rounded-xl"
          src={comment.commentMedia}
          alt=""
          data-testid="media"
        />
      </div>
    </div>
  );
};
