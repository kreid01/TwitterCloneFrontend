import React, { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Login } from "../components/Login/LoginButtons/Login";
import { LoginComponent } from "components/Login/LoginComponent/LoginComponent";
import { SignupComponent } from "components/Login/SignupComponent/SignupComponent";

export const LogInPage = () => {
  const [isOnLoginpage, setIsOnLoginPage] = useState(false);
  const [loginOption, setLoginOption] = useState<string>();
  const openLogInPage = (option: string) => {
    setIsOnLoginPage(true);
    setLoginOption(option);
  };
  return (
    <>
      {!isOnLoginpage ? (
        <Login openLoginPage={openLogInPage} />
      ) : (
        <>
          <header className="mt-3 w-screen top-0 flex justify-center">
            <Link to="/"></Link>
            <FaTwitter size="35" className="text-blue-400" />
          </header>
          {loginOption === "login" ? (
            <LoginComponent openLoginPage={openLogInPage} />
          ) : loginOption === "signup" ? (
            <SignupComponent openLoginPage={openLogInPage} />
          ) : undefined}
        </>
      )}
    </>
  );
};
