import { handleLike } from "utils/handleLike";
import { handleRetweet } from "utils/handleRetweet";
import React from "react";
import { IconBaseProps } from "react-icons";
import { FaComment, FaRetweet, FaHeart } from "react-icons/fa";
import { IPost } from "../../consts/Interface";
import { useGetUser } from "context/UserContext";

interface Props {
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  makeCurrentPost: (post: IPost) => void;
  index: number;
  post: IPost;
  posts: IPost[];
  isUsersPost: boolean;
}

export const PostInteraction: React.FC<Props> = ({
  post,
  setPosts,
  makeCurrentPost,
  isUsersPost,
  posts,
  index,
}) => {
  const user = useGetUser();
  return (
    <>
      <div className="flex">
        <PostInteractionIcon
          className="comment-icon"
          icon={
            <FaComment
              onClick={() => makeCurrentPost(post)}
              data-testid="commentButton"
            />
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
                  onClick={() =>
                    handleRetweet(
                      posts,
                      index,
                      setPosts,
                      user?.userId as number
                    )
                  }
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
                  onClick={() =>
                    handleLike(posts, index, setPosts, user?.userId as number)
                  }
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
