import React from 'react';
import { FaBars, FaGoogle, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({userInfo, handleLogout, toggleSidebar}) => {
    return (
        <div className="w-full bg-[#faf9fa] sticky top-0 z-40">
            <div className="w-[95%] mx-auto navbar">
                <div className="flex items-center">
                    <Link to="/dashboard" className="lg:hidden inline-flex items-center">
                        <img src="/echogpt-logo.svg" className="w-10 mr-3" alt="EchoGPT" />
                        <h2 className="relative text-[#713cf4] text-2xl tracking-[10px] font-bold lg:hidden" data-text="EchoGPT">EchoGPT</h2>
                    </Link>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-4 ml-auto">

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt={userInfo?.name}
                                    src={userInfo?.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-fit p-2 shadow space-y-2">
                            <li>
                                <p className="inline-flex items-center">
                                    <FaUser /> {userInfo?.name}
                                </p>
                            </li>
                            <li>
                                <p disabled className="inline-flex items-center">
                                    <FaGoogle /> {userInfo?.email}
                                </p>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="btn btn-sm btn-error text-white border-none inline-flex items-center">
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-sm btn-ghost btn-circle lg:hidden text-2xl" onClick={toggleSidebar}>
                        <FaBars color="#000000" size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;