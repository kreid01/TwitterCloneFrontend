import React, { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LoginButtons } from "../components/Login/LoginButtons/LoginButtons";
import { LoginComponent } from "components/Login/LoginComponent/LoginComponent";
import { SignupComponent } from "components/Login/SignupComponent/SignupComponent";
interface Props {
  isOnLoginpage: boolean;
  loginOption: string;
  openLogInPage: (option: string) => void;
}

export const LogInPage: React.FC<Props> = ({
  openLogInPage,
  isOnLoginpage,
  loginOption,
}) => {
  return (
    <div className="-ml-14 md:ml-0 ">
      <>
        {!isOnLoginpage ? (
          <LoginButtons openLoginPage={openLogInPage} />
        ) : (
          <>
            <header className="top-0 flex justify-center">
              <Link to="/search"></Link>
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
    </div>
  );
};
