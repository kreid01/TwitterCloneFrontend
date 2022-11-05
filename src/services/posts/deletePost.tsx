import axios from "axios";

export const deletePost = async (id: number) => {
  try {
    const res = await axios.delete(`https://localhost:7227/posts/${id}`);
    console.log("deleted", res);
  } catch (err) {
    console.log(err);
  }
};
