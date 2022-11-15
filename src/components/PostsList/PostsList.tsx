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
  hasMore: boolean;
  data: IPost[];
  loading: boolean;
}

export const PostsList: React.FC<Props> = ({ hasMore, data, loading }) => {
  const user = useGetUser();
  const [currentPost, setCurrentPost] = useState<IPost>();
  const toggleIsCommenting = useUpdateIsCommenting();
  const isCommenting = useIsCommenting();
  const [posts, setPosts] = useState(data);

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
  }, []);

  const [render, setRender] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setRender((prevState) => !prevState);
    }, 50);
  }, []);

  useEffect(() => {
    if (typeof posts !== "undefined" && posts) {
      posts.map((post, index) => {
        if (post.likedBy?.includes(user?.userId as number)) {
          const newArr = [...posts];

          newArr[index].isLiked = true;
          setPosts(newArr);
        }
      });
    }
  }, []);

  const postsList = () => {
    if (typeof posts !== "undefined") {
      return posts.map((post, index) => {
        let isUsersPost = false;
        if (post.posterId === user?.userId) isUsersPost = true;
        return (
          <div>
            <Post
              setPosts={
                setPosts as React.Dispatch<
                  React.SetStateAction<IPost[] | undefined>
                >
              }
              isUsersPost={isUsersPost}
              post={post}
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
        setPosts={
          setPosts as React.Dispatch<React.SetStateAction<IPost[] | undefined>>
        }
        makeCurrentPost={makeCurrentPost as () => void}
        isUsersPost={false}
        posts={posts}
        post={currentPost as IPost}
      />
    </>
  ) : (
    <>
      <div className="container-fluid">
        <div key={nanoid()}>{postsList()}</div>
      </div>
      {loading && hasMore && <p className="pl-4 pt-4">Loading...</p>}
    </>
  );
};
