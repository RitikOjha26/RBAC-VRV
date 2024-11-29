import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useRole } from '../context/rolescontext';
import { getUserCount } from '../api/users';
import { getRolesCount } from '../api/roles';
import { FaSlidersH } from "react-icons/fa";
import SIDENAV from '../components/sideNav';
import Profile from '../components/profile';
import Charts from '../components/charts';
import Particles from '../components/particles'
import '../styles/dashboard.css'

const Dashboard = () => {
    
    const { user} = useAuth();
    const { role, getPermission } = useRole();
    const [roleCount, setRoleCount] = useState<number | null>(null);
    const [userCount, setUserCount] = useState<number | null>(null);
    const [isMobileNavVisible, setMobileNavVisisble] = useState<boolean>(false);

    useEffect(() => {
        if (user && user.roleId && !role) {
            getPermission(user.roleId);
            
        }

        if (role) {
            const hasRolesPageAccess = role.features.some(
                feature => feature.featureName === "Roles Page" &&
                    (feature.access === "READ" || feature.access === "WRITE")
            );


            if (hasRolesPageAccess) {
                const fetchRolesCount = async () => {
                    try {
                        const count = await getRolesCount();
                        setRoleCount(count);
                    } catch (error) {
                        console.error("Error fetching roles count:", error);
                    }
                };

                fetchRolesCount();
            }
        }

        if (role) {
            const hasUserPageAcess = role.features.some(
                feature => feature.featureName === "User Management" && feature.access !== "NO_ACCESS"
            );

            if (hasUserPageAcess) {
                const fetchUserCount = async () => {
                    try {
                        const count = await getUserCount();
                        setUserCount(count);
                    }
                    catch (error) {
                        console.log("Error Fetching User Count ", error);
                    }

                };
                fetchUserCount();
            }

        }

        

    }, [user, role, getPermission]);

    const handleNavtoggle = () => {
        setMobileNavVisisble(!isMobileNavVisible);
    }

    if (!user) {
        return <div>Loading user information...</div>;
    }

    if (!role) {
        return <div>Loading role information...</div>;
    }

    return (
        <div className="main-container">
            <Particles/>
            {window.innerWidth <= 768?<SIDENAV className={` nav ${isMobileNavVisible ? "mobile-visible" : "mobile-hidden"}`}/> : <SIDENAV/> }
            <div className='dashboard-container'>

                {window.innerWidth <= 768 ? <FaSlidersH size="1em" className='mobile-sidenav nav-icon ' onClick={handleNavtoggle}/> : '' }

                <div className="profile">
                    <div className="profile-data">
                    <Profile name={user.userName} id={user.roleId} email={user.email} roleName={role.roleName}  />
                    </div>

                    <div className="profile-count">
                        <div className="usercount">
                            <h2>Total Users</h2>
                            <p>{userCount !== null ? userCount : "N/A"}</p>
                        </div>
                        <div className="usercount">
                            <h2>Total Roles</h2>
                            <p>{roleCount !== null ? roleCount : "N/A"}</p>
                        </div>
                        <Charts />
                    </div>

                </div>
                
            </div>
        </div>
    );
};

export default Dashboard;
