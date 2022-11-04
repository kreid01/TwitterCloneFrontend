import React, { useState } from "react";
import { FaCross, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Login } from "../components/Login/Login";
import { LoginComponent } from "components/Login/LoginComponent";
import { SignupComponent } from "components/Login/SignupComponent";

export const LogInPage = () => {
  const [isOnLoginpage, setIsOnLoginPage] = useState(false);
  const [loginOption, setLoginOption] = useState<string>();
  const openLogInPage = (option: string) => {
    setIsOnLoginPage(true);
    setLoginOption(option);
    console.log(option);
  };
  return (
    <>
      {!isOnLoginpage ? (
        <Login openLoginPage={openLogInPage} />
      ) : (
        <>
          <header className="top-0">
            <Link to="/">
              <FaCross />
            </Link>
            <FaTwitter />
          </header>
          {loginOption === "login" ? (
            <LoginComponent />
          ) : loginOption === "signup" ? (
            <SignupComponent />
          ) : undefined}
        </>
      )}
    </>
  );
};
