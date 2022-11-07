import axios from "axios";

export const deleteChat = async (chatId: number) => {
  try {
    const res = await axios.delete(`https://localhost:7227/chat/${chatId}`);
  } catch (err) {
    console.log(err);
  }
};
