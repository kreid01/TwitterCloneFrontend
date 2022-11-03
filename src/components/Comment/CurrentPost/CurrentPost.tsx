import React from "react";
import { Post } from "components/Post/Post";
import { CreateComment } from "../CreateComment/CreateComment";
import { FaArrowLeft } from "react-icons/fa";

import { IPost } from "../../../consts/Interface";
import { useGetComments } from "hooks/useGetComments";
import { Comment } from "../Comment/Comment";
import {
  useCommentContext,
  useUpdateCommentContext,
} from "../../../context/CommentContext";

interface Props {
  post: IPost;
  setToCurrentPost: (post: IPost, index: number) => void;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  currentIndex: number;
  posts: IPost[];
  isUsersPost: boolean;
}

export const CurrentPost: React.FC<Props> = ({
  setToCurrentPost,
  setPosts,
  isUsersPost,
  posts,
  post,
  currentIndex,
}) => {
  const { comments, loading, error, hasMore, setComments } = useGetComments(
    post.id
  );

  const toggleComment = useUpdateCommentContext();
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
          //@ts-ignore
          onClick={toggleComment}
          className="mr-4 mb-4"
        >
          <FaArrowLeft />
        </button>
      </header>
      <div className="flex mb-4">
        <Post
          isUsersPost={isUsersPost}
          index={currentIndex}
          setToCurrentPost={() => setToCurrentPost(post, currentIndex)}
          post={post}
          posts={posts}
          setPosts={setPosts}
        />
      </div>
      {useCommentContext() && (
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
