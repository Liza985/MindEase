// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import VolHeader from "../../components/VolHeader";
      
// export const Chat = () => {
//   const [socket, setSocket] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isConnected, setIsConnected] = useState(false);
  
//   // Get volunteer info from Redux store or localStorage
//   const { id: volunteerId, firstName, lastName } = useSelector(state => state.volunteer) || {};
//   const volunteerName = `${firstName || ''} ${lastName || ''}`.trim() || "Volunteer";
  
//   const messageContainerRef = useRef(null);

//   // Connect to socket server when component mounts
//   useEffect(() => {
//     // Only connect if we have a volunteer ID (user is logged in)
//     if (volunteerId) {
//       const newSocket = io("http://localhost:8080");
//       setSocket(newSocket);

//       // Handle socket connection events
//       newSocket.on("connect", () => {
//         setIsConnected(true);
//         console.log("Socket connected");
//       });

//       newSocket.on("disconnect", () => {
//         setIsConnected(false);
//         console.log("Socket disconnected");
//       });

//       // Cleanup on unmount
//       return () => {
//         if (newSocket) newSocket.disconnect();
//       };
//     }
//   }, [volunteerId]);

//   // Register volunteer when socket connects
//   useEffect(() => {
//     if (socket && isConnected && volunteerId) {
//       // Register the volunteer with the socket server
//       socket.emit("register_volunteer", { 
//         volunteerId, 
//         name: volunteerName 
//       });
      
//       console.log(`Registered volunteer: ${volunteerId} (${volunteerName})`);
      
//       // Listen for registration confirmation
//       socket.on("registration_success", (data) => {
//         console.log("Registration successful:", data);
//         // You could show a toast notification here
//       });

//       // Listen for active chats and pending requests
//       socket.on("active_chats", (activeChats) => {
//         if (!activeChats || !Array.isArray(activeChats)) {
//           console.error("Invalid active chats data:", activeChats);
//           return;
//         }

//         // Format all chat data
//         const formattedChats = activeChats.map(chat => ({
//           id: chat.id,
//           userId: chat.userId,
//           name: chat.userName || "Anonymous User",
//           lastMessage: chat.messages && chat.messages.length > 0 
//             ? chat.messages[chat.messages.length - 1].message 
//             : "No messages yet",
//           time: formatTime(chat.lastActivity || Date.now()),
//           unread: chat.unreadVolunteer || 0,
//           status: chat.volunteerId ? "assigned" : "pending"
//         }));
        
//         // Separate pending requests from active chats
//         const pending = formattedChats.filter(chat => chat.status === "pending");
//         const active = formattedChats.filter(chat => 
//           chat.status === "assigned" && chat.volunteerId === volunteerId
//         );
        
//         setPendingRequests(pending);
//         setChats(active);
        
//         console.log(`Received ${pending.length} pending requests and ${active.length} active chats`);
//       });

//       // Return cleanup function
//       return () => {
//         socket.off("registration_success");
//         socket.off("active_chats");
//       };
//     }
//   }, [socket, isConnected, volunteerId, volunteerName]);

//   // Handle more socket events
//   useEffect(() => {
//     if (!socket) return;

//     // Listen for new chat requests
//     socket.on("new_chat_request", (chatRequest) => {
//       console.log("New chat request received:", chatRequest);
      
//       // Add to pending requests if it's new
//       setPendingRequests(prev => {
//         const exists = prev.some(req => req.id === chatRequest.chatId);
//         if (exists) return prev;
        
//         return [...prev, {
//           id: chatRequest.chatId,
//           userId: chatRequest.userId,
//           name: chatRequest.userName || "Anonymous User",
//           lastMessage: chatRequest.message || "New chat request",
//           time: formatTime(chatRequest.timestamp || Date.now()),
//           unread: 1,
//           status: "pending"
//         }];
//       });
//     });

//     // Listen for incoming messages
//     socket.on("receive_message", (newMessage) => {
//       console.log("Received message:", newMessage);
      
