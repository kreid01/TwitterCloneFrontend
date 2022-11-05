import React, { useState, useEffect } from "react";
import { useGetPosts } from "hooks/posts/useGetPosts";
import { useInfiniteScroll } from "hooks/utils/useInfiniteScroll";

export const SearchPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { loading, error, posts, hasMore, setPosts } = useGetPosts(query, page);
  const { scrollPage, loader } = useInfiniteScroll(page, hasMore);

  useEffect(() => {
    setPage(scrollPage);
  }, [scrollPage]);

  return (
    <div className="ml-24 pt-5">
      <input placeholder="Search"></input>
    </div>
  );
};
