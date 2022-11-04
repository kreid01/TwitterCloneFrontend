import React, { useState } from "react";
import { postUser } from "../../../services/users/postUser";

interface Props {
  openLoginPage: (option: string) => void;
}

export const SignupComponent: React.FC<Props> = ({ openLoginPage }) => {
  const [signInData, setSignInData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const completeSignup = () => {
    postUser(signInData);
    openLoginPage("login");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
    console.log(signInData);
  };

  return (
    <>
      <div className="mt-52 mx-auto flex w-3/6 flex-col mb-6">
        <h1 className="my-3 ml-3 font-bold text-xl">Join Twitter Today</h1>
        <div className="w- px-3 mb-2 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Name
          </label>
          <input
            onChange={handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="name"
            type="text"
            placeholder="Jane Doe"
          />
        </div>
        <div className="w-full px-3 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Username
          </label>
          <input
            className="peer appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            onChange={handleChange}
            name="username"
            placeholder="janedoe"
            required
            minLength={5}
          />
          <p className="invisible h-0 peer-invalid:visible mb-4  peer-invalid:h-2 text-red-700 font-light">
            Please enter a username
          </p>
        </div>
        <div className="w-full px-3 mt-2">
          <label className="block uppercase tracking-wide text--700 text-xs font-bold mb-2">
            Email
          </label>
          <input
            onChange={handleChange}
            className=" peer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="email"
            name="email"
            placeholder="janedoe@email.com"
            required
          />
          <p className="invisible h-0 peer-invalid:visible  peer-invalid:h-2 text-red-700 font-light">
            Please enter a valid email address
          </p>
        </div>
      </div>
      <div className="flex flex-wrap w-3/6 mx-auto mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Password
          </label>
          <input
            required
            onChange={handleChange}
            name="password"
            className="peer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="password"
            placeholder="******************"
            minLength={7}
          />
          <p className="invisible h-0 peer-invalid:visible  peer-invalid:h-2 text-red-700 font-light">
            Passwords must be more than 7 chracters long
          </p>
          <button
            className="shadow w-full mt-6 bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            onClick={() => completeSignup()}
          >
            Sign Up
          </button>
          <p className="mt-4 text-gray-500">
            Have an account already?
            <button
              onClick={() => openLoginPage("login")}
              className="text-blue-500 ml-3"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
