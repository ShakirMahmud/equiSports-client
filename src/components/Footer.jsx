import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaLinkedin, FaPortrait } from 'react-icons/fa'; 

const Footer = () => {
    return (
        <footer className="bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText">
            <div className="container p-6 mx-auto">
                <div className="lg:flex justify-between">
                    {/* Brand and Description */}
                    <div className="w-full -mx-6 lg:w-2/5">
                        <div className="px-6">
                            <Link to="/" className="text-2xl font-bold flex items-center gap-0">
                                <span className="border-b-4 border-black dark:border-white">
                                    <span className="border-b-4 border-black dark:border-white italic dark:text-white">Equi</span>
                                </span>
                                <span className="font-semibold text-gray-500 dark:text-gray-400 italic">Sports</span>
                            </Link>

                            <p className="max-w-sm mt-4 text-subtitleText dark:text-gray-300">
                                Your ultimate destination for premium sports equipment and gear.
                            </p>

                            {/* Social Links */}
                            <div className="flex mt-6 space-x-4">
                                <a
                                    href="https://www.linkedin.com/in/shakirmahmud9/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl text-gray-600 dark:text-gray-300 hover:text-[#0077B5] transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin />
                                </a>
                                <a
                                    href="https://www.facebook.com/shakir.mahmud.9/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl text-gray-600 dark:text-gray-300 hover:text-[#1877F2] transition-colors"
                                    aria-label="Facebook"
                                >
                                    <FaFacebook />
                                </a>
                                <a
                                    href="https://github.com/ShakirMahmud"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl text-gray-600 dark:text-gray-300 hover:text-[#333] transition-colors"
                                    aria-label="Github"
                                >
                                    <FaGithub />
                                </a>
                                <a
                                    href="https://shakir-portfolio.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl text-gray-600 dark:text-gray-300 hover:text-accentColor transition-colors"
                                    aria-label="Portfolio"
                                >
                                    <FaPortrait />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-6 lg:mt-0 lg:flex-1">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 self-end">
                            <div className='self-end'>
                                <h3 className="text-lg font-bold uppercase mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link 
                                            to="/allSportsEquipment" 
                                            className="text-subtitleText hover:text-lightText dark:hover:text-darkText transition-colors"
                                        >
                                            All Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/addEquipment" 
                                            className="text-subtitleText hover:text-lightText dark:hover:text-darkText transition-colors"
                                        >
                                            Add Equipment
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/myEquipmentList" 
                                            className="text-subtitleText hover:text-lightText dark:hover:text-darkText transition-colors"
                                        >
                                            My Equipment
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold uppercase mb-4">Account</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link 
                                            to="/auth/signIn" 
                                            className="text-subtitleText hover:text-lightText dark:hover:text-darkText transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/auth/signUp" 
                                            className="text-subtitleText hover:text-lightText dark:hover:text-darkText transition-colors"
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold uppercase mb-4">Contact</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a 
                                            href="mailto:shakirmahmud50@gmail.com" 
                                            className="text-subtitleText hover:text-lightText dark:hover:text-darkText transition-colors"
                                        >
                                            Email
                                        </a>
                                    </li>
                                    <li>
                                        <a 
                                            href="tel:+8801521304950" 
                                            className="text-subtitleText hover:text-lightText dark:hover:text-darkText transition-colors"
                                        >
                                            Phone
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

                <div className="text-center">
                    <p className="text-subtitleText">
                        © {new Date().getFullYear()} EquiSports - All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;