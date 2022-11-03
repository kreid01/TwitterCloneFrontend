import React from "react";
import { PostInteraction } from "../PostInteractions/PostInteraction";
import { IPost } from "../../consts/Interface";
import { Link } from "react-router-dom";
import { useUpdateCommentContext } from "context/CommentContext";

interface Props {
  post: IPost;
  index?: number;
  posts: IPost[];
  isUsersPost: boolean;
  setToCurrentPost: (post: IPost, index: number) => void;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

export const Post: React.FC<Props> = ({
  post,
  setToCurrentPost,
  setPosts,
  posts,
  isUsersPost,
  index,
}) => {
  const toggleComment = useUpdateCommentContext();

  return (
    <div className=" hover:bg-neutral-100 border-b-2 px-4 pt-4">
      <div
        onClick={() => setToCurrentPost(post, index as number)}
        className="flex"
        data-testid="post"
      >
        <img className="w-12 h-12 rounded-full" src={post.userImg} alt="" />
        <div className="flex-col pl-4">
          <p className="">
            <Link onClick={() => toggleComment} to={`/${post.userAt}`}>
              <strong>{post.userName}</strong>
            </Link>
            <span className="text-gray-500">
              @{post.userAt}·{post.postDate.substring(0, 7)}
            </span>
          </p>
          <p>{post.postTextBody}</p>
          <img
            className="w-80 pt-2 max-h-72 rounded-xl"
            src={post.postMedia}
            alt=""
            data-testid="media"
          />
        </div>
      </div>
      <div className="ml-10">
        <PostInteraction
          isUsersPost={isUsersPost}
          index={index as number}
          post={post}
          setPosts={setPosts}
          posts={posts}
        />
      </div>
    </div>
  );
};