//       // Update messages if in current chat
//       if (currentChat && currentChat.id === newMessage.chatId) {
//         setMessages(prev => [...prev, newMessage]);
        
//         // Mark messages as read only if we're in the current chat
//         socket.emit("mark_messages_read", { 
//           chatId: newMessage.chatId, 
//           userType: "volunteer" 
//         });
//       }
      
//       // Update chat list with the new message
//       const updateChatList = (list) => list.map(chat => {
//         if (chat.id === newMessage.chatId) {
//           return {
//             ...chat,
//             lastMessage: newMessage.message,
//             time: formatTime(newMessage.timestamp || Date.now()),
//             unread: currentChat && currentChat.id === newMessage.chatId 
//               ? 0 
//               : (chat.unread || 0) + (newMessage.senderType === "user" ? 1 : 0),
//           };
//         }
//         return chat;
//       });
      
//       // Update either active chats or pending requests based on where this chat is
//       const chatInActive = chats.some(chat => chat.id === newMessage.chatId);
//       if (chatInActive) {
//         setChats(updateChatList);
//       } else {
//         setPendingRequests(updateChatList);
//       }
//     });

//     // Listen for chat history
//     socket.on("chat_history", (chat) => {
//       console.log("Received chat history:", chat);
//       if (chat && chat.messages) {
//         setMessages(chat.messages);
        
//         // Mark messages as read
//         socket.emit("mark_messages_read", { 
//           chatId: chat.id, 
//           userType: "volunteer" 
//         });
//       }
//     });

//     socket.on("chat_assigned", (data) => {
//       console.log("Chat assigned:", data);
      
//       if (data.volunteerId === volunteerId) {
//         // Find the chat that was assigned
//         const assignedChat = pendingRequests.find(chat => chat.id === data.chatId);
        
//         if (assignedChat) {
//           // Update the chat status
//           const updatedChat = {
//             ...assignedChat,
//             status: "assigned" // Make sure this is "assigned" not "accepting"
//           };
          
//           console.log("Updating chat status from accepting to assigned:", updatedChat);
          
//           // Move from pending to active
//           setPendingRequests(prev => prev.filter(chat => chat.id !== data.chatId));
//           setChats(prev => {
//             // Check if already in active chats
//             const exists = prev.some(chat => chat.id === data.chatId);
//             if (exists) return prev;
//             return [...prev, updatedChat];
//           });
          
//           // IMPORTANT: Set currentChat with the updated status
//           setCurrentChat(updatedChat);
          
//           // Join chat room and fetch history
//           socket.emit("join_chat", data.chatId);
//           socket.emit("get_chat_history", data.chatId);
//         }
//       }
//     });
//     // Listen for chat rejection confirmation
//     socket.on("chat_rejected", (data) => {
//       console.log("Chat rejected:", data);
      
//       // Remove from pending requests
//       setPendingRequests(prev => prev.filter(chat => chat.id !== data.chatId));
      
//       // If it was the current chat, clear it
//       if (currentChat && currentChat.id === data.chatId) {
//         setCurrentChat(null);
//         setMessages([]);
//       }
//     });

//     // Return cleanup function
//     return () => {
//       socket.off("new_chat_request");
//       socket.off("receive_message"); 
//       socket.off("chat_history");
//       socket.off("chat_assigned");
//       socket.off("chat_rejected");
//     };
//   }, [socket, currentChat, volunteerId, chats, pendingRequests]);

//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     if (messageContainerRef.current) {
//       messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Format timestamp to readable format
//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     const now = new Date();
    
//     // Today
//     if (date.toDateString() === now.toDateString()) {
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     }
    
//     // Yesterday
//     const yesterday = new Date(now);
//     yesterday.setDate(now.getDate() - 1);
//     if (date.toDateString() === yesterday.toDateString()) {
//       return "Yesterday";
//     }
    
