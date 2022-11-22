import React, { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { LogInPage } from "./pages/LogInPage";
import { useGetUser } from "context/UserContext";
import { SearchPage } from "./pages/SearchPage";
import { LoginButtons } from "components/Login/LoginButtons/LoginButtons";
import { MessagePage } from "pages/MessagePage";
import { IUser } from "consts/Interface";
import { postChat } from "services/messages/postChat";

export const App: React.FC = () => {
  const currentUser = useGetUser();
  const [isOnLoginpage, setIsOnLoginPage] = useState(false);
  const [loginOption, setLoginOption] = useState<string>();
  const openLogInPage = (option: string) => {
    setIsOnLoginPage(true);
    setLoginOption(option);
  };
  const [messanger, setMessanger] = useState<IUser | null>();

  const createChat = (user: IUser) => {
    setMessanger(user);
    postChat(currentUser, user);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="ml-[16vw] md:ml-[25vw] lg:ml-[33vw]  w-full mmd:w-[53vw] lg:w-[40vw] shadow-inner">
        <Routes>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route
            path=":id"
            element={<ProfilePage createChat={createChat} />}
          ></Route>
          <Route
            path="login"
            element={
              <LogInPage
                isOnLoginpage={isOnLoginpage}
                loginOption={loginOption as string}
                openLogInPage={openLogInPage}
              />
            }
          ></Route>
          {currentUser && (
            <>
              <Route path="/home" element={<HomePage />}></Route>
              <Route
                path=":id"
                element={<ProfilePage createChat={createChat} />}
              ></Route>
              <Route
                path="/messages"
                element={
                  <MessagePage
                    setMessanger={setMessanger}
                    messanger={messanger as IUser}
                  />
                }
              ></Route>
            </>
          )}
        </Routes>
        {!currentUser && !isOnLoginpage && (
          <LoginButtons openLoginPage={openLogInPage} />
        )}
      </div>
    </div>
  );
};

export default App;