import React, { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";

import { IPost } from "consts/Interface";
import { updatePost } from "services/updatePost";

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
    const updatedLikedByArr = updatePostLikedBy(newArr, index);
    const updatedLikedCountArr = updatePostsLikeCount(updatedLikedByArr, index);
    setter(updatedLikedCountArr);
    updatePost(posts[index]);
  };

  const updatePostLikedBy = (newArr: IPost[], index: number) => {
    if (newArr[index].likedBy?.includes(1)) {
      let indexOfUser = newArr[index].likedBy?.indexOf(1);
      newArr[index].likedBy?.splice(indexOfUser as number, 1);
    } else {
      newArr[index].likedBy = [...(newArr[index].likedBy as Array<number>), 1];
    }
    return newArr;
  };

  const updatePostsLikeCount = (newArr: IPost[], index: number) => {
    newArr[index].likeCount = newArr[index].isLiked
      ? newArr[index].likeCount - 1
      : newArr[index].likeCount + 1;
    newArr[index].isLiked = !newArr[index].isLiked;
    return newArr;
  };

  const handleRetweet = (
    posts: IPost[],
    index: number,
    setter: (setterArr: IPost[]) => void
  ) => {
    const newArr = [...(posts as Array<IPost>)];
    const updatedRetweetedByArr = updatePostRetwteetedBy(newArr, index);
    const updatedRetweetCountArr = updatePostsRetweetCount(
      updatedRetweetedByArr,
      index
    );
    setter(updatedRetweetCountArr);
    updatePost(posts[index]);
  };

  const updatePostRetwteetedBy = (newArr: IPost[], index: number) => {
    if (newArr[index].retweetedBy?.includes(1)) {
      let indexOfUser = newArr[index].retweetedBy?.indexOf(1);
      newArr[index].retweetedBy?.splice(indexOfUser as number, 1);
    } else {
      newArr[index].retweetedBy = [
        ...(newArr[index].retweetedBy as Array<number>),
        1,
      ];
    }
    return newArr;
  };

  const updatePostsRetweetCount = (newArr: IPost[], index: number) => {
    newArr[index].retweetCount = newArr[index].isLiked
      ? newArr[index].retweetCount - 1
      : newArr[index].retweetCount + 1;
    newArr[index].isRetweeted = !newArr[index].isRetweeted;
    return newArr;
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

  const closeComment = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
  ) => {
    setIsCommenting(false);
    setIsOnCurrentPost(false);
    event.stopPropagation();
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
