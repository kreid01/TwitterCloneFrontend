import { ProfileCover } from "components/Profile/ProfileCover/ProfileCover";
import React, { useEffect, useState } from "react";
import { IPost } from "consts/Interface";
import { PostsList } from "../components/PostsList/PostsList";

import { useParams } from "react-router-dom";
import { useGetUserProfile } from "hooks/users/useGetUserProfile";
import { useIsCommenting } from "context/IsCommentingContext";
import { ProfileFollowers } from "components/Profile/ProfileFollowers";
import { IUser } from "consts/Interface";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

interface Props {
  createChat: (user: IUser) => void;
}

export const getUserPosts = async (queryKey: any, pageParam: number) => {
  const { userId, query } = queryKey;
  console.log(query);
  const { data } = await axios.get(
    `https://localhost:7227/posts/users/${userId}`,
    {
      params: {
        filterMethod: query,
        PageNumber: pageParam,
        PageSize: 5,
      },
    }
  );
  return data;
};

export const ProfilePage: React.FC<Props> = ({ createChat }) => {
  const [query, setQuery] = useState("tweets");
  const { id } = useParams();
  const { profile } = useGetUserProfile(id as string);
  const queryKey = {
    query: query,
    userId: profile?.userId,
  };
  const toggleIsOnFollowers = () => {
    setIsOnFollowers((prevState) => !prevState);
  };
  const [isOnFollowers, setIsOnFollowers] = useState(false);
  const {
    data: posts,
    error,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", queryKey],
    queryFn: ({ pageParam = 1 }) => getUserPosts(queryKey, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length !== 0 ? nextPage : undefined;
    },
  });

  const isCommenting = useIsCommenting();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  if (profile) {
    return (
      <>
        {!isCommenting && (
          <ProfileCover
            createChat={createChat}
            toggleIsOnFollowers={toggleIsOnFollowers}
            user={profile as IUser}
            handleChange={handleChange}
            isOnFollowers={isOnFollowers}
          />
        )}
        {isOnFollowers ? (
          <ProfileFollowers id={id as string} />
        ) : (
          isSuccess &&
          posts?.pages.map((page) => {
            return (
              <div>
                <PostsList
                  loading={isFetching}
                  hasMore={hasNextPage as boolean}
                  data={page as IPost[]}
                />
              </div>
            );
          })
        )}
      </>
    );
  } else {
    return <p className="spin"></p>;
  }
};
