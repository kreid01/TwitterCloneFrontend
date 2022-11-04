import React from "react";
import { Link } from "react-router-dom";

interface Props {
  openLoginPage: (option: string) => void;
}

export const Login: React.FC<Props> = ({ openLoginPage }) => {
  return (
    <div className=" h-14 bg-blue-500 fixed bottom-0 w-screen flex justify-center">
      <Link
        to="/login"
        onClick={() => openLoginPage("login")}
        className="login-button"
      >
        Log In
      </Link>
      <button onClick={() => openLoginPage("signup")} className="signup-button">
        Sign Up
      </button>
    </div>
  );
};
