import React from "react";
import { CurrentPost } from "components/Comment/CurrentPost/CurrentPost";
import { Post } from "components/Post/Post";
import { nanoid } from "nanoid";

import { IPost } from "../../../consts/Interface";

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
  closeComment: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
  ) => void;
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
  userId?: number;
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
  userId,
}) => {
  const postsList = () => {
    if (typeof posts !== "undefined") {
      return posts.map((post, index) => {
        let isUsersPost = false;
        if (post.posterId === userId) isUsersPost = true;
        return (
          <div>
            <Post
              closeComment={closeComment}
              isUsersPost={isUsersPost}
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
        isUsersPost={false}
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
      <div className="container-fluid">
        <div>{postsList()}</div>
      </div>
      {loading && hasMore && <p className="pl-4 pt-4">Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </>
  );
};
