import axios from "axios";
import { IUser } from "consts/Interface";
import { useUpdateUser } from "../../context/UserContext";
import { useCallback, useEffect, useState } from "react";

type loginDetails = {
  email: string;
  password: string;
};

export const useGetLoggedInUser = (
  loginDetails: loginDetails,
  submit: boolean,
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const updateUser = useUpdateUser();
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState();
  const [unsuccesful, setUnsuccesful] = useState<boolean>();

  const sendQuery = useCallback(
    async (loginDetails: loginDetails, submit: boolean) => {
      if ((submit = true)) {
        try {
          await setError(false);
          const { data } = await axios.get<IUser>(
            `https://localhost:7227/users/login`,
            {
              params: {
                email: loginDetails.email,
                password: loginDetails.password,
              },
            }
          );
          if (updateUser !== null) {
            updateUser(await data);
          }
        } catch (err) {
          if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            await setError(error);
            await setSubmit(false);
          } else {
            console.log("unexpected error: ", error);
            await setSubmit(false);
            return "An unexpected error occurred";
          }
        }
      }
    },
    [submit]
  );

  useEffect(() => {
    sendQuery(loginDetails, submit);
  }, [submit]);

  return { error, unsuccesful, data };
};
