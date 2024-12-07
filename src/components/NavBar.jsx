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
    const { user, logOut, loading } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const links = (
        <div className={`flex flex-col lg:flex-row gap-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <li>
                <NavLink to="/" className="">Home</NavLink>
            </li>
            <li>
                <NavLink to="/allSportsEquipment" className="">All Sports Equipment</NavLink>
            </li>
            {user?.email && (
                <li>
                    <NavLink to="/addEquipment" className="">Add Equipment</NavLink>
                </li>
            )}
            {user?.email && (
                <li>
                    <NavLink to="/myEquipmentList" className="">My Equipment List</NavLink>
                </li>
            )}
        </div>
    );

    return (
        <div className="w-full border-b-2 border-gray-200 dark:border-gray-700">
            <div className="navbar py-4 w-4/5 mx-auto flex flex-col lg:flex-row">
                {/* MOBILE FIRST ROW */}
                <div className="w-full flex justify-between items-center lg:hidden">
                    {/* Dropdown for mobile */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost dark:text-white">
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
                            className="menu menu-sm dropdown-content bg-base-100 dark:bg-darkBg rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>

                    {/* Website Logo */}
                    <Link to="/" className="text-2xl font-bold flex items-center gap-0">
                        <span className="border-b-4 border-black dark:border-white">
                            <span className="border-b-4 border-black dark:border-white dark:text-white italic">Equi</span>
                        </span>
                        <span className="font-semibold text-gray-500 dark:text-gray-400 italic">Sports</span>
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
                    {loading ? (
                        <button
                            disabled
                            type="button"
                            className="text-black bg-[#5fbbc9] dark:bg-darkBtn font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
                        >
                            <svg
                                aria-hidden="true"
                                role="status"
                                className="inline w-4 h-4 me-3 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Loading...
                        </button>
                    ) : user && user.email ? (
                        <div className="flex gap-3 items-center justify-center">
                            <div className="w-12 h-12 bg-card_bg rounded-full flex justify-center items-center">
                                <img
                                    data-tooltip-id="my-tooltip-2"
                                    className="w-10 h-10 rounded-full"
                                    src={user?.photoURL}
                                    alt="User Profile"
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
                                className="btn bg-lightBtn hover:bg-lightBtnHover dark:bg-darkBtn hover:dark:bg-darkBtnHover px-6 text-black hover:text-black hover:font-bold text-lg font-semibold rounded-xl border-none'"
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
                                className="btn bg-[#5fbbc9] hover:bg-[#e1d1e8] px-6 text-black hover:text-black hover:font-bold text-lg font-semibold rounded-xl"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* DESKTOP VIEW */}
                <div className="navbar-start hidden lg:flex">
                    <Link to="/" className="text-3xl font-bold flex items-center gap-0">
                        <span className="border-b-4 border-black dark:border-white">
                            <span className="border-b-4 border-black dark:border-white italic dark:text-white">Equi</span>
                        </span>
                        <span className="font-semibold text-gray-500 dark:text-gray-400 italic">Sports</span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="font-bold menu-horizontal flex gap-5 text-lg">{links}</ul>
                </div>
                <div className="navbar-end hidden lg:flex items-center gap-5">
                    {/* Dark Mode Toggle */}
                    <button onClick={toggleTheme} className="text-2xl">
                        {isDarkMode ? (
                            <span className="text-yellow-600">
                                <BiSun />
                            </span>
                        ) : (
                            <MdOutlineDarkMode />
                        )}
                    </button>
                    {/* User Profile and Logout */}
                    {loading ? (
                        <button
                            disabled
                            type="button"
                            className="text-white bg-[#5fbbc9] dark:bg-darkBtn font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
                        >
                            <svg
                                aria-hidden="true"
                                role="status"
                                className="inline w-4 h-4 me-3 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Loading...
                        </button>
                    ) : user && user.email ? (
                        <div className="flex gap-3 items-center">
                            <div className="w-12 h-12 bg-card_bg rounded-full flex justify-center items-center">
                                <img
                                    data-tooltip-id="my-tooltip"
                                    className="w-10 h-10 rounded-full"
                                    src={user?.photoURL}
                                    alt="User Profile"
                                />
                            </div>
                            <ReactTooltip id="my-tooltip" place="bottom" variant="info" content={user?.displayName} />
                            <Link
                                onClick={logOut}
                                className="btn bg-lightBtn hover:bg-lightBtnHover dark:bg-darkBtn hover:dark:bg-darkBtnHover px-6 text-black hover:text-black hover:font-bold text-lg font-semibold rounded-xl"
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
                                className="btn bg-[#5fbbc9] hover:bg-[#e1d1e8] px-6 text-black hover:text-black hover:font-bold text-lg font-semibold rounded-xl"
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
