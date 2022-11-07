import axios from "axios";
import { IUser } from "consts/Interface";

export const postChat = async (user1: IUser, user2: IUser) => {
  const json = {
    user1: user1?.userId,
    user2: user2?.userId,
    user1Name: user1?.userName,
    user2Name: user2?.userName,
    user1At: user1?.userAt,
    user2At: user2?.userAt,
    user1Img: user1?.userImg,
    user2Img: user2?.userImg,
  };
  try {
    const res = await axios.post("https://localhost:7227/chat", json);
    console.log("posted", res.data);
  } catch (err) {
    console.log(err);
  }
};
