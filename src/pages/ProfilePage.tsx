import {
  ProfileCover,
  User,
} from "components/Profile/ProfileCover/ProfileCover";
import React, { useEffect, useState } from "react";
import { IPost } from "consts/Interface";
import { PostsList } from "../components/PostsList/PostsList";
import { useInfiniteScroll } from "hooks/utils/useInfiniteScroll";

import { useParams } from "react-router-dom";
import { useGetUserPosts } from "hooks/posts/useGetUsersPosts";
import { useGetUserProfile } from "hooks/users/useGetUserProfile";
import { useIsCommenting } from "context/IsCommentingContext";

export const ProfilePage: React.FC = ({}) => {
  const [query, setQuery] = useState("tweets");
  const { id } = useParams();
  const [isReset, setIsReset] = useState(false);
  const [page, setPage] = useState(0);
  const { profile } = useGetUserProfile(id as string);
  const { posts, error, loading, hasMore, setPosts } = useGetUserPosts(
    profile?.userId as number,
    query,
    page,
    setIsReset,
    isReset
  );
  const { scrollPage, loader } = useInfiniteScroll(page, hasMore);
  const isCommenting = useIsCommenting();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsReset(true);
    setQuery(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setPage(scrollPage);
  }, [scrollPage]);

  if (profile) {
    return (
      <>
        {!isCommenting && (
          <ProfileCover user={profile as User} handleChange={handleChange} />
        )}
        <div>
          <PostsList
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
    return <p className="ml-3">loading...</p>;
  }
};
