import React, { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";

import { IPost } from "consts/Interface";
import { updatePostWithLike, updatePostWithRetweet } from "services/updatePost";

export const App: React.FC = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [currentPost, setCurrentPost] = useState<IPost>();
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [isOnCurrentPost, setIsOnCurrentPost] = useState(false);

  const handleLike = (
    posts: IPost[],
    index: number,
    setter: (setterArr: IPost[]) => void
  ) => {
    const newArr = [...(posts as Array<IPost>)];
    newArr[index].likeCount = newArr[index].isLiked
      ? newArr[index].likeCount - 1
      : newArr[index].likeCount + 1;
    newArr[index].isLiked = !newArr[index].isLiked;
    setter(newArr);
    updatePostWithLike(posts[index], 1);
  };

  const handleRetweet = (
    posts: IPost[],
    index: number,
    setter: (setterArr: IPost[]) => void
  ) => {
    const newArr = [...(posts as Array<IPost>)];
    newArr[index].retweetCount = newArr[index].isRetweeted
      ? newArr[index].retweetCount - 1
      : newArr[index].retweetCount + 1;
    newArr[index].isRetweeted = !newArr[index].isRetweeted;
    setter(newArr);
    updatePostWithRetweet(posts[index], 1);
  };

  const handleComment = (post: IPost) => {
    setIsCommenting(true);
    setIsOnCurrentPost(true);
    setCurrentPost(post);
  };

  const setToCurrentPost = (post: IPost, index: number) => {
    setCurrentIndex(index);
    setCurrentPost(post);
    setIsOnCurrentPost(true);
  };

  const closeComment = () => {
    setIsCommenting(false);
    setIsOnCurrentPost(false);
  };

  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              handleLike={handleLike}
              handleRetweet={handleRetweet}
              handleComment={handleComment}
              closeComment={closeComment}
              setToCurrentPost={setToCurrentPost}
              currentPost={currentPost as IPost}
              currentIndex={currentIndex as number}
              isOnCurrentPost={isOnCurrentPost}
              isCommenting={isCommenting}
            />
          }
        ></Route>
        <Route
          path=":id"
          element={
            <ProfilePage
              handleLike={handleLike}
              handleRetweet={handleRetweet}
              handleComment={handleComment}
              closeComment={closeComment}
              setToCurrentPost={setToCurrentPost}
              currentPost={currentPost as IPost}
              currentIndex={currentIndex as number}
              isOnCurrentPost={isOnCurrentPost}
              isCommenting={isCommenting}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};
