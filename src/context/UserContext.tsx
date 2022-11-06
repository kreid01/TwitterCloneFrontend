import { IUser } from "consts/Interface";

import React, { useContext, useState, createContext, useEffect } from "react";

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
  const [user, setUser] = useState<IUser | null>(() => {
    const saved = localStorage.getItem("userInfo");
    const initialValue = JSON.parse(saved as string);
    return initialValue || null;
  });

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }, [user]);

  const updateUser = (user: IUser | null) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={user as IUser}>
      <UpdateUser.Provider value={updateUser}>{children}</UpdateUser.Provider>
    </UserContext.Provider>
  );
};
