import axios from "axios";

interface userToUpdate {
  userImg: string;
  userCoverImg: string;
  userId: number;
}

export const updateUserProfile = async (user: userToUpdate) => {
  const updatedProfile = {
    userImg: `${user.userImg}`,
    userCoverImg: `${user.userCoverImg}`,
  };
  try {
    const res = await axios.put(
      `https://localhost:7227/users/profile/${user.userId}`,
      updatedProfile
    );
    console.log("updated", res.data);
  } catch (err) {
    console.log(err);
  }
};
