import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';
import './chat.css';

const ChatPage = ({ recipientId, onClose }) => {
    const [message, setMessage] = useState("");
    const queryClient = useQueryClient();
    const messagesEndRef = useRef(null); // Ref for scrolling to the bottom

    // Fetch chat history
    const { data: messages, isLoading, error } = useQuery({
        queryKey: ["chatHistory", recipientId],
        queryFn: () => axiosInstance.get(`/chat/${recipientId}`),
        enabled: !!recipientId,
        onSuccess: (data) => {
            console.log("Chat history fetched successfully", data);
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Failed to fetch chat history");
        },
    });

    // Mutation to send a new message
    const mutation = useMutation({
        mutationFn: (newMessage) => {
            return axiosInstance.post("/chat/send", newMessage, {
                headers: { "Content-Type": "application/json" },
            });
        },
        onSuccess: (data) => {
            toast.success("Message sent successfully");
            queryClient.invalidateQueries(["chatHistory", recipientId]);
            setMessage(""); // Clear the input field
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Failed to send message");
        },
    });

    // Handle sending the message
    const handleSendMessage = () => {
        if (message.trim()) {
            console.log("send message", recipientId);
            mutation.mutate({ recipientId, content: message });
        }
    };

    // Scroll to the bottom of messages when they change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="chatbox">
            <div className="chat-header">
                <button onClick={onClose}>Close Chat</button>
            </div>
            <div className="chat-messages">
                {isLoading ? (
                    <p>Loading messages...</p>
                ) : error ? (
                    <p>Error loading messages: {error.message}</p>
                ) : messages && messages.data ? (
                    messages.data.map((msg) => (
                        <div key={msg._id} className={`message ${msg.sender === recipientId ? 'received' : 'sent'}`}>
                            <span className="content">{msg.content}</span>
                            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                    ))
                ) : (
                    <p>No messages yet.</p>
                )}
                {/* This ref will help in scrolling to the bottom */}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
