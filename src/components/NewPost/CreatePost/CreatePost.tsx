import React, { useState, useEffect } from "react";
import { FaCalendar, FaSmile } from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import { TweetButton } from "../TweetButton/TweetButton";
import { FileUpload } from "../FileUpload/FileUpload";
import { PreviewImg } from "../PreviewImg/PreviewImg";
import { UserTextInput } from "../UserTextInput/UserTextInput";
import { useFileReader } from "../../../hooks/useFileReader";
import { IPost } from "../../../consts/Interface";
import { postPost } from "../../../services/postPost";

interface Props {
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

export const CreatePost: React.FC<Props> = ({ setPosts }) => {
  const newPostInitialState = {
    postTextBody: "",
    postMedia: "",
    posterId: 1,
    userAt: "BLAD33",
    userName: "bladee",
    userImg:
      "https://i1.sndcdn.com/artworks-z7ABLFRxBZUd1j0w-ANNyqw-t500x500.jpg",
    commentCount: 0,
    retweetCount: 0,
    likeCount: 0,
    postDate: "",
    id: 0,
  };
  const [newPost, setNewPost] = useState(newPostInitialState);
  const [file, setFile] = useState<FileList | null>();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files as FileList);
  };
  const { preview, fileFromReader, setPreview } = useFileReader(
    file as FileList
  );
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const resetNewPost = () => {
    setNewPost(newPostInitialState);
  };

  const handleTweet = () => {
    postPost(newPost);
    setPosts((prevArr) => [...(prevArr as Array<IPost>), newPost]);
    resetNewPost();
    setPreview(null);
  };

  useEffect(() => {
    setNewPost((prevState) => ({
      ...prevState,
      postMedia: fileFromReader as string,
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
          value={newPost.postTextBody}
          name="postTextBody"
          handleChange={handleChange}
          placeholder="What's Happening?"
        />
        <PreviewImg imgSrc={preview as string} />
        <div className="flex">
          <FileUpload name="postMedia" handleFileUpload={handleFileUpload} />
          <NewPostButtons icon={<FaCalendar />} />
          <NewPostButtons icon={<FaSmile />} />
          <TweetButton label="Tweet" handleTweet={handleTweet}></TweetButton>
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
