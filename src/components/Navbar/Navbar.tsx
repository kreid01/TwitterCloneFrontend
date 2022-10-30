import React from 'react';
import { NavLink } from 'react-router-dom'
import { FaHouseUser, FaEnvelope, FaSearch, FaBell, FaBookmark, FaList, FaUser, FaTwitter, FaPenNib } from 'react-icons/fa'
import { IconBaseProps } from 'react-icons';


export const Navbar: React.FC = () => {

    return (
        <header data-testid= "nav">
            <nav className='fixed w-20 h-screen flex flex-col bg-white shadow-lg'>
                <NavLink  end to='/'>
                <SideBarIcon 
                icon={<FaTwitter size='30'/>}></SideBarIcon>
                </NavLink>
                <NavLink end to='/'>
                <SideBarIcon 
                icon={<FaHouseUser size='30'/>}></SideBarIcon>
                </NavLink>
                <SideBarIcon 
                icon={<FaSearch size='30'/>}></SideBarIcon>
                <SideBarIcon 
                icon={<FaBell size='30'/>}></SideBarIcon>
                <SideBarIcon 
                icon={<FaEnvelope size='30'/>}></SideBarIcon>
                <SideBarIcon 
                icon={<FaBookmark size='30'/>}></SideBarIcon>
                <SideBarIcon 
                icon={<FaList size='30'/>}></SideBarIcon>
                <SideBarIcon 
                icon={<FaUser size='30'/>}></SideBarIcon>
                <SideBarIcon 
                icon={<FaPenNib size='30'/>}></SideBarIcon>
            </nav>
        </header>
    )
}

const SideBarIcon = ({ icon }: {icon: IconBaseProps})  => (
    <div className='sidebar-icon'>
        <>{icon}</>
    </div>
)