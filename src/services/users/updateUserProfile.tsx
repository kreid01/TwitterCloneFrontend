import axios from "axios";
import { IUser } from "consts/Interface";

interface userToUpdate {
  userImg?: string;
  userCoverImg?: string;
  userId?: number;
}

export const updateUserProfile = async (
  userToUpdate: userToUpdate,
  user: IUser
) => {
  const updatedProfile = {
    userImg: `${userToUpdate.userImg}`,
    userCoverImg: `${userToUpdate.userCoverImg}`,
    following: user?.following,
    followers: user?.followers,
    isAdmin: user?.isAdmin,
  };
  try {
    const res = await axios.put(
      `https://localhost:7227/users/${user?.userId}`,
      updatedProfile
    );
    console.log("updated", res.data);
  } catch (err) {
    console.log(err);
  }
};
