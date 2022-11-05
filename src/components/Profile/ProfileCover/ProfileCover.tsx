import React, { useState } from "react";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { ProfilePostFilters } from "../ProfilePostFilters/ProfilePostFilters";
import { useFileReader } from "hooks/utils/useFileReader";
import { ProfileHeader } from "../ProfileHeader/ProfileHeader";
import { updateUserProfile } from "../../../services/users/updateUserProfile";
import { useGetUser } from "context/UserContext";
import { deleteUser } from "services/users/deleteUser";

export type User = {
  userName: string;
  userAt: string;
  userCoverImg: string;
  userImg: string;
  userEmail: string;
  joinDate: string;
  postsIds: Array<number>;
  userId: number;
  isAdmin?: boolean;
};

interface Props {
  user: User;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileCover: React.FC<Props> = ({ user, handleChange }) => {
  const [isEdittingProfile, setIsEditingProfile] = useState(false);
  const currentUser = useGetUser();
  const [confirmDeletion, setConfirmDeleteion] = useState(false);
  const isCurrentUser = currentUser?.userId === user.userId;

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

  const confirmation = () => {
    setConfirmDeleteion(true);
    console.log(confirmDeletion);
  };
  const confirmDeletionText = confirmDeletion
    ? "Are you sure?"
    : "Delete Profile";

  return (
    <div className="w-[84vw] md:w-[49vw] lg:w-[40vw]">
      <ProfileHeader user={user as User} />
      <div className="pt-14">
        <img src={user.userCoverImg} alt="" className="h-44 w-full z-1" />
        {isEdittingProfile && (
          <>
            <label
              htmlFor="profileImg"
              className="absolute top-44  z-10 left-[24%] md:left-[26%] lg:left-[34%]"
            >
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
          className="h-24 w-24 rounded-full border-x-neutral-50 border-2 absolute top-44 left-[24%] md:left-[26%] lg:left-[34%]"
        />
        <div className="mt-16 ml-5">
          <h2 data-testid="profileName" className="text-lg font-bold">
            {user.userName}
          </h2>
          <p data-testid="profileAt" className="text-sm text-gray-500">
            @{user.userAt}
          </p>
          <div className="mt-4 text-sm flex text-gray-500">
            <FaCalendarAlt className="mr-1 " />
            Joined {user.joinDate.substring(0, 7)}
            {isCurrentUser && !isEdittingProfile ? (
              <button
                onClick={editProfile}
                className="ml-auto mr-3 rounded-md border-2 px-3 py-1"
              >
                Edit Profile
              </button>
            ) : isCurrentUser ? (
              <>
                {!confirmDeletion ? (
                  <button
                    onClick={confirmation}
                    className="ml-auto border-red-600 text-red-600 mr-3 rounded-md border-2 px-3 py-1"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className="ml-auto border-red-600 text-red-600 mr-3 rounded-md border-2 px-3 py-1"
                    onClick={() => deleteUser(user.userId)}
                  >
                    Are you sure?
                  </button>
                )}
                <button
                  onClick={submitChanges}
                  className="ml-auto mr-3 rounded-md border-2 px-3 py-1"
                >
                  Submit chagnes
                </button>
              </>
            ) : undefined}
          </div>
        </div>
        <ProfilePostFilters handleChange={handleChange} />
      </div>
    </div>
  );
};
