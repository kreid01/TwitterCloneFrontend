import React from 'react';
import { NavLink } from 'react-router-dom'
import { FaHouseUser, FaEnvelope, FaSearch, FaBell, FaBookmark, FaList, FaUser, FaTwitter, FaPenNib } from 'react-icons/fa'
import { IconBaseProps } from 'react-icons';


export default function Navbar() {

    return (
        <header>
            <nav className='fixex w-80 h-screen flex flex-col bg-white shadow-lg'>
                <div className='right-20'>
                <SideBarIcon 
                icon={<FaTwitter size='30'/>}></SideBarIcon>
                <SideBarIcon 
                icon={<FaHouseUser size='30'/>}></SideBarIcon>
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
                </div>
            </nav>
        </header>
    )
}

const SideBarIcon = ({ icon }: {icon: IconBaseProps})  => (
    <div className='sidebar-icon'>
        <>{icon}</>
    </div>
)