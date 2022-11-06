import React from "react";
import { Post } from "components/Post/Post";
import { CreateComment } from "../CreateComment/CreateComment";
import { FaArrowLeft } from "react-icons/fa";
import { IPost } from "../../../consts/Interface";
import { useGetComments } from "hooks/utils/useGetComments";
import { Comment } from "../Comment/Comment";
import {
  useIsCommenting,
  useUpdateIsCommenting,
} from "context/IsCommentingContext";
import { useGetUser } from "../../../context/UserContext";

interface Props {
  post: IPost;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  makeCurrentPost: (post: IPost) => void;
  posts: IPost[];
  isUsersPost: boolean;
}

export const CurrentPost: React.FC<Props> = ({
  setPosts,
  makeCurrentPost,
  isUsersPost,
  posts,
  post,
}) => {
  const { comments, setComments } = useGetComments(post.id);
  const postsComments = () => {
    if (typeof comments !== "undefined" && comments) {
      return comments.map((comment, i) => {
        return (
          <Comment
            comment={comment}
            index={i}
            setComments={setComments}
            comments={comments}
          />
        );
      });
    }
  };

  const user = useGetUser();
  const index = posts.indexOf(post);
  const toggleComment = useUpdateIsCommenting() as () => void;
  const isCommenting = useIsCommenting();

  return (
    <div className="mb-5 absolute bg-white h-full z-10 " data-testid="post">
      <header
        className="pl-4 pt-4 pb-1 w-full
            backdrop-blur-lg bg-slate-400 
            bg-opacity-5 flex"
      >
        <button
          data-testid="returnButton"
          onClick={toggleComment}
          className="mr-4 mb-4"
        >
          <FaArrowLeft />
        </button>
      </header>
      <div className="flex mb-4">
        <Post
          makeCurrentPost={makeCurrentPost as any}
          isUsersPost={isUsersPost}
          post={post}
          posts={posts}
          setPosts={setPosts}
        />
      </div>
      {isCommenting && (
        <CreateComment
          currentIndex={index}
          setPosts={setPosts}
          setComments={setComments}
          posts={posts}
          post={post}
        />
      )}
      {postsComments()}
    </div>
  );
};
