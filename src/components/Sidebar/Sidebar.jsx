import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, toggleSidebar, chats, onNewChat }) => {

    const navigate = useNavigate();

    return (
        <div
            className={`fixed top-0 z-50 h-screen bg-[#f7f5ff] text-black w-full sm:w-80 lg:w-72 transform ${isSidebarOpen && window.innerWidth < 1024 ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform duration-300`}
        >
            <div className="flex items-center justify-between mt-1 mb-10 pt-5 px-5">
                <Link to="/" className="hidden lg:flex items-center gap-2">
                    <img src="/echogpt-logo.svg" className="w-10 mr-3" alt="EchoGPT" />
                    <h2 className="relative text-[#713cf4] text-2xl tracking-[10px] font-bold" data-text="EchoGPT">
                        EchoGPT
                    </h2>
                </Link>
                <div className="lg:hidden flex items-center">
                    <img src="/echogpt-logo.svg" className="w-10 mr-3" alt="EchoGPT" />
                    <h2 className="relative text-[#713cf4] text-2xl tracking-[10px] font-bold" data-text="EchoGPT">EchoGPT</h2>
                </div>
                <button
                    className="btn btn-ghost btn-circle lg:hidden text-black text-2xl"
                    onClick={() => { toggleSidebar(); onNewChat(); }}
                >
                    ✕
                </button>
            </div>

            <div className='px-5'>
                <button className="btn btn-outline rounded-2xl text-[#713cf4] border-gray-300 hover:text-white hover:border-[#713cf4] hover:bg-[#713cf4] w-full">
                    <FaEdit className="scale-150" /> New Chat
                </button>
            </div>

            <div className="mt-6 overflow-y-auto h-[calc(100%-4rem)] px-5">
                <p className="text-[#713cf4] font-semibold mb-3">Chat History</p>
                <ul className='space-y-2'>
                    {chats.map((chat) => (
                        <li key={chat._id} className="my-2">
                            <button onClick={() => navigate(`/chat/${chat._id}`)} className="w-full btn btn-ghost rounded-2xl hover:bg-[#713cf4]/[0.1] text-black">
                                {chat.title.length > 20 ? `${chat.title.substring(0, 20)}...` : chat.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;