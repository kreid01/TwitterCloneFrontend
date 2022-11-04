import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHouseUser,
  FaEnvelope,
  FaSearch,
  FaBell,
  FaBookmark,
  FaList,
  FaUser,
  FaTwitter,
  FaPenNib,
} from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import { useGetUser } from "context/UserContext";

export const Navbar: React.FC = () => {
  const user = useGetUser();

  return (
    <header data-testid="nav">
      <nav className="fixed w-20 h-screen flex flex-col bg-white shadow-lg">
        <NavLink end to="/">
          <NavbarIcon icon={<FaTwitter size="30" />}></NavbarIcon>
        </NavLink>
        <NavLink end to="/">
          <NavbarIcon icon={<FaHouseUser size="30" />}></NavbarIcon>
        </NavLink>
        <NavbarIcon icon={<FaSearch size="30" />}></NavbarIcon>
        <NavbarIcon icon={<FaBell size="30" />}></NavbarIcon>
        <NavbarIcon icon={<FaEnvelope size="30" />}></NavbarIcon>
        <NavbarIcon icon={<FaBookmark size="30" />}></NavbarIcon>
        <NavbarIcon icon={<FaList size="30" />}></NavbarIcon>
        <NavLink end to={`/${user?.userAt}`}>
          <NavbarIcon icon={<FaUser size="30" />}></NavbarIcon>
        </NavLink>
        <NavLink end to="/login">
          <NavbarIcon icon={<FaPenNib size="30" />}></NavbarIcon>
        </NavLink>
      </nav>
    </header>
  );
};

export const NavbarIcon = ({ icon }: { icon: IconBaseProps }) => (
  <div className="sidebar-icon">
    <>{icon}</>
  </div>
);
