import React, { useState, useRef, useEffect, useCallback } from "react";
import { useGetPosts } from "../hooks/useGetPosts";
import { IPost, INewPost } from "../consts/Interface";
import { PostsList } from "./PostsList";
import { CreatePost } from "components/NewPost/CreatePost/CreatePost";
import { postPost } from "../services/postPost";

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

export const HomePage: React.FC<Props> = ({
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
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const { loading, error, posts, hasMore, setPosts } = useGetPosts(query, page);
  const [newPost, setNewPost] = useState({
    postTextBody: "",
    postMedia: "",
    userAt: "BLAD33",
    userName: "bladee",
    userImg:
      "https://i1.sndcdn.com/artworks-z7ABLFRxBZUd1j0w-ANNyqw-t500x500.jpg",
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTweet = () => {
    postPost(newPost);
  };

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

  return !isOnCurrentPost ? (
    <div className="ml-20">
      <h1
        className="pl-5 pt-3 pb-3 fixed w-full
                      backdrop-blur-lg font-bold bg-slate-400 
                      bg-opacity-5 font"
      >
        Home
      </h1>
      <div className="pt-16">
        <CreatePost
          newPost={{
            postTextBody: "",
            postMedia: "",
          }}
          handleTweet={handleTweet}
          handleChange={handleChange}
          setNewPost={setNewPost}
        />
      </div>
    </div>
  ) : (
    <div>
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
    </div>
  );
};
