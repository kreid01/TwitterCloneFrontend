import React, { useEffect, useState } from "react";
import { CurrentPost } from "components/Comment/CurrentPost/CurrentPost";
import { Post } from "components/Post/Post";
import { nanoid } from "nanoid";

import { IPost } from "../../consts/Interface";
import {
  useIsCommenting,
  useUpdateIsCommenting,
} from "context/IsCommentingContext";
import { useGetUser } from "context/UserContext";

interface Props {
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  hasMore: boolean;
  posts: IPost[];
  loading: boolean;
  error: boolean;
  loader?: React.MutableRefObject<null>;
}

export const PostsList: React.FC<Props> = ({
  setPosts,
  hasMore,
  posts,
  loading,
  error,
  loader,
}) => {
  const user = useGetUser();
  const [currentPost, setCurrentPost] = useState<IPost>();
  const toggleIsCommenting = useUpdateIsCommenting();
  const isCommenting = useIsCommenting();
  const [wait, setWait] = useState(false);

  setInterval(() => setWait(true), 500);

  useEffect(() => {
    if (typeof posts !== "undefined") {
      posts.map((post, index) => {
        if (post.likedBy?.includes(user?.userId as number)) {
          const newArr = [...posts];
          newArr[index].isLiked = true;
          setPosts(newArr);
        }
      });
    }
  }, [wait]);

  useEffect(() => {
    if (typeof posts !== "undefined") {
      posts.map((post, index) => {
        if (post.retweetedBy?.includes(user?.userId as number)) {
          const newArr = [...posts];
          newArr[index].isRetweeted = true;
          setPosts(newArr);
        }
      });
    }
  }, [wait]);

  const postsList = () => {
    if (typeof posts !== "undefined") {
      return posts.map((post, index) => {
        let isUsersPost = false;
        if (post.posterId === user?.userId) isUsersPost = true;
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

  const makeCurrentPost = (post: IPost) => {
    setCurrentPost(post);
    if (toggleIsCommenting !== null) toggleIsCommenting();
  };

  return isCommenting && currentPost !== undefined ? (
    <>
      <CurrentPost
        makeCurrentPost={makeCurrentPost as () => void}
        isUsersPost={false}
        posts={posts}
        setPosts={setPosts}
        post={currentPost as IPost}
      />
    </>
  ) : (
    <>
      <div className="container-fluid">
        <div key={nanoid()}>{postsList()}</div>
      </div>
      {loading && hasMore && <p className="pl-4 pt-4">Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </>
  );
};
