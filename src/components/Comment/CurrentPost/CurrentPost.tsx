import React, { useState } from "react";
import { Post } from "components/Post/Post";
import { CreateComment } from "../CreateComment/CreateComment";
import { FaArrowLeft } from "react-icons/fa";
import { CommentButton } from "../CommentButton/CommentButton";

import { IPost, INewComment, IComment } from "consts/Interface";
import { updatePostWithComment } from "services/updatePost";
import { useGetComments } from "hooks/useGetComments";
import { Comment } from "../Comment/Comment";
import userEvent from "@testing-library/user-event";

interface Props {
  post: IPost;
  closeComment: () => void;
  isCommenting: boolean;
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
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  currentIndex: number;
  posts: IPost[];
  isUsersPost: boolean;
}

export const CurrentPost: React.FC<Props> = ({
  closeComment,
  handleComment,
  handleLike,
  handleRetweet,
  setToCurrentPost,
  setPosts,
  isUsersPost,
  posts,
  post,
  isCommenting,
  currentIndex,
}) => {
  const { comments, loading, error, hasMore, setComments } = useGetComments(
    post.id
  );
  const [newComment, setNewComment] = useState({
    commentDate: "",
    commentBody: "",
    commentMedia: "",
    userAt: "BLAD33",
    userName: "bladee",
    userImg:
      "https://i1.sndcdn.com/artworks-z7ABLFRxBZUd1j0w-ANNyqw-t500x500.jpg",
  });

  const postsComments = () => {
    if (typeof comments !== "undefined" && comments) {
      return comments.map((comment) => {
        return <Comment comment={comment} />;
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const resetNewComment = () => {
    setNewComment({
      commentDate: "",
      commentBody: "",
      commentMedia: "",
      userAt: "BLAD33",
      userName: "bladee",
      userImg:
        "https://i1.sndcdn.com/artworks-z7ABLFRxBZUd1j0w-ANNyqw-t500x500.jpg",
    });
  };

  const updateCommentCount = (index: number) => {
    const newArr = [...(posts as Array<IPost>)];
    newArr[index].commentCount = newArr[index].commentCount + 1;
    setPosts(newArr);
  };

  const handleReply = (post: IPost, newPost: INewComment) => {
    setComments((prevArr) => [...(prevArr as Array<IComment>), newComment]);
    resetNewComment();
    updateCommentCount(currentIndex);
    updatePostWithComment(post, newPost);
  };

  return (
    <div className="mb-5 absolute bg-white h-full z-10 " data-testid="post">
      <header
        className="pl-4 pt-4 pb-1 w-full
            backdrop-blur-lg bg-slate-400 
            bg-opacity-5 flex"
      >
        <button
          data-testid="returnButton"
          onClick={closeComment}
          className="mr-4 mb-4"
        >
          <FaArrowLeft />
        </button>
        {isCommenting && (
          <CommentButton
            label="Reply"
            post={post}
            newComment={newComment}
            handleReply={handleReply}
          />
        )}
      </header>
      <div className="flex ml-4 mb-4">
        <Post
          isUsersPost={isUsersPost}
          index={currentIndex}
          setToCurrentPost={setToCurrentPost}
          post={post}
          posts={posts}
          setPosts={setPosts}
          handleLike={handleLike}
          handleRetweet={handleRetweet}
          handleComment={handleComment}
        />
      </div>
      {isCommenting && (
        <CreateComment
          handleChange={handleChange}
          setNewComment={setNewComment}
          newComment={newComment}
        />
      )}
      {postsComments()}
    </div>
  );
};
