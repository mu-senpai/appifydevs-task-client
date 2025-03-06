import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

const ChatBox = () => {
    const { userInfo } = useSelector((state) => state.user);
    const { chatId } = useParams();

    const location = useLocation();
    const { chatTitle } = location.state || {};

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Function to handle sending a message
    const handleSend = async () => {
        if (!newMessage.trim()) return;

        const userMessage = { content: newMessage, role: 'user', timestamp: new Date() };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage(""); // Clear the input field

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
                await axios.post('http://localhost:5000/messages', {
                    chatId: chatId,
                    userId: userInfo.uid,
                    content: userMessage.content,
                    role: 'user',
                });

                await axios.post('http://localhost:5000/messages', {
                    chatId: chatId,
                    userId: userInfo.uid,
                    content: aiMessage,
                    role: 'assistant',
                });
            }

        } catch (error) {
            console.error('Error communicating with EchoGPT:', error);
        } finally {
            setIsTyping(false);
        }
    };

    const fetchEchoGPTResponse = async (messages) => {

        const messagesPayload = messages.length > 0 ? [...messages].reverse() : [{ role: 'system', content: "Explain the contents like you're an helpful assistant." }, ...[...messages].reverse()];

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

    useEffect(() => {
        if (chatId) {
            const fetchMessages = async () => {
                try {
                    const result = await axios.get(`http://localhost:5000/messages/${chatId}`);
                    setMessages(result.data);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };
            fetchMessages();
        }
    }, [chatId]);

    return (
        <div className="flex flex-col h-full relative">
            <div className="flex-grow mb-4 overflow-y-auto pt-6 md:pt-10 px-6 md:px-10 pb-24">
                <h3 className='text-2xl text-gray-500 font-semibold mb-8'>{'Chat > ' + chatTitle}</h3>
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
                        placeholder="Type a message..."
                        className="w-full lg:w-[calc(100%-21.5rem)] join-item p-3 rounded-l-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSend}
                        className="p-3 join-item bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
