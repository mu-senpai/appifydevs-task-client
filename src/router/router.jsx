import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import ChatBox from "../pages/Dashboard/ChatBox";
import EchoGPTCard from "../pages/Dashboard/EchoGPTCard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "",
                element: <EchoGPTCard />
            },
            {
                path: "chat/:chatId",
                element: <ChatBox />,
            }
        ]
    }
]);

export default router;