import axios from "axios";
import { IUser } from "consts/Interface";

export const updateFollows = async (currentUser: IUser, otherUser: IUser) => {
  const currentUsersFollowing = currentUser;
  if (
    currentUser?.following !== undefined &&
    currentUsersFollowing !== null &&
    currentUsersFollowing.following.length < 1
  ) {
    currentUsersFollowing.following = [otherUser?.userId as number];
  } else if (
    currentUser !== null &&
    currentUser.following.includes(otherUser?.userId as number)
  ) {
    const indexOfOtherUser = currentUser?.following.indexOf(
      otherUser?.userId as number
    );
    currentUsersFollowing?.following.splice(indexOfOtherUser as number, 1);
  } else {
    currentUsersFollowing?.following.push(otherUser?.userId as number);
  }

  const othersUsersFollowers = otherUser;

  if (
    otherUser?.followers !== undefined &&
    othersUsersFollowers !== null &&
    othersUsersFollowers.following.length < 1
  ) {
    othersUsersFollowers.followers = [currentUser?.userId as number];
  } else if (
    otherUser !== null &&
    otherUser.followers.includes(currentUser?.userId as number)
  ) {
    const indexOfCurrentUser = otherUser?.followers.indexOf(
      currentUser?.userId as number
    );
    othersUsersFollowers?.followers.splice(indexOfCurrentUser as number, 1);
  } else {
    othersUsersFollowers?.followers.push(currentUser?.userId as number);
  }

  const currentUserJson = {
    followers: currentUser?.followers,
    following: currentUsersFollowing?.following,
    userCoverImg: currentUser?.userCoverImg,
    userImg: currentUser?.userImg,
    isAdmin: currentUser?.isAdmin,
  };
  const otherUserJson = {
    userName: otherUser?.userName,

    followers: othersUsersFollowers?.followers,
    following: otherUser?.following,
    userCoverImg: otherUser?.userCoverImg,
    userImg: otherUser?.userImg,
    isAdmin: otherUser?.isAdmin,
  };
  try {
    const res = await axios.put(
      `https://localhost:7227/users/${currentUser?.userId}`,
      currentUserJson
    );
    console.log(
      othersUsersFollowers?.followers,
      currentUsersFollowing?.following
    );
    const res2 = await axios.put(
      `https://localhost:7227/users/${otherUser?.userId}`,
      otherUserJson
    );
    console.log("updated", res.data, res2.data);
  } catch (err) {
    console.log(err);
  }
};
