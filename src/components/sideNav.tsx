import React from 'react';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

import '../styles/sideNav.css';
interface SIDENAVProps {
    className?: string;
}

const SideNav: React.FC<SIDENAVProps> = ({ className }) => {
    const navigate = useNavigate(); 
    const  {logout}  = useAuth();

    const dashboardNavigate = () => {
        navigate('/dashboard'); 
    };

    const userNavigate = () => {
        navigate('/users'); 
    };

    const rolesNavigate = () => {
        navigate('/roles'); 
    };

    const handleLogOut = () =>{
         logout();
         navigate('/login'); 
    }

    return (
        <div className={`sidenav ${className || ''}`}>
            <div className="logo">
                <MdOutlineAdminPanelSettings size="4em" />
            </div>

            <div className="nav-navigations">
                <div className='nav-icon' onClick={dashboardNavigate} ><MdOutlineDashboard size="2em"   /><span>DashBoard</span></div>
                <div className="nav-icon" onClick={userNavigate} ><FaUser size="1.5em"   /><span>Profile</span></div>
                <div className="nav-icon" onClick={rolesNavigate}><FaUserSecret size="1.5em"   /><span>Roles</span></div>
                <div className="nav-icon" onClick={handleLogOut } ><FaSignOutAlt size="1.5em"   /><span>LogOut</span></div>
                
            </div>
        </div>
    );
};

export default SideNav;
