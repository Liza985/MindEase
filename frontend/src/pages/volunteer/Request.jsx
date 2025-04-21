import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import VolHeader from "../../components/VolHeader";

export const Request = () => {
  const navigate = useNavigate();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get volunteer info from Redux store or localStorage
  const { id: volunteerId, firstName, lastName } = useSelector(state => state.volunteer) || {};
  const volunteerName = `${firstName || ''} ${lastName || ''}`.trim() || "Volunteer";

  // Connect to socket server when component mounts
  useEffect(() => {
    // Only connect if we have a volunteer ID (user is logged in)
    if (volunteerId) {
      const newSocket = io("http://localhost:8080");
      setSocket(newSocket);

      // Handle socket connection events
      newSocket.on("connect", () => {
        setIsConnected(true);
        console.log("Socket connected");
      });

      newSocket.on("disconnect", () => {
        setIsConnected(false);
        console.log("Socket disconnected");
      });

      // Cleanup on unmount
      return () => {
        if (newSocket) newSocket.disconnect();
      };
    } else {
      setLoading(false);
    }
  }, [volunteerId]);

  // Register volunteer and listen for chats when socket connects
  useEffect(() => {
    if (socket && isConnected && volunteerId) {
      // Register the volunteer with the socket server
      socket.emit("register_volunteer", { 
        volunteerId, 
        name: volunteerName 
      });
      
      console.log(`Registered volunteer: ${volunteerId} (${volunteerName})`);
      
      // Listen for registration confirmation
      socket.on("registration_success", (data) => {
        console.log("Registration successful:", data);
        setLoading(false);
      });

      // Listen for active chats and pending requests
      socket.on("active_chats", (activeChats) => {
        if (!activeChats || !Array.isArray(activeChats)) {
          console.error("Invalid active chats data:", activeChats);
          setLoading(false);
          return;
        }

        // Format chat data
        const formattedChats = activeChats.map(chat => ({
          id: chat.id,
          userId: chat.userId,
          name: chat.userName || "Anonymous User",
          topic: chat.topic || "No topic specified",
          time: formatTime(chat.createdAt || Date.now()),
          status: chat.volunteerId ? "assigned" : "pending"
        }));
        
        // Filter only pending requests
        const pending = formattedChats.filter(chat => chat.status === "pending");
        
        setPendingRequests(pending);
        setLoading(false);
        
        console.log(`Received ${pending.length} pending requests`);
      });

      // Listen for new chat requests
      socket.on("new_chat_request", (chatRequest) => {
        console.log("New chat request received:", chatRequest);
        
        // Add to pending requests if it's new
        setPendingRequests(prev => {
          const exists = prev.some(req => req.id === chatRequest.chatId);
          if (exists) return prev;
          
          return [...prev, {
            id: chatRequest.chatId,
            userId: chatRequest.userId,
            name: chatRequest.userName || "Anonymous User",
            topic: chatRequest.message || "New chat request",
            time: formatTime(chatRequest.timestamp || Date.now()),
            status: "pending"
          }];
        });
      });

      // Listen for chat assigned confirmation
      socket.on("chat_assigned", (data) => {
        console.log("Chat assigned:", data);
        
        // Remove from pending requests
        setPendingRequests(prev => prev.filter(req => req.id !== data.chatId));
      });

      // Listen for chat rejection confirmation
      socket.on("chat_rejected", (data) => {
        console.log("Chat rejected:", data);
        
        // Remove from pending requests
        setPendingRequests(prev => prev.filter(req => req.id !== data.chatId));
      });

      // Return cleanup function
      return () => {
        socket.off("registration_success");
        socket.off("active_chats");
        socket.off("new_chat_request");
        socket.off("chat_assigned");
        socket.off("chat_rejected");
      };
    }
  }, [socket, isConnected, volunteerId, volunteerName]);

  // Format timestamp to readable format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // Today
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    // Within the last week
    const lastWeek = new Date(now);
    lastWeek.setDate(now.getDate() - 7);
    if (date > lastWeek) {
      return date.toLocaleDateString([], { weekday: 'long' });
    }
    
    // Other
    return date.toLocaleDateString();
  };

  // Handle accepting a chat request
  const handleAccept = (chatId) => {
    if (socket) {
      console.log("Emitting accept_chat with chatId:", chatId, "volunteerId:", volunteerId);
      
      // Send accept request to server
      socket.emit("accept_chat", {
        chatId,
        volunteerId
      });
      
      // Update UI immediately for better UX
      setPendingRequests(prev => 
        prev.map(req => 
          req.id === chatId ? { ...req, status: "accepting" } : req
        )
      );
      
      // Navigate to chat page after a short delay
      setTimeout(() => {
        navigate("/volunteer/chat");
      }, 1000);
    }
  };

  // Handle rejecting a chat request
  const handleReject = (chatId) => {
    if (socket) {
      console.log("Emitting reject_chat with chatId:", chatId, "volunteerId:", volunteerId);
      
      // Send reject request to server
      socket.emit("reject_chat", {
        chatId,
        volunteerId
      });
      
      // Update UI immediately for better UX
      setPendingRequests(prev => 
        prev.map(req => 
          req.id === chatId ? { ...req, status: "rejecting" } : req
        )
      );
      
      // Remove from list after a short delay
      setTimeout(() => {
        setPendingRequests(prev => prev.filter(req => req.id !== chatId));
      }, 1000);
    }
  };

  // If not logged in, redirect to login
  if (!volunteerId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-orange-100">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login Required</h2>
          <p className="text-gray-600 text-center mb-8">Please login to access the chat request functionality</p>
          <div 
            onClick={() => navigate("/volunteer/login")}
            className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl text-center font-medium shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-300 cursor-pointer"
          >
            Go to Login
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <VolHeader />
      <div className="min-h-screen bg-gray-50">
        <div className="flex-1 max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold p-6 pt-8 text-gray-800">
            Chat Requests
          </h1>

          <main className="p-6 pt-0">
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-8 flex justify-center items-center">
                <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-3 text-gray-600">Loading requests...</span>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-orange-100 bg-orange-50">
                  <h2 className="text-xl font-semibold text-orange-700">
                    Pending Requests {pendingRequests.length > 0 && `(${pendingRequests.length})`}
                  </h2>
                </div>

                <div className="divide-y divide-orange-100">
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((request) => (
                      <div
                        key={request.id}
                        className={`p-4 ${
                          request.status === "accepting"
                            ? "bg-green-50"
                            : request.status === "rejecting"
                            ? "bg-red-50"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-lg">{request.name}</h3>
                            <p className="text-gray-600">{request.topic}</p>
                            <p className="text-sm text-gray-500">{request.time}</p>
                          </div>
                          <div className="space-x-2">
                            {request.status === "pending" ? (
                              <>
                                <button
                                  onClick={() => handleAccept(request.id)}
                                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleReject(request.id)}
                                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <span
                                className={`px-3 py-1 rounded text-white ${
                                  request.status === "accepting"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              >
                                {request.status === "accepting"
                                  ? "Accepting..."
                                  : "Rejecting..."}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-lg font-medium">No pending requests</p>
                      <p className="mt-1">All chat requests have been processed</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      <footer className="bg-white shadow-sm border-t border-gray-200 p-4 text-center text-black-800">
        <p className="text-sm">
          &copy; 2025 MindEaseConnect. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Request;