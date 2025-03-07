import { IoChatboxEllipsesSharp } from 'react-icons/io5';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, toggleSidebar, chats, onNewChat, onDeleteChat }) => {

    const navigate = useNavigate();

    return (
        <div
            className={`fixed top-0 z-50 h-screen bg-[#f7f5ff] text-black w-full sm:w-80 lg:w-72 transform ${isSidebarOpen && window.innerWidth < 1024 ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform duration-300`}
        >
            <div className="flex items-center justify-between mt-1 mb-10 pt-5 px-5">
                <Link to="/dashboard" className="hidden lg:flex items-center gap-2">
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
                    onClick={toggleSidebar}
                >
                    ✕
                </button>
            </div>

            <div className='px-5'>
                <button onClick={() => { onNewChat(); toggleSidebar(); }} className="btn btn-outline rounded-2xl text-[#713cf4] border-gray-300 hover:text-white hover:border-[#713cf4] hover:bg-[#713cf4] w-full">
                    <IoChatboxEllipsesSharp className="scale-150" /> New Chat
                </button>
            </div>

            <div className="mt-6 overflow-y-auto h-[calc(100%-4rem)] px-5 pb-5">
                {
                    chats.length > 0 && (
                        <p className="text-[#713cf4] font-semibold mb-3">Chat History</p>
                    ) 
                }
                <ul className='space-y-2'>
                    {chats.map((chat, idx) => (
                        <li key={idx}>
                            <div className='flex items-center justify-between hover:bg-[#713cf4]/[0.1] rounded-2xl px-4 py-2 cursor-pointer text-sm'>

                                <p className='flex-grow' onClick={() => { navigate(`/dashboard/chat/${chat._id}`); toggleSidebar(); }}>
                                    {chat.title.length > 20 ? `${chat.title.substring(0, 20)}...` : chat.title}
                                </p>

                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-xs btn-ghost hover:bg-black/[0.05] text-black"><BsThreeDotsVertical /></div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-28 p-2 shadow space-y-2">
                                        <li className='w-full text-center hover:bg-black/5 rounded-md p-1' onClick={() => { onDeleteChat(chat._id); toggleSidebar(); }}>Delete Chat</li>
                                    </ul>
                                </div>
                                {/* <button onClick={() => onDeleteChat(chat._id)} className='btn btn-xs btn-ghost hover:bg-black/[0.05] text-red-400'><FaTrash /></button> */}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;