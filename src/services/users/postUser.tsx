import axios from "axios";

interface newUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const postUser = async (user: newUser) => {
  const newUser = {
    userEmail: `${user.email}`,
    userName: `${user.name}`,
    userPassword: `${user.password}`,
    userAt: `${user.username}`,
  };
  try {
    const res = await axios.post("https://localhost:7227/users", newUser);
    console.log("posted", res.data);
  } catch (err) {
    console.log(err);
  }
};
