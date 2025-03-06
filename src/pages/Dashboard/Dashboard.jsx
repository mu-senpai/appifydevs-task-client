import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setLoading, setUser } from "../../features/userSlice";
import { handleSignOut, onAuthStateChangedListener } from "../../firebase/firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import axios from "axios";
import "./dashboard.css"
import Navbar from "../../components/Navbar/Navbar";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chats, setChats] = useState([]);
    const dispatch = useDispatch();
    const { userInfo, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();

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


    useEffect(() => {
        axios.get(`http://localhost:5000/chats/${userInfo?.uid}`)
            .then(response => setChats(response.data))
            .catch(error => console.error("Error fetching chats", error));
    }, [userInfo]);

    const handleNewChat = () => {
        const newChat = { userId: userInfo?.uid, title: 'New Chat' };
        axios.post('http://localhost:5000/chats', newChat)
            .then(response => {
                setChats([...chats, newChat]);
                navigate(`/dashboard/chat/${response.data.insertedId}`);
            });
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
        <div className="w-full min-h-screen">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} chats={chats} onNewChat={handleNewChat}></Sidebar>

            {/* Main Content */}
            <div className="w-full h-full flex flex-col lg:pl-72">

                {/* Top Navbar */}
                <Navbar userInfo={userInfo} handleLogout={handleLogout} toggleSidebar={toggleSidebar}></Navbar>

                {/* Content Area */}
                <div className="w-full flex-grow">
                    <section className="w-full h-full z-10">
                        <Outlet />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;