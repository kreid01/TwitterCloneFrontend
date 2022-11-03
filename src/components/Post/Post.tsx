import React from "react";
import { PostInteraction } from "../PostInteractions/PostInteraction";
import { IPost } from "../../consts/Interface";
import { Link } from "react-router-dom";

interface Props {
  post: IPost;
  index?: number;
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
  posts: IPost[];
  isUsersPost: boolean;
  handleComment: (post: IPost) => void;
  setToCurrentPost: (post: IPost, index: number) => void;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  closeComment: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
}

export const Post: React.FC<Props> = ({
  post,
  handleLike,
  handleComment,
  handleRetweet,
  setToCurrentPost,
  setPosts,
  closeComment,
  posts,
  isUsersPost,
  index,
}) => {
  return (
    <div className=" hover:bg-neutral-100 border-b-2 px-4 pt-4">
      <div
        onClick={() => setToCurrentPost(post, index as number)}
        className="flex"
        data-testid="post"
      >
        <img className="w-12 h-12 rounded-full" src={post.userImg} alt="" />
        <div className="flex-col pl-4">
          <p className="">
            <Link
              onClick={(event) => closeComment(event)}
              to={`/${post.userAt}`}
            >
              <strong>{post.userName}</strong>
            </Link>
            <span className="text-gray-500">
              @{post.userAt}·{post.postDate.substring(0, 7)}
            </span>
          </p>
          <p>{post.postTextBody}</p>
          <img
            className="w-80 pt-2 max-h-72 rounded-xl"
            src={post.postMedia}
            alt=""
            data-testid="media"
          />
        </div>
      </div>
      <div className="ml-10">
        <PostInteraction
          isUsersPost={isUsersPost}
          index={index as number}
          post={post}
          handleComment={handleComment}
          handleLike={handleLike}
          handleRetweet={handleRetweet}
          setPosts={setPosts}
          posts={posts}
        />
      </div>
    </div>
  );
};
