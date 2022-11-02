import { Tweets } from "features/Tweets";
import { ProfilePageHead, User } from "features/ProfilePageHead";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { IPost } from "consts/Interface";
import { PostsList } from "./PostsList";

import { useParams } from "react-router-dom";
import { useGetUserPosts } from "hooks/useGetUsersPosts";
import { useGetUser } from "hooks/useGetUser";

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
  isCommenting: boolean;
  isOnCurrentPost: boolean;
  currentPost: IPost;
  currentIndex: number;
}

export const ProfilePage: React.FC<Props> = ({
  handleComment,
  handleLike,
  handleRetweet,
  setToCurrentPost,
  closeComment,
  isCommenting,
  isOnCurrentPost,
  currentIndex,
  currentPost,
}) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { user } = useGetUser(id as string);
  const { posts, error, loading, hasMore, setPosts } = useGetUserPosts(
    user?.postsIds as number[]
  );

  const loader = useRef(null);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  if (user) {
    return (
      <>
        <ProfilePageHead user={user as User} />
        <PostsList
          loader={loader}
          loading={loading}
          error={error}
          hasMore={hasMore}
          setPosts={setPosts}
          posts={posts as IPost[]}
          isOnCurrentPost={isOnCurrentPost}
          currentIndex={currentIndex as number}
          setToCurrentPost={setToCurrentPost}
          handleLike={handleLike}
          handleRetweet={handleRetweet}
          handleComment={handleComment}
          closeComment={closeComment}
          isCommenting={isCommenting}
          currentPost={currentPost as IPost}
        />
      </>
    );
  } else {
    return <p>loading</p>;
  }
};
