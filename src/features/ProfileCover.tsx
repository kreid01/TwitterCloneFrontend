import React, { useState } from "react";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { ProfilePostFilters } from "./ProfilePostFilters";
import { useFileReader } from "hooks/utils/useFileReader";
import { ProfileHeader } from "./ProfileHeader";
import { updateUserProfile } from "../services/users/updateUserProfile";

export type User = {
  userName: string;
  userAt: number;
  userCoverImg: string;
  userImg: string;
  userEmail: string;
  joinDate: string;
  postsIds: Array<number>;
  userId: number;
};

interface Props {
  user: User;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfilePageHead: React.FC<Props> = ({ user, handleChange }) => {
  const [isEdittingProfile, setIsEditingProfile] = useState(false);

  const editProfile = () => {
    setIsEditingProfile(true);
  };

  const [file, setFile] = useState<FileList | null>();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files as FileList);
  };
  const { preview, fileFromReader, setPreview } = useFileReader(
    file as FileList
  );

  const submitChanges = () => {
    setIsEditingProfile(false);
    updateUserProfile(updatedProfile);
  };

  const updatedProfile = {
    userId: user.userId,
    userImg: preview as string,
    userCoverImg: preview as string,
  };

  return (
    <div className="ml-20">
      <ProfileHeader />
      <div className="pt-12">
        <img src={user.userCoverImg} alt="" className="h-44 w-full z-1" />
        {isEdittingProfile && (
          <>
            <label htmlFor="profileImg" className="absolute top-44 left-24">
              <FaPlus size="20" />
            </label>
            <input
              onChange={handleFileUpload}
              id="profileImg"
              type="file"
              className="hidden"
            />
          </>
        )}
        <img
          src={isEdittingProfile ? (preview as string) : user.userImg}
          alt=""
          className="h-24 w-24 rounded-full border-x-neutral-50 border-2 absolute top-44 left-24"
        />
        <div className="mt-16 ml-5">
          <h2 className="text-lg font-bold">{user.userName}</h2>
          <p className="text-sm text-gray-500">@{user.userAt}</p>
          <div className="mt-4 text-sm flex text-gray-500">
            <FaCalendarAlt className="mr-1 self-center" />
            Joined {user.joinDate.substring(0, 7)}
            {!isEdittingProfile ? (
              <button onClick={editProfile} className="ml-auto mr-3">
                Edit Profile
              </button>
            ) : (
              <button onClick={submitChanges} className="ml-auto mr-3">
                Submit chagnes
              </button>
            )}
          </div>
        </div>
        <ProfilePostFilters handleChange={handleChange} />
      </div>
    </div>
  );
};
