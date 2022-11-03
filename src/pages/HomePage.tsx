import React, { useState, useEffect } from "react";
import { useGetPosts } from "../hooks/useGetPosts";
import { IPost } from "../consts/Interface";
import { PostsList } from "../components/PostsList/PostsList";
import { CreatePost } from "components/NewPost/CreatePost/CreatePost";
import { useInfiniteScroll } from "hooks/useInfiniteScroll";
import { useCommentContext } from "context/CommentContext";

export const HomePage: React.FC = ({}) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { loading, error, posts, hasMore, setPosts } = useGetPosts(query, page);
  const { infPage, loader } = useInfiniteScroll(page, hasMore);
  const isOnCurrentPost = useCommentContext();

  useEffect(() => {
    setPage(infPage);
  }, [infPage]);

  return (
    <div className="ml-20">
      {!isOnCurrentPost && (
        <>
          <h1
            className="pl-5 pt-3 pb-3 fixed w-full
                      backdrop-blur-lg font-bold bg-slate-400 
                      bg-opacity-5 font"
          >
            Home
          </h1>
          <div className="pt-16">
            <CreatePost setPosts={setPosts} />
          </div>
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
