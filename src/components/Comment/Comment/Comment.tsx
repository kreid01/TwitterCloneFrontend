import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { deleteComment } from "services/comments/deleteComment";

import { IComment } from "../../../consts/Interface";
import { useGetUser } from "context/UserContext";

interface Props {
  comment: IComment;
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
  comments: IComment[];
  index: number;
}
export const Comment: React.FC<Props> = ({
  comment,
  setComments,
  comments,
  index,
}) => {
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const newArr = [...comments];
    newArr.splice(index, 1);
    setComments(newArr);
    deleteComment(comment.id);
  };

  const user = useGetUser();
  return (
    <div className="flex mt-8 mb-4 ml-4 border-b-slate-400">
      <img className="w-12 h-12 rounded-full" src={comment.userImg} alt="" />
      <div className="flex-col pl-4">
        <p className="">
          <Link to={`/${comment.userAt}`}>
            <strong>{comment.userName}</strong>
          </Link>
          <span className="text-gray-500">
            @{comment.userAt}·{comment.commentDate.substring(0, 7)}
          </span>
          {(comment.userAt === user?.userAt || user?.isAdmin) && (
            <button onClick={(event) => handleDelete(event)} className="ml-12">
              <FaTrash className="ml-auto color text-black" />
            </button>
          )}
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
