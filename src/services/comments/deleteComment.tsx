import axios from "axios";

export const deleteComment = async (id: number) => {
  try {
    const res = await axios.delete(`https://localhost:7227/comments/${id}`);
    console.log("deleted", res);
  } catch (err) {
    console.log(err);
  }
};
