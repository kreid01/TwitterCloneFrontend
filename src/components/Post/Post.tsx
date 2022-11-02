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
  handleComment: (post: IPost) => void;
  setToCurrentPost: (post: IPost, index: number) => void;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

export const Post: React.FC<Props> = ({
  post,
  handleLike,
  handleComment,
  handleRetweet,
  setToCurrentPost,
  setPosts,
  posts,
  index,
}) => {
  return (
    <div
      onClick={() => setToCurrentPost(post, index as number)}
      className="flex mt-5 mb-5"
      data-testid="post"
    >
      <img className="w-12 h-12 rounded-full" src={post.userImg} alt="" />
      <div className="flex-col pl-4">
        <p className="">
          <Link to={`/${post.userAt}`}>
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
        <PostInteraction
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
