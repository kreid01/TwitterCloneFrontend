import axios from "axios";
import { IPost } from "consts/Interface";

export const updateUsersPosts = async (userId: string, post: IPost) => {
  const json = {
    postIds: [post.id],
  };

  try {
    const res = await axios.put(`https://localhost:7227/users/${userId}`, json);
    console.log("posted", res.data);
  } catch (err) {
    console.log(err);
  }
};
