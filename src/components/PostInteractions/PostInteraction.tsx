import React from "react";
import { IconBaseProps } from "react-icons";
import { FaComment, FaRetweet, FaHeart } from "react-icons/fa";
import { IPost } from "../../consts/Interface";

interface Props {
  handleLike: (
    posts: IPost[],
    index: number,
    setter: (setterArr: IPost[]) => void
  ) => void;
  handleRetweet: (
    posts: IPost[],
    index: number,
    setter: (setterArr: IPost[]) => void
  ) => void;
  handleComment: (post: IPost) => void;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  index: number;
  post: IPost;
  posts: IPost[];
}

export const PostInteraction: React.FC<Props> = ({
  post,
  handleLike,
  handleComment,
  handleRetweet,
  setPosts,
  posts,
  index,
}) => {
  console.log(post);

  return (
    <>
      <div className="flex">
        <PostInteractionIcon
          className="comment-icon"
          icon={
            <FaComment
              data-testid="commentButton"
              onClick={() => handleComment(post)}
            />
          }
        />
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
