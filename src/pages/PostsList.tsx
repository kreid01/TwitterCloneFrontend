import React from "react";
import { CurrentPost } from "components/Comment/CurrentPost/CurrentPost";
import { postPost } from "services/postPost";
import { CreatePost } from "components/NewPost/CreatePost/CreatePost";
import { Post } from "components/Post/Post";
import { nanoid } from "nanoid";

import { INewPost, IPost } from "../consts/Interface";

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
  setToCurrentPost: (post: IPost, index: number) => void;
  closeComment: () => void;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  isCommenting: boolean;
  isOnCurrentPost: boolean;
  currentPost: IPost;
  currentIndex: number;
  hasMore: boolean;
  posts: IPost[];
  loading: boolean;
  error: boolean;
  loader: React.MutableRefObject<null>;
}

export const PostsList: React.FC<Props> = ({
  handleComment,
  handleLike,
  handleRetweet,
  setToCurrentPost,
  closeComment,
  setPosts,
  isCommenting,
  isOnCurrentPost,
  currentIndex,
  currentPost,
  hasMore,
  posts,
  loading,
  error,
  loader,
}) => {
  const postsList = () => {
    if (typeof posts !== "undefined") {
      return posts.map((post, index) => {
        return (
          <div>
            <Post
              handleLike={handleLike}
              handleRetweet={handleRetweet}
              handleComment={handleComment}
              setToCurrentPost={setToCurrentPost}
              post={post}
              setPosts={setPosts}
              posts={posts}
              key={nanoid()}
              index={index}
            />
          </div>
        );
      });
    }
  };

  return isOnCurrentPost ? (
    <>
      <CurrentPost
        currentIndex={currentIndex as number}
        setToCurrentPost={setToCurrentPost}
        posts={posts}
        setPosts={setPosts}
        handleLike={handleLike}
        handleRetweet={handleRetweet}
        handleComment={handleComment}
        closeComment={closeComment}
        isCommenting={isCommenting}
        post={currentPost as IPost}
      />
    </>
  ) : (
    <>
      <div className="container-fluid pl-5">
        <div>{postsList()}</div>
      </div>
      {loading && hasMore && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </>
  );
};
