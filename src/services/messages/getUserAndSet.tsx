import axios from "axios";
import { IUser } from "consts/Interface";

export const getUserAndSet = async (
  id: string,
  setMessanger: (user: IUser) => void
) => {
  try {
    const { data } = await axios.get<IUser>(
      `https://localhost:7227/users/${id}`
    );
    setMessanger(await data);
  } catch (err) {
    console.log("error message: ", err);
    return err;
  }
};
