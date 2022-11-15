import React, { useState, useEffect } from "react";
import { IPost } from "../consts/Interface";
import { PostsList } from "../components/PostsList/PostsList";
import { CreatePost } from "components/NewPost/CreatePost/CreatePost";
import { useIsCommenting } from "context/IsCommentingContext";
import { useGetUser } from "context/UserContext";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const getPosts = async (pageParam: number) => {
  const { data } = await axios.get<IPost[]>(
    `https://localhost:7227/posts?PageNumber=${pageParam}&PageSize=6`
  );
  return data;
};

export const HomePage: React.FC = ({}) => {
  const isCommenting = useIsCommenting();
  const user = useGetUser();

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length !== 0 ? nextPage : undefined;
    },
  });

  const [pages, setPages] = useState(posts?.pages[1]);

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

  return (
    <div className="">
      {!isCommenting && (
        <>
          <h1
            className="pl-5 pt-3 pb-3 lg:ml-[5px] fixed w-full md:w-[53vw] lg:w-[40vw]
                      backdrop-blur-lg font-bold bg-slate-400 
                      bg-opacity-5 font"
          >
            Home
          </h1>
          {user ? (
            <div className="pt-16">
              <CreatePost />
            </div>
          ) : (
            <div className="pt-16"></div>
          )}
        </>
      )}
      {isSuccess &&
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
        })}
    </div>
  );
};
