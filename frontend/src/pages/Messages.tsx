import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios"; // Adjust the path as needed
import ChatPage from './ChatPage'; // Import your ChatPage component

const Messages = () => {
    const { data: connections } = useQuery({
        queryKey: ["connections"],
        queryFn: () => axiosInstance.get("/connections"), // Fetch your connections here
    });

    const [recipientId, setRecipientId] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleUserChatClick = (id) => {
        setRecipientId(id);
        setIsChatOpen(true);
    };

    const closeChat = () => {
        setIsChatOpen(false);
        setRecipientId(null);
    };

    return (
        <div className="flex max-h-screen">
            {/* Left Side - Connection Names */}
            <div className="w-1/4 h-[80vh] bg-gray-100 border-r p-4 overflow-y-auto ">
                <h2 className="text-2xl font-semibold mb-4">Connections</h2>
                <div className="space-y-2">
                    {connections?.data?.map((connection) => (
                        <div
                            key={connection._id}
                            className="p-2 hover:bg-gray-200 rounded cursor-pointer"
                            onClick={() => handleUserChatClick(connection._id)} // Open chat on click
                        >
                            {connection.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side - Chat Box */}
            <div className="w-3/4 p-4 overflow-y-auto h-full">
                {isChatOpen ? (
                    <ChatPage recipientId={recipientId} onClose={closeChat} />
                ) : (
                    <div className="text-center text-gray-500">
                        <h3 className="text-lg">Select a user to start chatting!</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
