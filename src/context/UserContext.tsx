import { IUser } from "consts/Interface";
import React, { useContext, useState, createContext } from "react";

const UserContext = createContext<IUser | null>(null);
const UpdateUser = createContext<{ (user: IUser): void } | null>(null);

export const useGetUser = () => {
  return useContext(UserContext);
};

export const useUpdateUser = () => {
  return useContext(UpdateUser);
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const updateUser = (user: IUser) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={user as IUser}>
      <UpdateUser.Provider value={updateUser}>{children}</UpdateUser.Provider>
    </UserContext.Provider>
  );
};
