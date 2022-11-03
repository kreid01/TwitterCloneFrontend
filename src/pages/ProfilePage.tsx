import { ProfilePageHead, User } from "components/features/ProfilePageHead";
import React, { useEffect, useState } from "react";
import { IPost } from "consts/Interface";
import { PostsList } from "../components/PostsList/PostsList";
import { useInfiniteScroll } from "hooks/useInfiniteScroll";

import { useParams } from "react-router-dom";
import { useGetUserPosts } from "hooks/useGetUsersPosts";
import { useGetUser } from "hooks/useGetUser";
import { useCommentContext } from "context/CommentContext";

export const ProfilePage: React.FC = ({}) => {
  const [query, setQuery] = useState("tweets");
  const { id } = useParams();
  const [isReset, setIsReset] = useState(false);
  const [page, setPage] = useState(0);
  const { user } = useGetUser(id as string);
  const { posts, error, loading, hasMore, setPosts } = useGetUserPosts(
    user?.userId as number,
    query,
    page,
    setIsReset,
    isReset
  );
  const { infPage, loader } = useInfiniteScroll(page, hasMore);
  const isOnCurrentPost = useCommentContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsReset(true);
    setQuery(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setPage(infPage);
  }, [infPage]);

  if (user) {
    return (
      <>
        {!isOnCurrentPost && (
          <ProfilePageHead user={user as User} handleChange={handleChange} />
        )}
        <div className="ml-20">
          <PostsList
            userId={1}
            loader={loader}
            loading={loading}
            error={error}
            hasMore={hasMore}
            setPosts={setPosts}
            posts={posts as IPost[]}
          />
        </div>
      </>
    );
  } else {
    return <p>loading</p>;
  }
};
