import React from 'react';
import '../styles/Layout.css';
import { adminMenu, userMenu } from '../data/data.js';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message,Badge} from 'antd';

const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const location = useLocation();
    // doctor menu
    const doctorMenu = [
        {
            name: "Home",
            path: '/',
            icon: 'fa-solid fa-house'
        },
        {
            name: "Appointments",
            path: '/doctor-appointments',
            icon: 'fa-solid fa-list'
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: 'fa-solid fa-user'
        }
    ];
    const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const navigate = useNavigate();

    //logout function
    const handleLogout = () => { 
        localStorage.clear();
        message.success("Logout successfully");

        navigate('/login');
    }
    return (
        <>
            <div className='main'>
                <div className='layout'>
                    <div className='sidebar'>
                        <div className='logo'><h6>Doctor Appointment</h6></div>
                        <hr/>
                        <div className='menu'>
                            {SidebarMenu.map((menu,index) => {
                                const isActive = location.pathname === menu.path ;
                                return (
                                    <>
                                        <div key={menu.id || index} className={`menu-item ${isActive && 'active'}`}>
                                            <i className={menu.icon}></i>
                                            <Link to={menu.path}>{menu.name}</Link>
                                        </div>
                                    </>
                                )
                            })}
                            <div className={`menu-item`} onClick={handleLogout}>
                                            <i className='fa-solid fa-right-from-bracket'></i>
                                            <Link to='/login'>Logout</Link>
                                        </div>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='header'>
                            <div className='header-content' style={{cursor:'pointer'}}>
                                <Badge count={user && user.notification.length} onClick={() => { navigate('/notification')}} >
                                <i className='fa-solid fa-bell'></i>
                                </Badge>
                                {user ? <Link to='/profile'>{user.name}</Link> : <Link to='/login'>Login</Link>}
                                {/* <Link to='/profile'>{ user?.name}</Link> */}
                            </div>
                        </div>
                        <div className='body'>{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