//     // Within the last week
//     const lastWeek = new Date(now);
//     lastWeek.setDate(now.getDate() - 7);
//     if (date > lastWeek) {
//       return date.toLocaleDateString([], { weekday: 'long' });
//     }
    
//     // Other
//     return date.toLocaleDateString();
//   };

//   // Handle selecting a chat
//   const handleSelectChat = (chat) => {
//     setCurrentChat(chat);
    
//     if (socket) {
//       // Join chat room
//       socket.emit("join_chat", chat.id);
      
//       // Fetch chat history
//       socket.emit("get_chat_history", chat.id);
      
//       // Update chat list to mark as read
//       const updateReadStatus = (list) => list.map(c => {
//         if (c.id === chat.id) {
//           return { ...c, unread: 0 };
//         }
//         return c;
//       });
      
//       if (chat.status === "assigned") {
//         setChats(updateReadStatus);
//       } else {
//         setPendingRequests(updateReadStatus);
//       }
//     }
//   };

//   // Handle sending a message
//   const handleSendMessage = (e) => {
//     e.preventDefault();
    
//     if (message.trim() && socket && currentChat) {
//       const messageData = {
//         chatId: currentChat.id,
//         senderId: volunteerId,
//         senderType: "volunteer",
//         recipientId: currentChat.userId,
//         message: message.trim(),
//         timestamp: Date.now(),
//       };
      
//       // Send message to server
//       socket.emit("send_message", messageData);
      
//       // Update local messages immediately
//       setMessages(prev => [
//         ...prev, 
//         { ...messageData, id: Date.now().toString() }
//       ]);
      
//       // Clear input
//       setMessage("");
//     }
//   };

//   // Handle accepting a chat request
//   // Handle accepting a chat request
// const handleAcceptChat = (chatId) => {
//   if (socket) {
//     const chatToAccept = chatId || (currentChat && currentChat.id);

//     if (chatToAccept) {
//       console.log("Emitting accept_chat with chatId:", chatToAccept, "volunteerId:", volunteerId);
      
//       // Find the chat
//       const chatObj = pendingRequests.find(chat => chat.id === chatToAccept);
//       if (chatObj) {
//         // Set as current chat immediately and mark as assigned instead of "accepting"
//         // This avoids the intermediate "accepting" state
//         const updatedChat = {...chatObj, status: "assigned"};
//         setCurrentChat(updatedChat);
        
//         // Join chat room immediately
//         socket.emit("join_chat", chatToAccept);
        
//         // Send accept request to server
//         socket.emit("accept_chat", {
//           chatId: chatToAccept,
//           volunteerId
//         });
        
//         // Get chat history 
//         socket.emit("get_chat_history", chatToAccept);
        
//         // Update local state to reflect change immediately
//         setPendingRequests(prev => prev.filter(chat => chat.id !== chatToAccept));
//         setChats(prev => {
//           // Check if already in active chats
//           const exists = prev.some(chat => chat.id === chatToAccept);
//           if (exists) return prev;
//           return [...prev, updatedChat];
//         });
//       }
//     } else {
//       console.error("No chatId to accept");
//     }
//   }
// };
//   // Handle rejecting a chat request
//   const handleRejectChat = (chatId) => {
//     if (socket) {
//       const chatToReject = chatId || (currentChat && currentChat.id);
  
//       if (chatToReject) {
//         console.log("Emitting reject_chat with chatId:", chatToReject, "volunteerId:", volunteerId);
//         socket.emit("reject_chat", {
//           chatId: chatToReject,
//           volunteerId
//         });
        
//         // Remove from pending requests immediately for better UX
//         setPendingRequests(prev => prev.filter(chat => chat.id !== chatToReject));
        
//         // If it was the current chat, clear it
//         if (currentChat && currentChat.id === chatToReject) {
//           setCurrentChat(null);
//           setMessages([]);
//         }
//       } else {
//         console.error("No chatId to reject");
//       }
//     }
//   };
  
