import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGetUser } from "context/UserContext";
import { useNavigate } from "react-router-dom";
import { useLogoutUser } from "../hooks/users/useLogoutUser";

interface Props {}

export const ProfileHeader: React.FC<Props> = () => {
  const user = useGetUser();
  const [logout, setLogout] = React.useState(false);
  const { logoutSuccessful } = useLogoutUser(logout);
  const navigate = useNavigate();

  const logoutUser = () => {
    setLogout(true);
  };

  useEffect(() => {
    if (logoutSuccessful) navigate("/");
  }, [logoutSuccessful]);

  return (
    <header
      className="flex pl-5 pt-1 pb-1 fixed w-full
            backdrop-blur-lg bg-slate-400 
            bg-opacity-5 z-2"
    >
      <Link to="/" className="mr-4 mt-4">
        <FaArrowLeft bg-red-100 />
      </Link>
      <div>
        <h2 className="font-bold">{user?.userName}</h2>
        <p className="text-sm text-gray-400"> Tweets</p>
      </div>
      <div>
        <button onClick={logoutUser} className="ml-40 button-primary">
          Sign out
        </button>
      </div>
    </header>
  );
};
