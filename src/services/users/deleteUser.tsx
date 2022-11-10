import axios from "axios";

export const deleteUser = async (id: number) => {
  try {
    const res = await axios.delete(`https://localhost:7227/users/${id}`);
    console.log("deleted", res);
  } catch (err) {
    console.log(err);
  }
};