//   // Render chats list
//   const renderChatList = (list, isPending = false) => {
//     return list.map(chat => (
//       <div 
//         key={chat.id}
//         className={`flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 ${
//           currentChat && currentChat.id === chat.id ? 'bg-orange-50' : ''
//         }`}
//         onClick={() => handleSelectChat(chat)}
//       >
//         <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
//           <span className="text-orange-500 font-semibold">
//             {chat.name.charAt(0).toUpperCase()}
//           </span>
//         </div>
//         <div className="flex-1">
//           <div className="flex justify-between">
//             <h3 className="font-medium">{chat.name}</h3>
//             <span className="text-xs text-gray-500">{chat.time}</span>
//           </div>
//           <div className="flex justify-between">
//             <p className="text-sm text-gray-600 truncate max-w-[180px]">
//               {chat.lastMessage}
//             </p>
//             {chat.unread > 0 && (
//               <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 {chat.unread}
//               </span>
//             )}
//           </div>
//           {isPending && (
//             <div className="mt-1 flex space-x-2">
//               <button
//                 className="bg-orange-500 text-white text-xs py-1 px-2 rounded"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   console.log("Accept Request button clicked for chatId:", chat.id);
//                   handleAcceptChat(chat.id);
//                 }}
//               >
//                 Accept
//               </button>
//               <button
//                 className="bg-gray-500 text-white text-xs py-1 px-2 rounded"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   console.log("Reject Request button clicked for chatId:", chat.id);
//                   handleRejectChat(chat.id);
//                 }}
//               >
//                 Reject
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     ));
//   };

//   // If not logged in, redirect to login
//   if (!volunteerId) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <h2 className="text-xl font-semibold mb-4">Login Required</h2>
//         <p className="text-gray-600 mb-6">Please login to access the chat functionality</p>
//         <Link 
//           to="/volunteer/login" 
//           className="bg-orange-500 text-white px-6 py-2 rounded-md"
//         >
//           Go to Login
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-80 bg-white border-r flex flex-col">
//         <div className="p-4 border-b">
//           <h2 className="text-lg font-semibold">Chat</h2>
//           <p className="text-sm text-gray-600">Welcome, {volunteerName}</p>
//         </div>
        
//         {/* Pending Requests Section */}
//         {pendingRequests.length > 0 && (
//           <div className="border-b">
//             <div className="px-4 py-2 bg-gray-50">
//               <h3 className="font-medium text-orange-600">
//                 Pending Requests ({pendingRequests.length})
//               </h3>
//             </div>
//             <div className="overflow-y-auto max-h-48">
//               {renderChatList(pendingRequests, true)}
//             </div>
//           </div>
//         )}
        
