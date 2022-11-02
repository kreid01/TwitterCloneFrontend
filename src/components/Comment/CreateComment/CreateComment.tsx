import React, { useState, useEffect } from "react";
import { FaCalendar, FaSmile } from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import { FileUpload } from "../../NewPost/FileUpload/FileUpload";
import { PreviewImg } from "../../NewPost/PreviewImg/PreviewImg";
import { UserTextInput } from "../../NewPost/UserTextInput/UserTextInput";
import { useFileReader } from "hooks/useFileReader";

type newComment = {
  commentBody: string;
  commentMedia: string;
};

interface Props {
  newComment: newComment;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setNewComment: React.Dispatch<
    React.SetStateAction<{
      commentBody: string;
      commentDate: string;
      commentMedia: string;
      userAt: string;
      userName: string;
      userImg: string;
    }>
  >;
}

export const CreateComment: React.FC<Props> = ({
  handleChange,
  setNewComment,
  newComment,
}) => {
  const [file, setFile] = useState<FileList>();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files as FileList);
  };
  const { preview, fileFromReader } = useFileReader(file as FileList);

  useEffect(() => {
    setNewComment((prevState) => ({
      ...prevState,
      commentMedia: fileFromReader as string,
    }));
  }, [fileFromReader]);

  return (
    <div className="bottom-3 px-3 mb-18 flex">
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        className="w-12 h-12"
        alt=""
      />
      <div>
        <UserTextInput
          value={newComment.commentBody}
          name="commentBody"
          handleChange={handleChange}
          placeholder="Tweer your reply"
        />
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
