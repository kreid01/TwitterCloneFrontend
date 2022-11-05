import React, { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { LogInPage } from "./pages/LogInPage";
import { useGetUser } from "context/UserContext";
import { SearchPage } from "./pages/SearchPage";
import { LoginButtons } from "components/Login/LoginButtons/LoginButtons";

export const App: React.FC = () => {
  const user = useGetUser();
  const [isOnLoginpage, setIsOnLoginPage] = useState(false);
  const [loginOption, setLoginOption] = useState<string>();
  const openLogInPage = (option: string) => {
    setIsOnLoginPage(true);
    setLoginOption(option);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="ml-[16vw] md:ml-[25vw] lg:ml-[33vw]  w-full mmd:w-[53vw] lg:w-[40vw] shadow-inner">
        <Routes>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path=":id" element={<ProfilePage />}></Route>
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
          {user && (
            <>
              <Route path="/home" element={<HomePage />}></Route>
              <Route path=":id" element={<ProfilePage />}></Route>
            </>
          )}
        </Routes>
        {!user && !isOnLoginpage && (
          <LoginButtons openLoginPage={openLogInPage} />
        )}
      </div>
    </div>
  );
};