//         {/* Active Chats Section */}
//         <div className="px-4 py-2 bg-gray-50">
//           <h3 className="font-medium">Active Chats</h3>
//         </div>
//         <div className="overflow-y-auto flex-1">
//           {chats.length > 0 ? (
//             renderChatList(chats)
//           ) : (
//             <div className="p-4 text-center text-gray-500">
//               No active chats
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {currentChat ? (
//           <>
//             {/* Chat Header */}
//             {/* Chat Header - Fixed Version */}
// <div className="px-4 py-3 bg-white border-b flex justify-between items-center">
//   <div className="flex items-center">
//     <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
//       <span className="text-orange-500 font-semibold">
//         {currentChat.name.charAt(0).toUpperCase()}
//       </span>
//     </div>
//     <div>
//       <h3 className="font-medium">{currentChat.name}</h3>
//       <span className="text-xs text-gray-500">
//         {currentChat.status === "pending" ? "Pending" : 
//          currentChat.status === "accepting" ? "Accepting..." : "Active"}
//       </span>
//     </div>
//   </div>
  
//   {currentChat.status === "pending" && (
//     <div className="flex space-x-2">
//       <button
//         className="bg-orange-500 text-white text-sm py-1 px-3 rounded"
//         onClick={() => handleAcceptChat()}
//       >
//         Accept Chat
//       </button>
//       <button
//         className="bg-gray-500 text-white text-sm py-1 px-3 rounded"
//         onClick={() => handleRejectChat()}
//       >
//         Reject Chat
//       </button>
//     </div>
//   )}
  
//   {currentChat.status === "accepting" && (
//     <div className="text-sm text-orange-500">
//       <span className="inline-block animate-pulse">Accepting chat...</span>
//     </div>
//   )}
// </div>
//             {/* Messages */}
//             <div 
//               ref={messageContainerRef}
//               className="flex-1 overflow-y-auto p-4 bg-gray-50"
//             >
//               {messages.length > 0 ? (
//                 messages.map((msg, index) => (
//                   <div
//                     key={msg.id || index}
//                     className={`max-w-[75%] mb-3 ${
//                       msg.senderType === "volunteer" 
//                         ? "ml-auto bg-orange-100 rounded-tl-lg rounded-bl-lg rounded-br-lg" 
//                         : "mr-auto bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg"
//                     } p-3 shadow-sm`}
//                   >
//                     <p>{msg.message}</p>
//                     <span className="text-xs text-gray-500 block text-right mt-1">
//                       {formatTime(msg.timestamp)}
//                     </span>
//                   </div>
//                 ))
//               ) : (
//                 <div className="h-full flex items-center justify-center">
//                   <p className="text-gray-500">
//                     {currentChat.status === "accepting" 
//                       ? "Connecting to chat..." 
//                       : "No messages yet"}
//                   </p>
//                 </div>
//               )}
//             </div>
            
//             {/* Message Input */}
//             <form 
//               onSubmit={handleSendMessage}
//               className="p-3 bg-white border-t flex"
//             >
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder={
//                   currentChat.status === "pending" ? "Accept chat to send messages" : 
//                   currentChat.status === "accepting" ? "Connecting to chat..." : 
//                   "Type your message..."
//                 }
//                 className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:border-orange-500"
//                 disabled={currentChat.status === "pending" || currentChat.status === "accepting"}
//               />
//               <button
//                 type="submit"
//                 className={`text-white px-4 rounded-r-lg ${
//                   currentChat.status === "pending" || currentChat.status === "accepting"
//                     ? "bg-gray-400 cursor-not-allowed" 
//                     : "bg-orange-500 hover:bg-orange-600"
//                 }`}
//                 disabled={currentChat.status === "pending" || currentChat.status === "accepting"}
//               >
//                 Send
//               </button>
//             </form>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gray-50">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
//                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium mb-2">No chat selected</h3>
//               <p className="text-gray-600">
//                 {pendingRequests.length > 0 
//                   ? "Select a chat request to respond" 
//                   : "Waiting for new chat requests..."}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VolHeader from "../../components/VolHeader";
      
export const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  
  // Get volunteer info from Redux store or localStorage
  const { id: volunteerId, firstName, lastName } = useSelector(state => state.volunteer) || {};
  const volunteerName = `${firstName || ''} ${lastName || ''}`.trim() || "Volunteer";
  
  const messageContainerRef = useRef(null);

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
    }
  }, [volunteerId]);

  // Register volunteer when socket connects
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
        // You could show a toast notification here
      });

      // Listen for active chats and pending requests
      socket.on("active_chats", (activeChats) => {
        if (!activeChats || !Array.isArray(activeChats)) {
          console.error("Invalid active chats data:", activeChats);
          return;
        }

        // Format all chat data
        const formattedChats = activeChats.map(chat => ({
          id: chat.id,
          userId: chat.userId,
          name: chat.userName || "Anonymous User",
          lastMessage: chat.messages && chat.messages.length > 0 
            ? chat.messages[chat.messages.length - 1].message 
            : "No messages yet",
          time: formatTime(chat.lastActivity || Date.now()),
          unread: chat.unreadVolunteer || 0,
          status: chat.volunteerId ? "assigned" : "pending"
        }));
        
        // Separate pending requests from active chats
        const pending = formattedChats.filter(chat => chat.status === "pending");
        const active = formattedChats.filter(chat => 
          chat.status === "assigned" && chat.volunteerId === volunteerId
        );
        
        setPendingRequests(pending);
        setChats(active);
        
        console.log(`Received ${pending.length} pending requests and ${active.length} active chats`);
      });

      // Return cleanup function
      return () => {
        socket.off("registration_success");
        socket.off("active_chats");
      };
    }
  }, [socket, isConnected, volunteerId, volunteerName]);

  // Handle more socket events
  useEffect(() => {
    if (!socket) return;

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
          lastMessage: chatRequest.message || "New chat request",
          time: formatTime(chatRequest.timestamp || Date.now()),
          unread: 1,
          status: "pending"
        }];
      });
    });

    // Listen for incoming messages
    socket.on("receive_message", (newMessage) => {
      console.log("Received message:", newMessage);
      
      // Update messages if in current chat
      if (currentChat && currentChat.id === newMessage.chatId) {
        setMessages(prev => [...prev, newMessage]);
        
        // Mark messages as read only if we're in the current chat
        socket.emit("mark_messages_read", { 
          chatId: newMessage.chatId, 
          userType: "volunteer" 
        });
      }
      
      // Update chat list with the new message
      const updateChatList = (list) => list.map(chat => {
        if (chat.id === newMessage.chatId) {
          return {
            ...chat,
            lastMessage: newMessage.message,
            time: formatTime(newMessage.timestamp || Date.now()),
            unread: currentChat && currentChat.id === newMessage.chatId 
              ? 0 
              : (chat.unread || 0) + (newMessage.senderType === "user" ? 1 : 0),
          };
        }
        return chat;
      });
      
      // Update either active chats or pending requests based on where this chat is
      const chatInActive = chats.some(chat => chat.id === newMessage.chatId);
      if (chatInActive) {
        setChats(updateChatList);
      } else {
        setPendingRequests(updateChatList);
      }
    });

    // Listen for chat history
    socket.on("chat_history", (chat) => {
      console.log("Received chat history:", chat);
      if (chat && chat.messages) {
        setMessages(chat.messages);
        
        // Mark messages as read
        socket.emit("mark_messages_read", { 
          chatId: chat.id, 
          userType: "volunteer" 
        });
      }
    });

    socket.on("chat_assigned", (data) => {
      console.log("Chat assigned:", data);
      
      if (data.volunteerId === volunteerId) {
        // Find the chat that was assigned
        const assignedChat = pendingRequests.find(chat => chat.id === data.chatId);
        
        if (assignedChat) {
          // Update the chat status
          const updatedChat = {
            ...assignedChat,
            status: "assigned" // Make sure this is "assigned" not "accepting"
          };
          
          console.log("Updating chat status to assigned:", updatedChat);
          
          // Move from pending to active
          setPendingRequests(prev => prev.filter(chat => chat.id !== data.chatId));
          setChats(prev => {
            // Check if already in active chats
            const exists = prev.some(chat => chat.id === data.chatId);
            if (exists) return prev;
            return [...prev, updatedChat];
          });
          
          // Set currentChat with the updated status to open the chat immediately
          setCurrentChat(updatedChat);
          
          // Join chat room and fetch history
          socket.emit("join_chat", data.chatId);
          socket.emit("get_chat_history", data.chatId);
        }
      }
    });
    
    // Listen for chat rejection confirmation
    socket.on("chat_rejected", (data) => {
      console.log("Chat rejected:", data);
      
      // Remove from pending requests
      setPendingRequests(prev => prev.filter(chat => chat.id !== data.chatId));
      
      // If it was the current chat, clear it
      if (currentChat && currentChat.id === data.chatId) {
        setCurrentChat(null);
        setMessages([]);
      }
    });

    // Return cleanup function
    return () => {
      socket.off("new_chat_request");
      socket.off("receive_message"); 
      socket.off("chat_history");
      socket.off("chat_assigned");
      socket.off("chat_rejected");
    };
  }, [socket, currentChat, volunteerId, chats, pendingRequests]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

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

  // Handle selecting a chat
  const handleSelectChat = (chat) => {
    setCurrentChat(chat);
    
    if (socket) {
      // Join chat room
      socket.emit("join_chat", chat.id);
      
      // Fetch chat history
      socket.emit("get_chat_history", chat.id);
      
      // Update chat list to mark as read
      const updateReadStatus = (list) => list.map(c => {
        if (c.id === chat.id) {
          return { ...c, unread: 0 };
        }
        return c;
      });
      
      if (chat.status === "assigned") {
        setChats(updateReadStatus);
      } else {
        setPendingRequests(updateReadStatus);
      }
    }
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (message.trim() && socket && currentChat) {
      const messageData = {
        chatId: currentChat.id,
        senderId: volunteerId,
        senderType: "volunteer",
        recipientId: currentChat.userId,
        message: message.trim(),
        timestamp: Date.now(),
      };
      
      // Send message to server
      socket.emit("send_message", messageData);
      
      // Update local messages immediately
      setMessages(prev => [
        ...prev, 
        { ...messageData, id: Date.now().toString() }
      ]);
      
      // Clear input
      setMessage("");
    }
  };

  // Handle accepting a chat request - FIXED VERSION
  const handleAcceptChat = (chatId) => {
    if (socket) {
      const chatToAccept = chatId || (currentChat && currentChat.id);

      if (chatToAccept) {
        console.log("Accepting chat with chatId:", chatToAccept, "volunteerId:", volunteerId);
        
        // Find the chat
        const chatObj = pendingRequests.find(chat => chat.id === chatToAccept);
        if (chatObj) {
          // Create updated chat object with assigned status
          const updatedChat = {
            ...chatObj,
            status: "assigned" // Skip "accepting" state and go straight to "assigned"
          };
          
          // Important: Set as current chat first to open the chat section immediately
          setCurrentChat(updatedChat);
          
          // Join chat room immediately
          socket.emit("join_chat", chatToAccept);
          
          // Send accept request to server
          socket.emit("accept_chat", {
            chatId: chatToAccept,
            volunteerId
          });
          
          // Get chat history 
          socket.emit("get_chat_history", chatToAccept);
          
          // Update local state to reflect change immediately for better UX
          setPendingRequests(prev => prev.filter(chat => chat.id !== chatToAccept));
          setChats(prev => {
            const exists = prev.some(chat => chat.id === chatToAccept);
            if (exists) return prev;
            return [...prev, updatedChat];
          });
        }
      } else {
        console.error("No chatId to accept");
      }
    }
  };

  // Handle rejecting a chat request
  const handleRejectChat = (chatId) => {
    if (socket) {
      const chatToReject = chatId || (currentChat && currentChat.id);
  
      if (chatToReject) {
        console.log("Rejecting chat with chatId:", chatToReject, "volunteerId:", volunteerId);
        socket.emit("reject_chat", {
          chatId: chatToReject,
          volunteerId
        });
        
        // Remove from pending requests immediately for better UX
        setPendingRequests(prev => prev.filter(chat => chat.id !== chatToReject));
        
        // If it was the current chat, clear it
        if (currentChat && currentChat.id === chatToReject) {
          setCurrentChat(null);
          setMessages([]);
        }
      } else {
        console.error("No chatId to reject");
      }
    }
  };
  
  // Render chats list
  const renderChatList = (list, isPending = false) => {
    return list.map(chat => (
      <div 
        key={chat.id}
        className={`flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 ${
          currentChat && currentChat.id === chat.id ? 'bg-orange-50' : ''
        }`}
        onClick={() => handleSelectChat(chat)}
      >
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
          <span className="text-orange-500 font-semibold">
            {chat.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium">{chat.name}</h3>
            <span className="text-xs text-gray-500">{chat.time}</span>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600 truncate max-w-[180px]">
              {chat.lastMessage}
            </p>
            {chat.unread > 0 && (
              <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {chat.unread}
              </span>
            )}
          </div>
          {isPending && (
            <div className="mt-1 flex space-x-2">
              <button
                className="bg-orange-500 text-white text-xs py-1 px-2 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAcceptChat(chat.id);
                }}
              >
                Accept
              </button>
              <button
                className="bg-gray-500 text-white text-xs py-1 px-2 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRejectChat(chat.id);
                }}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    ));
  };

  // If not logged in, redirect to login
  if (!volunteerId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">Please login to access the chat functionality</p>
        <Link 
          to="/volunteer/login" 
          className="bg-orange-500 text-white px-6 py-2 rounded-md"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Chat</h2>
          <p className="text-sm text-gray-600">Welcome, {volunteerName}</p>
        </div>
        
        {/* Pending Requests Section */}
        {pendingRequests.length > 0 && (
          <div className="border-b">
            <div className="px-4 py-2 bg-gray-50">
              <h3 className="font-medium text-orange-600">
                Pending Requests ({pendingRequests.length})
              </h3>
            </div>
            <div className="overflow-y-auto max-h-48">
              {renderChatList(pendingRequests, true)}
            </div>
          </div>
        )}
        
        {/* Active Chats Section */}
        <div className="px-4 py-2 bg-gray-50">
          <h3 className="font-medium">Active Chats</h3>
        </div>
        <div className="overflow-y-auto flex-1">
          {chats.length > 0 ? (
            renderChatList(chats)
          ) : (
            <div className="p-4 text-center text-gray-500">
              No active chats
            </div>
          )}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="px-4 py-3 bg-white border-b flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <span className="text-orange-500 font-semibold">
                    {currentChat.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{currentChat.name}</h3>
                  <span className="text-xs text-gray-500">
                    {currentChat.status === "pending" ? "Pending" : "Active"}
                  </span>
                </div>
              </div>
              
              {currentChat.status === "pending" && (
                <div className="flex space-x-2">
                  <button
                    className="bg-orange-500 text-white text-sm py-1 px-3 rounded"
                    onClick={() => handleAcceptChat()}
                  >
                    Accept Chat
                  </button>
                  <button
                    className="bg-gray-500 text-white text-sm py-1 px-3 rounded"
                    onClick={() => handleRejectChat()}
                  >
                    Reject Chat
                  </button>
                </div>
              )}
            </div>

            {/* Messages */}
            <div 
              ref={messageContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-gray-50"
            >
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={msg.id || index}
                    className={`max-w-[75%] mb-3 ${
                      msg.senderType === "volunteer" 
                        ? "ml-auto bg-orange-100 rounded-tl-lg rounded-bl-lg rounded-br-lg" 
                        : "mr-auto bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg"
                    } p-3 shadow-sm`}
                  >
                    <p>{msg.message}</p>
                    <span className="text-xs text-gray-500 block text-right mt-1">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">
                    {currentChat.status === "pending" 
                      ? "Accept the chat to start messaging" 
                      : "No messages yet"}
                  </p>
                </div>
              )}
            </div>
            
            {/* Message Input */}
            <form 
              onSubmit={handleSendMessage}
              className="p-3 bg-white border-t flex"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  currentChat.status === "pending" ? "Accept chat to send messages" : 
                  "Type your message..."
                }
                className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:border-orange-500"
                disabled={currentChat.status === "pending"}
              />
              <button
                type="submit"
                className={`text-white px-4 rounded-r-lg ${
                  currentChat.status === "pending"
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
                disabled={currentChat.status === "pending"}
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No chat selected</h3>
              <p className="text-gray-600">
                {pendingRequests.length > 0 
                  ? "Select a chat request to respond" 
                  : "Waiting for new chat requests..."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;