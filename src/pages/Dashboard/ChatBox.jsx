import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';

const ChatBox = () => {
    const { userInfo } = useSelector((state) => state.user);
    const { chatId } = useParams();
    const { refetch } = useOutletContext();
    const location = useLocation();

    const [chatDetails, setChatDetails] = useState({});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Function to handle sending a message
    const handleSend = async () => {
        if (!newMessage.trim()) return;

        const userMessage = { content: newMessage, role: 'user', timestamp: new Date() };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage("");

        setIsTyping(true);

        try {
            // Prepare all previous messages for the API request
            const allMessages = messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
            }));

            // Add the current user message to the conversation
            allMessages.push({ role: 'user', content: newMessage });

            const aiMessage = await fetchEchoGPTResponse(allMessages);

            if (aiMessage) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { content: aiMessage, role: 'assistant', timestamp: new Date() },
                ]);

                // Store the user and assistant messages in the database (send them to your server)
                await axios.post('https://echogpt-server.vercel.app/messages', {
                    chatId: chatId,
                    userId: userInfo.uid,
                    content: userMessage.content,
                    role: 'user',
                });

                await axios.post('https://echogpt-server.vercel.app/messages', {
                    chatId: chatId,
                    userId: userInfo.uid,
                    content: aiMessage,
                    role: 'assistant',
                });

                if (messages.length === 0) {
                    await axios.patch(`https://echogpt-server.vercel.app/chats/${chatId}`, {
                        title: newMessage,
                    });
                    setChatDetails((prevDetails) => ({ ...prevDetails, title: newMessage }));
                    refetch();
                }
            }
            scrollToBottom();

        } catch (error) {
            console.error('Error communicating with EchoGPT:', error);
        } finally {
            setIsTyping(false);
        }
    };

    const fetchEchoGPTResponse = async (messages) => {

        const messagesPayload = messages.length > 0 ? [...messages].reverse() : [{ role: 'system', content: "Explain the contents like you're an helpful assistant." }, ...messages];

        try {
            const response = await axios.post('https://api.echogpt.live/v1/chat/completions', {
                messages: messagesPayload,
                model: "EchoGPT"
            }, {
                headers: { 'x-api-key': import.meta.env.VITE_ECHOGPT_API_KEY },
            });

            console.log(response.data);
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error fetching ChatGPT response:', error);
        }
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            await handleSend();
        }
    };

    useEffect(() => {
        if (chatId) {
            const fetchChatData = async () => {
                try {
                    const result = await axios.get(`https://echogpt-server.vercel.app/chatdetails/${chatId}`);
                    setChatDetails(result.data);
                } catch (error) {
                    console.error('Error fetching chat data:', error);
                }
            };

            const fetchMessages = async () => {
                try {
                    const result = await axios.get(`https://echogpt-server.vercel.app/messages/${chatId}`);
                    setMessages(result.data);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };

            fetchChatData();
            fetchMessages();
        }
    }, [chatId]);

    return (
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full relative">
            <div className="flex-grow mb-4 overflow-y-auto pt-6 md:pt-10 px-6 md:px-10 pb-24">
                <h3 className='text-2xl text-gray-500 font-semibold mb-8'>{'Chat > ' + chatDetails?.title}</h3>
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
                        <div className={`inline-block p-3 rounded-lg max-w-xs overflow-auto text-wrap ${msg.role === 'user' ? 'bg-[#713cf4] text-white' : 'bg-gray-200 text-black'}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="text-center text-gray-500">EchoGPT is typing...</div>
                )}
            </div>
            <div className="w-full px-6 md:px-10 py-6 bg-white fixed bottom-0">
                <div className='w-full join'>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="w-full lg:w-[calc(100%-21.5rem)] join-item p-3 rounded-l-lg bg-white border border-gray-300 focus:outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className="btn p-3 join-item bg-[#713cf4] hover:bg-[#713cf4] text-white rounded-r-lg focus:outline-none"
                    >
                        Send
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ChatBox;
