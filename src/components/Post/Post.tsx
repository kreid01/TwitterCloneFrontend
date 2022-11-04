import React from "react";
import { PostInteraction } from "../PostInteractions/PostInteraction";
import { IPost } from "../../consts/Interface";
import { Link } from "react-router-dom";
import { useUpdateIsCommenting } from "context/IsCommentingContext";
import axios from "axios";

interface Props {
  post: IPost;
  posts: IPost[];
  isUsersPost: boolean;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  makeCurrentPost: (post: IPost) => void;
}

export const Post: React.FC<Props> = ({
  post,
  setPosts,
  posts,
  isUsersPost,
  makeCurrentPost,
}) => {
  const index = posts.indexOf(post);
  const toggleComment = useUpdateIsCommenting;

  const goToUserPage = () => {
    toggleComment();
  };

  return (
    <div className=" hover:bg-neutral-100 border-b-2 px-4 pt-4">
      <div
        onClick={
          makeCurrentPost !== undefined
            ? () => makeCurrentPost(post)
            : undefined
        }
        className="flex"
        data-testid="post"
      >
        <img className="w-12 h-12 rounded-full" src={post.userImg} alt="" />
        <div className="flex-col pl-4">
          <p className="">
            <Link onClick={() => goToUserPage()} to={`/${post.userAt}`}>
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
          makeCurrentPost={makeCurrentPost}
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
