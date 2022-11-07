import axios from "axios";
import { HubConnectionBuilder } from "@microsoft/signalr";

const initlaizeSignalRConnection = () => {
  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7227/messageHub")
    .build();

  connection.start().catch((err) => console.error(err.toString()));
  return connection;
};

export const connection = initlaizeSignalRConnection();

export const sendMessage = async (
  senderName: string,
  chatId: number,
  messageContent: string
) => {
  const json = {
    chatId: chatId,
    senderName: senderName,
    messageContent: messageContent,
  };
  try {
    const res = await axios.post("https://localhost:7227/chat/message", json);
    console.log("posted", res.data);
  } catch (err) {
    console.log(err);
  }
};
