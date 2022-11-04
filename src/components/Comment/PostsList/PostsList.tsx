import React, { useState } from "react";
import { CurrentPost } from "components/Comment/CurrentPost/CurrentPost";
import { Post } from "components/Post/Post";
import { nanoid } from "nanoid";

import { IPost } from "../../../consts/Interface";
import {
  useIsCommenting,
  useUpdateIsCommenting,
} from "context/IsCommentingContext";

interface Props {
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  hasMore: boolean;
  posts: IPost[];
  loading: boolean;
  error: boolean;
  loader: React.MutableRefObject<null>;
  userId?: number;
}

export const PostsList: React.FC<Props> = ({
  setPosts,
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
              isUsersPost={isUsersPost}
              post={post}
              setPosts={setPosts}
              posts={posts}
              key={nanoid()}
              makeCurrentPost={makeCurrentPost}
            />
          </div>
        );
      });
    }
  };
  const [currentPost, setCurrentPost] = useState<IPost>();
  const toggleIsCommenting = useUpdateIsCommenting();
  const isCommenting = useIsCommenting();

  const makeCurrentPost = (post: IPost) => {
    setCurrentPost(post);
    if (toggleIsCommenting !== null) toggleIsCommenting();
  };

  return isCommenting && currentPost !== undefined ? (
    <>
      <CurrentPost
        makeCurrentPost={makeCurrentPost}
        isUsersPost={false}
        posts={posts}
        setPosts={setPosts}
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
