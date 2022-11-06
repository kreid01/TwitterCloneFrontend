import { ProfileCover } from "components/Profile/ProfileCover/ProfileCover";
import React, { useEffect, useState } from "react";
import { IPost } from "consts/Interface";
import { PostsList } from "../components/PostsList/PostsList";
import { useInfiniteScroll } from "hooks/utils/useInfiniteScroll";

import { useParams } from "react-router-dom";
import { useGetUserPosts } from "hooks/posts/useGetUsersPosts";
import { useGetUserProfile } from "hooks/users/useGetUserProfile";
import { useIsCommenting } from "context/IsCommentingContext";
import { ProfileFollowers } from "components/Profile/ProfileFollowers";
import { IUser } from "consts/Interface";

interface Props {
  setMessanger: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

export const ProfilePage: React.FC<Props> = ({ setMessanger }) => {
  const [query, setQuery] = useState("tweets");
  const { id } = useParams();
  const [isReset, setIsReset] = useState(false);
  const [page, setPage] = useState(0);
  const { profile } = useGetUserProfile(id as string);
  const toggleIsOnFollowers = () => {
    setIsOnFollowers((prevState) => !prevState);
  };
  const [isOnFollowers, setIsOnFollowers] = useState(false);
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
          <ProfileCover
            setMessanger={setMessanger}
            toggleIsOnFollowers={toggleIsOnFollowers}
            user={profile as IUser}
            handleChange={handleChange}
            isOnFollowers={isOnFollowers}
          />
        )}
        {isOnFollowers ? (
          <ProfileFollowers id={id as string} />
        ) : (
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
        )}
      </>
    );
  } else {
    return <p className="ml-3">loading...</p>;
  }
};
