import axios from "axios";
import { IUser } from "consts/Interface";

export const sendMessage = async (
  sender: IUser,
  reciever: IUser,
  messageContent: string
) => {
  try {
    const res = await axios.post("https://localhost:7227/message", {
      params: {
        reciever: reciever,
        messageContent: messageContent,
        sender: sender,
      },
    });
    console.log("posted", res.data);
  } catch (err) {
    console.log(err);
  }
};
