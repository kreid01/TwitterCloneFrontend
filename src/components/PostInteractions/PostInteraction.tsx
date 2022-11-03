import React from "react";
import { IconBaseProps } from "react-icons";
import { FaComment, FaRetweet, FaHeart } from "react-icons/fa";
import { IPost } from "../../consts/Interface";
import { handleLike } from "../utils/handleLike";
import { handleRetweet } from "../utils/handleRetweet";
import { useUpdateCommentContext } from "../../context/CommentContext";

interface Props {
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  index: number;
  post: IPost;
  posts: IPost[];
  isUsersPost: boolean;
}

export const PostInteraction: React.FC<Props> = ({
  post,
  setPosts,
  isUsersPost,
  posts,
  index,
}) => {
  const toggleComment = useUpdateCommentContext();

  return (
    <>
      <div className="flex">
        <PostInteractionIcon
          className="comment-icon"
          icon={
            //@ts-ignore
            <FaComment onClick={toggleComment} data-testid="commentButton" />
          }
        />
        {!isUsersPost && (
          <>
            <p className="mt-3.5 text-xs">{post.commentCount}</p>
            <PostInteractionIcon
              className="retweet-icon"
              icon={
                <FaRetweet
                  style={{ color: post.isRetweeted ? "blue" : "none" }}
                  data-testid="retweetButton"
                  onClick={() => handleRetweet(posts, index, setPosts)}
                />
              }
            />
            <p className="mt-3.5 text-xs">{post.retweetCount}</p>
            <PostInteractionIcon
              className="heart-icon"
              icon={
                <FaHeart
                  style={{ color: post.isLiked ? "red" : "none" }}
                  data-testid="likeButton"
                  onClick={() => handleLike(posts, index, setPosts)}
                />
              }
            />
            <p className="mt-3.5 text-xs">{post.likeCount}</p>
          </>
        )}
      </div>
    </>
  );
};

const PostInteractionIcon = ({
  icon,
  className,
}: {
  icon: IconBaseProps;
  className: string;
}) => (
  <div className={className}>
    <>{icon}</>
  </div>
);
