import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setLoading, setUser } from "../../features/userSlice";
import { handleSignOut, onAuthStateChangedListener } from "../../firebase/firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import axios from "axios";
import "./dashboard.css"

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chats, setChats] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(setLoading());

        const unsubscribe = onAuthStateChangedListener((userAuth) => {
            if (userAuth) {
                dispatch(setUser({
                    name: userAuth.displayName,
                    email: userAuth.email,
                    photoURL: userAuth.photoURL,
                    uid: userAuth.uid,
                }));
            } else {
                dispatch(clearUser());
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [dispatch, navigate]);

    const { chatData = [], refetch } = useQuery({
        queryKey: ["chatData", userInfo?.uid],
        queryFn: async () => {
            const res = await axios.get(`https://echogpt-server.vercel.app/chats/${userInfo?.uid}`);
            setChats(res.data);
            return res.data;
        },
        enabled: !!userInfo?.uid,
    });

    const handleNewChat = () => {
        const newChat = { userId: userInfo?.uid, title: 'New Chat' };
        axios.post('https://echogpt-server.vercel.app/chats', newChat)
            .then(response => {
                refetch();
                navigate(`/dashboard/chat/${response.data.insertedId}`);
            });
    };

    const handleDeleteChat = (chatId) => {
        axios.delete(`https://echogpt-server.vercel.app/chats/${chatId}`)
            .then(() => {
                refetch();
                navigate('/dashboard');
            })
            .catch(error => console.error("Error deleting chat", error));
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = async () => {
        await handleSignOut();
        dispatch(clearUser());
        navigate('/');
    };

    if (loading) {
        return <LoadingPage></LoadingPage>
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-screen">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} chats={chats} onNewChat={handleNewChat} onDeleteChat={handleDeleteChat}></Sidebar>

            {/* Main Content */}
            <div className="w-full h-full flex flex-col lg:pl-72">

                {/* Top Navbar */}
                <Navbar userInfo={userInfo} handleLogout={handleLogout} toggleSidebar={toggleSidebar}></Navbar>

                {/* Content Area */}
                <div className="w-full relative flex-grow">
                    <section className="w-full h-full z-10">
                        <Outlet context={{ refetch, handleNewChat }} />
                    </section>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;