import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaUser,
    FaSignOutAlt,
    FaBars,
    FaHandHoldingMedical,
    FaChartBar,
    FaPlus,
    FaClipboardList,
    FaMoneyCheckAlt,
    FaTasks,
    FaEdit
} from "react-icons/fa";
import "./dashboard.css"
import Sidebar from "../components/Sidebar/Sidebar";
import axios from "axios";
// import { AuthContext } from "../../providers/AuthProvider";
// import { useQuery } from "@tanstack/react-query";
// import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
// import Swal from "sweetalert2";
// import LoadingPage from "../../components/LoadingPage/LoadingPage";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chats, setChats] = useState([]);
    // const { user, logOut, isDarkMode, toggleDarkMode, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/chats')
            .then(response => setChats(response.data))
            .catch(error => console.error("Error fetching chats", error));
    }, []);

    const handleNewChat = () => {
        const newChat = { userId: user.id, title: 'New Chat' };
        axios.post('http://localhost:5000/chats', newChat)
            .then(response => {
                setChats([...chats, newChat]);
                navigate(`/chat/${response.data.insertedId}`);
            });
    };

    // const { data: userData = {}, refetch } = useQuery({
    //     queryKey: ["userProfile", user?.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/users/${user?.email}`);
    //         refetch();
    //         return res.data;
    //     },
    //     enabled: !!user?.email,
    // });

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // const handleLogout = () => {
    //     logOut()
    //         .then(() => {
    //             setTimeout(() => {
    //                 navigate('/');
    //             }, 5);
    //         })
    //         .catch((error) => {
    //             Swal.fire({
    //                 title: 'Error!',
    //                 text: `${error.code}`,
    //                 icon: 'error',
    //                 confirmButtonText: 'Close'
    //             })
    //         });
    // }

    // if (loading) {
    //     return <LoadingPage></LoadingPage>
    // }

    return (
        <div className="w-full h-full min-h-screen">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} chats={chats} onNewChat={handleNewChat}></Sidebar>

            {/* Main Content */}
            <div className="w-full h-full flex flex-col lg:pl-72">
                {/* Top Navbar */}
                <div className="w-full bg-[#faf9fa] sticky top-0 z-40">
                    <div className="w-[95%] mx-auto navbar">
                        <div className="flex items-center">
                            <Link to="/" className="lg:hidden inline-flex items-center">
                                <img src="/echogpt-logo.svg" className="w-10 mr-3" alt="EchoGPT" />
                                <h2 className="relative text-[#713cf4] text-2xl tracking-[10px] font-bold lg:hidden" data-text="EchoGPT">EchoGPT</h2>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2 lg:space-x-4 ml-auto">
                            
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </div>

                            {/* <button onClick={() => { handleLogout(); setIsSidebarOpen(false) }} className="flex cursor-pointer items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaSignOutAlt className="mr-3" /> Logout
                            </button> */}
                            <button className="btn btn-sm btn-ghost btn-circle lg:hidden text-2xl" onClick={toggleSidebar}>
                                <FaBars color="#000000" size={15} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="w-full h-full relative">
                    <section className="w-full h-full z-10">
                        <Outlet />
                    </section>
                </div>
            </div>
            {/* <ScrollToTop></ScrollToTop> */}
        </div>
    );
};

export default Dashboard;
