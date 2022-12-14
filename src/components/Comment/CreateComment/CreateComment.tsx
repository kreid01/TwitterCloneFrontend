import React, { useState, useEffect } from "react";
import { FaCalendar, FaSmile } from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import { FileUpload } from "../../NewPost/FileUpload/FileUpload";
import { PreviewImg } from "../../NewPost/PreviewImg/PreviewImg";
import { UserTextInput } from "../../NewPost/UserTextInput/UserTextInput";
import { useFileReader } from "hooks/utils/useFileReader";
import { CommentButton } from "../CommentButton/CommentButton";
import { updatePostWithComment } from "services/posts/updatePost";
import { INewComment, IComment, IPost } from "../../../consts/Interface";
import { useGetUser } from "context/UserContext";

interface Props {
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  currentIndex: number;
  posts: IPost[];
  post: IPost;
}

export const CreateComment: React.FC<Props> = ({
  setComments,
  setPosts,
  currentIndex,
  posts,
  post,
}) => {
  const [file, setFile] = useState<FileList | null>();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files as FileList);
  };
  const { preview, fileFromReader, setPreview } = useFileReader(
    file as FileList
  );
  const user = useGetUser();
  const newCommentInitialState = {
    id: 0,
    commentDate: "",
    commentBody: "",
    commentMedia: "",
    userAt: user?.userAt,
    userName: user?.userName,
    userImg: user?.userImg,
  };

  const [newComment, setNewComment] = useState(newCommentInitialState);

  const handleReply = (post: IPost, newPost: INewComment) => {
    setComments((prevArr) => [...(prevArr as Array<IComment>), newComment]);
    resetNewComment();
    updateCommentCount(currentIndex);
    updatePostWithComment(post, newPost);
    setFile(null);
    setPreview(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const resetNewComment = () => {
    setNewComment(newCommentInitialState);
  };

  const updateCommentCount = (index: number) => {
    const newArr = [...(posts as Array<IPost>)];
    newArr[index].commentCount = newArr[index].commentCount + 1;
    setPosts(newArr);
  };

  useEffect(() => {
    setNewComment((prevState) => ({
      ...prevState,
      commentMedia: fileFromReader as string,
    }));
  }, [fileFromReader]);

  return (
    <div className="bottom-3 px-3 mb-18 flex">
      <img src={user?.userImg} className="w-12 h-12 rounded-full" alt="" />
      <div>
        <div className="flex">
          <UserTextInput
            value={newComment.commentBody}
            name="commentBody"
            handleChange={handleChange}
            placeholder="Tweet your reply"
          />
          <CommentButton
            label="Reply"
            post={post}
            newComment={newComment}
            handleReply={handleReply}
          />
        </div>
        <PreviewImg imgSrc={preview as string} />
        <div className="flex">
          <FileUpload name="commentMedia" handleFileUpload={handleFileUpload} />
          <NewPostButtons icon={<FaCalendar />} />
          <NewPostButtons icon={<FaSmile />} />
        </div>
      </div>
    </div>
  );
};

export const NewPostButtons = ({ icon }: { icon: IconBaseProps }) => (
  <div className="post-icon">
    <>{icon}</>
  </div>
);
