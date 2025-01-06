import { BiLogOut } from "react-icons/bi";
import { MdOutlineDarkMode } from "react-icons/md";
import { BiSun } from "react-icons/bi";
import { Tooltip as ReactTooltip, Tooltip } from "react-tooltip";
import { BiLogIn } from "react-icons/bi";
import React, { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";

const NavBar = () => {
    const { user, logOut, loading, contactRef } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (ref) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                if (ref?.current) {
                    ref.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        } else if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinkStyle = ({ isActive }) => 
        `transition-all duration-300 ease-in-out ${
            isActive 
            ? 'text-accentColor border-b-2 border-accentColor' 
            : 'hover:text-accentColor hover:border-b-2 hover:border-accentColor'
        } pb-1`;

    const links = (
        <div className={`flex flex-col lg:flex-row gap-6 items-center ${isDarkMode ? 'text-darkText' : 'text-lightText'}`}>
            <li>
                <NavLink to="/" className={navLinkStyle}>Home</NavLink>
            </li>
            <li>
                <NavLink to="/allSportsEquipment" className={navLinkStyle}>
                    All Sports Equipment
                </NavLink>
            </li>
            {user?.email && (
                <>
                    <li>
                        <NavLink to="/addEquipment" className={navLinkStyle}>
                            Add Equipment
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/myEquipmentList" className={navLinkStyle}>
                            My Equipment List
                        </NavLink>
                    </li>
                </>
            )}
            <li>
                <button onClick={() => scrollToSection(contactRef)} className={navLinkStyle}>
                    Contact
                </button>
            </li>
        </div>
    );

    return (
        <div className={`w-full shadow-md ${
            isDarkMode 
            ? 'bg-navDarkBg border-b border-gray-700' 
            : 'bg-navLightBg border-b border-gray-200'
        }`}>
            <div className="container mx-auto px-4 py-4">
                {/* Mobile View */}
                <div className="lg:hidden">
                    <div className="flex justify-between items-center mb-4">
                        {/* Mobile Menu Dropdown */}
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className={`btn btn-ghost ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul tabIndex={0} className={`menu dropdown-content z-[1] p-2 shadow rounded-box w-52 ${
                                isDarkMode ? 'bg-darkCard text-darkText' : 'bg-white text-lightText'
                            }`}>
                                {links}
                            </ul>
                        </div>

                        {/* Logo */}
                        <Link to="/" className="text-2xl font-bold flex items-center">
                            <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Equi</span>
                            <span className="text-gray-500">Sports</span>
                        </Link>

                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleTheme} 
                            className={`text-2xl ${isDarkMode ? 'text-yellow-400' : 'text-gray-700'}`}
                        >
                            {isDarkMode ? <BiSun /> : <MdOutlineDarkMode />}
                        </button>
                    </div>

                    {/* Mobile Auth Section */}
                    <div className="flex justify-center">
                        {loading ? (
                            <span className="loading loading-spinner loading-md"></span>
                        ) : user?.email ? (
                            <div className="flex items-center gap-4">
                                <img 
                                    src={user.photoURL} 
                                    alt="Profile" 
                                    className="w-10 h-10 rounded-full border-2 border-accentColor"
                                />
                                <button 
                                    onClick={logOut}
                                    className={`btn btn-sm ${
                                        isDarkMode 
                                        ? 'bg-darkBtn text-darkBtnText hover:bg-darkBtnHover' 
                                        : 'bg-lightBtn text-black hover:bg-lightBtnHover'
                                    }`}
                                >
                                    Logout <BiLogOut />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <Link 
                                    to="/auth/signIn" 
                                    className={`btn btn-sm ${
                                        isDarkMode 
                                        ? 'bg-transparent border-darkBtn text-darkBtn hover:bg-darkBtn hover:text-white' 
                                        : 'bg-transparent border-lightBtn text-lightBtn hover:bg-lightBtn hover:text-white'
                                    }`}
                                >
                                    Sign In <BiLogIn />
                                </Link>
                                <Link 
                                    to="/auth/signup" 
                                    className={`btn btn-sm ${
                                        isDarkMode 
                                        ? 'bg-darkBtn text-darkBtnText hover:bg-darkBtnHover' 
                                        : 'bg-lightBtn text-black hover:bg-lightBtnHover'
                                    }`}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-3xl font-bold flex items-center">
                        <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Equi</span>
                        <span className="text-gray-500">Sports</span>
                    </Link>

                    {/* Navigation Links */}
                    <ul className="flex items-center gap-6">
                        {links}
                    </ul>

                    {/* Desktop Auth and Theme Section */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleTheme} 
                            className={`text-2xl ${isDarkMode ? 'text-yellow-400' : 'text-gray-700'}`}
                        >
                            {isDarkMode ? <BiSun /> : <MdOutlineDarkMode />}
                        </button>

                        {loading ? (
                            <span className="loading loading-spinner loading-md"></span>
                        ) : user?.email ? (
                            <div className="flex items-center gap-4">
                                <img 
                                    src={user?.photoURL} 
                                    alt="Profile" 
                                    className="w-12 h-12 rounded-full border-2 border-accentColor"
                                    title={user?.displayName}
                                />
                                <button 
                                    onClick={logOut}
                                    className={`btn btn-sm ${
                                        isDarkMode ? 'bg-darkBtn text-darkBtnText hover:bg-darkBtnHover' 
                                        : 'bg-lightBtn text-black hover:bg-lightBtnHover'
                                    }`}
                                >
                                    Logout <BiLogOut />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <Link 
                                    to="/auth/signIn" 
                                    className={`btn btn-sm ${
                                        isDarkMode 
                                        ? 'bg-transparent border-darkBtn text-darkBtn hover:bg-darkBtn hover:text-white' 
                                        : 'bg-transparent border-lightBtn text-lightBtn hover:bg-lightBtn hover:text-white'
                                    }`}
                                >
                                    Sign In <BiLogIn />
                                </Link>
                                <Link 
                                    to="/auth/signup" 
                                    className={`btn btn-sm ${
                                        isDarkMode 
                                        ? 'bg-darkBtn text-darkBtnText hover:bg-darkBtnHover' 
                                        : 'bg-lightBtn text-black hover:bg-lightBtnHover'
                                    }`}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;