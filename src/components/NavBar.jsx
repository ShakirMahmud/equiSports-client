import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const NavBar = () => {
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);

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
            <div className="navbar bg-base-100">
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
                    <NavLink to='/' className="btn btn-ghost text-xl">EquiSports</NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                            {
                                links
                            }
                    </ul>
                </div>
                <div className="navbar-end">
                {
                        user && user?.email ?
                            <div className='flex gap-3 items-center justify-center'>
                                <div className='w-12 h-12 bg-card_bg rounded-full flex justify-center items-center '>
                                    <img className='w-10 h-10 rounded-full' src={user?.photoURL} alt="" title={user?.displayName} />
                                </div>
                                <Link onClick={logOut} className='btn btn-neutral bg-btn_bg rounded-xl'>Logout</Link>
                            </div>
                            :
                            <Link to='/auth/signIn' className='btn btn-neutral bg-btn_bg rounded-xl'>Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;