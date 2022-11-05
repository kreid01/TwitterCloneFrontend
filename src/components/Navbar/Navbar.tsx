import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHouseUser,
  FaEnvelope,
  FaSearch,
  FaBell,
  FaUser,
  FaTwitter,
  FaPenNib,
} from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import { useGetUser } from "context/UserContext";
import {
  useIsCommenting,
  useUpdateIsCommenting,
} from "context/IsCommentingContext";

export const Navbar: React.FC = () => {
  const user = useGetUser();
  const goOffCommenting = useUpdateIsCommenting();
  const isCommenting = useIsCommenting();

  const handleClick = () => {
    if (isCommenting && goOffCommenting !== null) goOffCommenting();
  };

  const NavbarIcon = ({ icon }: { icon: IconBaseProps }) => (
    <div onClick={() => handleClick()} className="sidebar-icon">
      <>{icon}</>
    </div>
  );

  return (
    <header data-testid="nav">
      <nav
        className="fixed w-2/12 min-h-screen md:w-3/12 lg:w-4/12
       flex flex-col bg-white shadow-lg"
      >
        {user ? (
          <>
            <NavLink end to="/home">
              <NavbarIcon
                icon={<FaTwitter size="30" className="text-blue-400" />}
              ></NavbarIcon>
            </NavLink>
            <NavLink end to="/home">
              <NavbarIcon icon={<FaHouseUser size="30" />}></NavbarIcon>
            </NavLink>
            <NavLink end to="/search">
              <NavbarIcon icon={<FaSearch size="30" />}></NavbarIcon>
            </NavLink>
            <NavbarIcon icon={<FaBell size="30" />}></NavbarIcon>
            <NavbarIcon icon={<FaEnvelope size="30" />}></NavbarIcon>
            <NavLink end to={`/${user?.userAt}`}>
              <NavbarIcon icon={<FaUser size="30" />}></NavbarIcon>
            </NavLink>
            <NavLink end to="/login">
              <NavbarIcon icon={<FaPenNib size="30" />}></NavbarIcon>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink end to="/search">
              <NavbarIcon icon={<FaTwitter size="30" />}></NavbarIcon>
            </NavLink>
            <NavbarIcon icon={<FaSearch size="30" />}></NavbarIcon>
          </>
        )}
      </nav>
    </header>
  );
};
