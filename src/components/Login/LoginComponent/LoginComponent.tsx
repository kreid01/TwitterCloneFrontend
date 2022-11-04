import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../../../hooks/users/useLoginUser";

interface Props {
  openLoginPage: (option: string) => void;
}

export const LoginComponent: React.FC<Props> = ({ openLoginPage }) => {
  const [loginInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);

  const { successful, error } = useLoginUser(loginInData, submit, setSubmit);

  useEffect(() => {
    if (successful) {
      console.log("s");
      navigate("/");
    }
  }, [successful]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <div className="mt-56 mx-auto flex w-4/6 flex-col mb-6">
        <h1 className="my-3 ml-3 font-bold text-xl">Join Twitter Today</h1>

        <div className="w-full  px-3 mt-2">
          <label className="block uppercase tracking-wide text--700 text-xs font-bold mb-2">
            Email
          </label>
          <input
            onChange={handleChange}
            className=" peer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            name="email"
            type="email"
            placeholder="email.com"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap w-4/6 mx-auto mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Password
          </label>
          <input
            required
            className="peer appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            name="password"
            type="password"
            placeholder="******************"
            minLength={7}
            onChange={handleChange}
          />
          <button
            className="shadow w-full mt-6 bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            onClick={() => setSubmit(true)}
          >
            Log in
          </button>
          <p className="mt-4 text-gray-500">
            Don't thave an account?
            <button
              onClick={() => openLoginPage("signup")}
              className="text-blue-500 ml-2"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
