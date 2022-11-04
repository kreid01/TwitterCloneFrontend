import React, { useState, useEffect } from "react";
import { useGetPosts } from "../hooks/posts/useGetPosts";
import { IPost } from "../consts/Interface";
import { PostsList } from "../components/PostsList/PostsList";
import { CreatePost } from "components/NewPost/CreatePost/CreatePost";
import { useInfiniteScroll } from "hooks/utils/useInfiniteScroll";
import { useIsCommenting } from "context/IsCommentingContext";
import { useGetUser } from "context/UserContext";

export const HomePage: React.FC = ({}) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { loading, error, posts, hasMore, setPosts } = useGetPosts(query, page);
  const { scrollPage, loader } = useInfiniteScroll(page, hasMore);

  useEffect(() => {
    setPage(scrollPage);
  }, [scrollPage]);

  const isCommenting = useIsCommenting();
  const user = useGetUser();

  return (
    <div className="ml-20">
      {!isCommenting && (
        <>
          <h1
            className="pl-5 pt-3 pb-3 fixed w-full
                      backdrop-blur-lg font-bold bg-slate-400 
                      bg-opacity-5 font"
          >
            Home
          </h1>
          {user ? (
            <div className="pt-16">
              <CreatePost setPosts={setPosts} />
            </div>
          ) : (
            <div className="pt-16"></div>
          )}
        </>
      )}
      <PostsList
        loader={loader}
        loading={loading}
        error={error}
        hasMore={hasMore}
        setPosts={setPosts}
        posts={posts as IPost[]}
      />
    </div>
  );
};
