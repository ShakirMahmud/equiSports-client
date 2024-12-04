import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { ThemeContext } from '../provider/ThemeProvider';

const NavBar = () => {
    
    const { user, logOut } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const links = <div className='flex flex-col lg:flex-row gap-3'>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allSportsEquipment'>All Sports Equipment</NavLink></li>
        {
            user?.email &&
            <li><NavLink to='/addEquipment'>Add Equipment</NavLink></li>
        }
        {
            user?.email &&
            <li><NavLink to='/myEquipmentList'>My Equipment List</NavLink></li>
        }
    </div>

    return (
        <div>
            <div className="navbar bg-white border-2">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">EquiSports</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className=" font-bold menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <button onClick={toggleTheme} className='btn btn-neutral bg-btn_bg rounded-xl'>
                        {
                            isDarkMode ? 'Light Mode' : 'Dark Mode' 
                        }
                    </button>
                    
                    {
                        user && user?.email ?
                            <div className='flex gap-3 items-center justify-center'>
                                <div className='w-12 h-12 bg-card_bg rounded-full flex justify-center items-center '>
                                    <img className='w-10 h-10 rounded-full' src={user?.photoURL} alt="" title={user?.displayName} />
                                </div>
                                <Link onClick={logOut} className='btn btn-neutral bg-btn_bg rounded-xl'>Logout</Link>
                            </div>
                            :
                            <div className='flex gap-3'>
                                <Link to='/auth/signIn' className='btn btn-neutral bg-btn_bg rounded-xl'>Sign In</Link>
                                <Link to='/auth/signup' className='btn btn-neutral bg-btn_bg rounded-xl'>Sign Up</Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;