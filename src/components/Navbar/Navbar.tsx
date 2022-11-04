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
import { useUpdateIsCommenting } from "context/IsCommentingContext";

export const Navbar: React.FC = () => {
  const toggleComment = useUpdateIsCommenting();

  return (
    <header
      data-testid="nav"
      onClick={toggleComment !== null ? () => toggleComment() : undefined}
    >
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
        <NavLink end to="/BLAD33">
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
