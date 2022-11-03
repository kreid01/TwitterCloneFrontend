import React from "react";
import { Post } from "components/Post/Post";
import { CreateComment } from "../CreateComment/CreateComment";
import { FaArrowLeft } from "react-icons/fa";

import { IPost } from "consts/Interface";
import { useGetComments } from "hooks/useGetComments";
import { Comment } from "../Comment/Comment";

interface Props {
  post: IPost;
  closeComment: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
  ) => void;
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

  const postsComments = () => {
    if (typeof comments !== "undefined" && comments) {
      return comments.map((comment) => {
        return <Comment comment={comment} />;
      });
    }
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
          onClick={(event) => closeComment(event)}
          className="mr-4 mb-4"
        >
          <FaArrowLeft />
        </button>
      </header>
      <div className="flex ml-4 mb-4">
        <Post
          closeComment={closeComment}
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
          setPosts={setPosts}
          setComments={setComments}
          currentIndex={currentIndex}
          posts={posts}
          post={post}
        />
      )}
      {postsComments()}
    </div>
  );
};
