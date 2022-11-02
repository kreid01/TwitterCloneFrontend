import { ProfilePageHead, User } from "features/ProfilePageHead";
import React, { useEffect, useState } from "react";
import { IPost } from "consts/Interface";
import { PostsList } from "./PostsList";
import { useInfiniteScroll } from "hooks/useInfiniteScroll";

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
  const [query, setQuery] = useState("");
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const { user } = useGetUser(id as string);
  const { posts, error, loading, hasMore, setPosts } = useGetUserPosts(
    user?.userId as number,
    query
  );
  const { infPage, loader } = useInfiniteScroll(page, hasMore);

  useEffect(() => {
    setPage(infPage);
  }, [infPage]);

  if (user) {
    return (
      <>
        {!isOnCurrentPost && <ProfilePageHead user={user as User} />}
        <div className="ml-20">
          <PostsList
            userId={1}
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
        </div>
      </>
    );
  } else {
    return <p>loading</p>;
  }
};
