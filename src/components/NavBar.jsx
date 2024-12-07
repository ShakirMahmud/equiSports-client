import { BiLogOut } from "react-icons/bi";
import { MdOutlineDarkMode } from "react-icons/md";
import { BiSun } from "react-icons/bi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { BiLogIn } from "react-icons/bi";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const links = (
        <div className="flex flex-col lg:flex-row gap-3">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/allSportsEquipment">All Sports Equipment</NavLink>
            </li>
            {user?.email && (
                <li>
                    <NavLink to="/privateRoute/addEquipment">Add Equipment</NavLink>
                </li>
            )}
            {user?.email && (
                <li>
                    <NavLink to="/privateRoute/myEquipmentList">My Equipment List</NavLink>
                </li>
            )}
        </div>
    );

    return (
        <div className="w-full border-2">
            <div className="navbar bg-white py-4 w-4/5 mx-auto flex flex-col lg:flex-row">
                {/* MOBILE FIRST ROW */}
                <div className="w-full flex justify-between items-center lg:hidden">
                    {/* Dropdown for mobile */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    {/* Website Logo */}
                    <Link to="/" className="text-2xl font-bold flex items-center gap-0">
                        <span className="border-b-4 border-black">
                            <span className="border-b-4 border-black italic">Equi</span>
                        </span>
                        <span className="font-semibold text-gray-500 italic">Sports</span>
                    </Link>
                    {/* Dark Mode Toggle */}
                    <button onClick={toggleTheme} className="text-3xl">
                        {isDarkMode ? (
                            <span className="text-yellow-600">
                                <BiSun />
                            </span>
                        ) : (
                            <MdOutlineDarkMode />
                        )}
                    </button>
                </div>

                {/* MOBILE SECOND ROW */}
                <div className="w-full flex justify-center items-center mt-3 lg:hidden">
                    {user && user?.email ? (
                        <div className="flex gap-3 items-center">
                            <div className="w-12 h-12 bg-card_bg rounded-full flex justify-center items-center">
                                <img
                                    data-tooltip-id="my-tooltip-2"
                                    className="w-10 h-10 rounded-full"
                                    src={user?.photoURL}
                                    alt=""
                                />
                            </div>
                            <ReactTooltip
                                id="my-tooltip-2"
                                place="bottom"
                                variant="info"
                                content={user?.displayName}
                            />
                            <Link
                                onClick={logOut}
                                className="btn bg-[#050b36] hover:bg-[#e1d1e8] px-6 text-white hover:text-black hover:font-bold text-lg font-semibold rounded-xl"
                            >
                                Logout <BiLogOut />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex gap-3 justify-center">
                            <Link
                                to="/auth/signIn"
                                className="btn bg-white border border-gray-400 rounded-xl text-lg font-semibold hover:bg-[#acb3e3] hover:border-white hover:text-black hover:font-bold"
                            >
                                Sign In <BiLogIn />
                            </Link>
                            <Link
                                to="/auth/signup"
                                className="btn bg-[#050b36] hover:bg-[#e1d1e8] px-6 text-white hover:text-black hover:font-bold text-lg font-semibold rounded-xl"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* DESKTOP VIEW */}
                <div className="navbar-start hidden lg:flex">
                    <Link to="/" className="btn btn-ghost text-3xl font-bold flex items-center gap-0">
                        <span className="border-b-4 border-black">
                            <span className="border-b-4 border-black italic">Equi</span>
                        </span>
                        <span className="font-semibold text-gray-500 italic">Sports</span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="font-bold menu-horizontal px-1">{links}</ul>
                </div>
                <div className="navbar-end hidden lg:flex gap-3">
                    <button onClick={toggleTheme} className="text-3xl">
                        {isDarkMode ? (
                            <span className="text-yellow-600">
                                <BiSun />
                            </span>
                        ) : (
                            <MdOutlineDarkMode />
                        )}
                    </button>

                    {user && user?.email ? (
                        <div className="flex gap-3 items-center justify-center">
                            <div className="w-12 h-12 bg-card_bg rounded-full flex justify-center items-center">
                                <img
                                    data-tooltip-id="my-tooltip-2"
                                    className="w-10 h-10 rounded-full"
                                    src={user?.photoURL}
                                    alt=""
                                />
                            </div>
                            <ReactTooltip
                                id="my-tooltip-2"
                                place="bottom"
                                variant="info"
                                content={user?.displayName}
                            />
                            <Link
                                onClick={logOut}
                                className="btn bg-[#050b36] hover:bg-[#e1d1e8] px-6 text-white hover:text-black hover:font-bold text-lg font-semibold rounded-xl"
                            >
                                Logout <BiLogOut />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link
                                to="/auth/signIn"
                                className="btn bg-white border border-gray-400 rounded-xl text-lg font-semibold hover:bg-[#acb3e3] hover:border-white hover:text-black hover:font-bold"
                            >
                                Sign In <BiLogIn />
                            </Link>
                            <Link
                                to="/auth/signup"
                                className="btn bg-[#050b36] hover:bg-[#e1d1e8] px-6 text-white hover:text-black hover:font-bold text-lg font-semibold rounded-xl"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
