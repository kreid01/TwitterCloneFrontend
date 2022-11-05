import React from "react";
import { Link } from "react-router-dom";

interface Props {
  openLoginPage: (option: string) => void;
}

export const LoginButtons: React.FC<Props> = ({ openLoginPage }) => {
  return (
    <div className="h-14 ml-14 bg-blue-500 fixed bottom-0  w-[84vw] md:w-[75vw] lg:w-[70vw] lg:mb-2  lg:ml-1 flex justify-center">
      <Link
        to="/login"
        data-testid="loginButton"
        onClick={() => openLoginPage("login")}
        className="login-button"
      >
        Log In
      </Link>
      <button
        data-testid="signupButton"
        onClick={() => openLoginPage("signup")}
        className="signup-button"
      >
        Sign Up
      </button>
    </div>
  );
};
