import React from "react";
import { PostInteraction } from "../PostInteractions/PostInteraction";
import { IPost } from "../../consts/Interface";
import { Link } from "react-router-dom";
import { useUpdateIsCommenting } from "context/IsCommentingContext";
import { FaTrash } from "react-icons/fa";
import { deletePost } from "services/posts/deletePost";
import { useGetUser } from "context/UserContext";

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
  const user = useGetUser();

  const goToUserPage = () => {
    toggleComment();
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const newArr = [...posts];
    newArr.splice(index, 1);
    setPosts(newArr);
    deletePost(post.id);
  };

  return (
    <div className=" hover:bg-neutral-100 border-b-2 px-4 pt-4 w-full md:w-[45vw] lg:w-[35vw]">
      <div
        onClick={() => makeCurrentPost(post)}
        className="flex"
        data-testid="post"
      >
        <img className="w-12 h-12 rounded-full" src={post.userImg} alt="" />
        <div className="flex-col pl-4 w-max">
          <p className="">
            <Link onClick={() => goToUserPage()} to={`/${post.userAt}`}>
              <strong>{post.userName}</strong>
            </Link>
            <span className="text-gray-500">
              @{post.userAt}·{post.postDate.substring(0, 7)}
              {(post.posterId === user?.userId || user?.isAdmin) && (
                <button
                  onClick={(event) => handleDelete(event)}
                  className="ml-12"
                >
                  <FaTrash className="ml-auto color text-black" />
                </button>
              )}
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
