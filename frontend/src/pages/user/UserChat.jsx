// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// export const UserChat = () => {
//   const [socket, setSocket] = useState(null);
//   const [userId, setUserId] = useState(`user_${Date.now()}`); // Generate unique user ID
//   const [userName, setUserName] = useState(""); 
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [chatId, setChatId] = useState(null);
//   const [volunteer, setVolunteer] = useState(null);
  
//   const messageContainerRef = useRef(null);

//   // Connect to socket server
//   useEffect(() => {
//     const newSocket = io("http://localhost:8080");
//     setSocket(newSocket);

//     // Cleanup on unmount
//     return () => {
//       if (newSocket) newSocket.disconnect();
//     };
//   }, []);

//   // Setup socket listeners after registration
//   useEffect(() => {
//     if (socket && isRegistered) {
//       // Create chat ID if not exists
//       if (!chatId) {
//         setChatId(`chat_${userId}`);
//       }
      
//       // Join chat room
//       if (chatId) {
//         socket.emit("join_chat", chatId);
//       }

//       // Listen for incoming messages
//       socket.on("receive_message", (newMessage) => {
//         setMessages(prev => [...prev, newMessage]);
//       });

//       // Listen for chat history
//       socket.on("chat_history", (chat) => {
//         setMessages(chat.messages || []);
//         // If volunteer is assigned
//         if (chat.volunteerId) {
//           setVolunteer({
//             id: chat.volunteerId,
//             name: "Your Volunteer" // In a real app, you'd get the name from the server
//           });
//         }
//         // Mark messages as read
//         socket.emit("mark_messages_read", { chatId: chat.id, userType: "user" });
//       });

//       // Listen for volunteer assignment
//       socket.on("volunteer_assigned", (data) => {
//         setVolunteer({
//           id: data.volunteerId,
//           name: data.volunteerName
//         });
//       });

//       return () => {
//         socket.off("receive_message");
//         socket.off("chat_history");
//         socket.off("volunteer_assigned");
//       };
//     }
//   }, [socket, isRegistered, chatId, userId]);

//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     if (messageContainerRef.current) {
//       messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Format timestamp to readable format
//   const formatTime = (timestamp) => {
//     return new Date(timestamp).toLocaleTimeString([], { 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     });
//   };

//   // Handle user registration
//   const handleRegister = (e) => {
//     e.preventDefault();
    
//     if (userName.trim() && socket) {
//       socket.emit("register_user", { userId, name: userName });
//       setIsRegistered(true);
//       setChatId(`chat_${userId}`);
//     }
//   };

//   // Handle sending a message
//   const handleSendMessage = (e) => {
//     e.preventDefault();
    
//     if (message.trim() && socket && chatId) {
//       const messageData = {
//         chatId,
//         senderId: userId,
//         senderType: "user",
//         message: message.trim(),
//         timestamp: Date.now(),
//       };
      
//       // If a volunteer is assigned, include recipient
//       if (volunteer) {
//         messageData.recipientId = volunteer.id;
//       }
      
//       // Send message to server
//       socket.emit("send_message", messageData);
      
//       // Update local messages
//       setMessages(prev => [
//         ...prev, 
//         { ...messageData, id: Date.now().toString() }
//       ]);
      
//       // Clear input
//       setMessage("");
//     }
//   };

//   // Registration form
//   if (!isRegistered) {
//     return (
//       <div className="flex min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 justify-center items-center p-4">
//         <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-orange-100">
//           <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
//             Start a Support Chat
//           </h1>
//           <form onSubmit={handleRegister} className="space-y-5">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
//                 Your Name
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium shadow-md"
//             >
//               Start Chat
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // Chat interface
//   return (
//     <>
//     <div className="flex min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 pt-20">
//       <div className="max-w-4xl w-full mx-auto my-8 px-4">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
//           {/* Chat Header */}
//           <div className="p-5 border-b border-orange-100 bg-gradient-to-r from-orange-100 to-amber-100">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 mr-3">
//                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${volunteer ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
//                   {volunteer ? (
//                     <span className="text-xl font-semibold">{volunteer.name.charAt(0)}</span>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <h2 className="font-bold text-xl text-orange-700">
//                   {volunteer ? `Chatting with ${volunteer.name}` : "Support Chat"}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   {volunteer 
//                     ? "Your volunteer is here to help you" 
//                     : "A volunteer will join your chat soon"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Messages Container */}
//           <div 
//             ref={messageContainerRef}
//             className="h-96 p-6 overflow-y-auto space-y-5 bg-gradient-to-br from-gray-50 to-orange-50"
//           >
//             {messages.length > 0 ? (
//               messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${
//                     msg.senderType === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`rounded-2xl p-4 max-w-xs md:max-w-md shadow-sm ${
//                       msg.senderType === "user"
//                         ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
//                         : "bg-white border border-gray-100"
//                     }`}
//                   >
//                     <p className={msg.senderType === "user" ? "text-white" : "text-gray-800"}>
//                       {msg.message}
//                     </p>
//                     <p className={`text-xs mt-1 text-right ${msg.senderType === "user" ? "text-orange-100" : "text-gray-400"}`}>
//                       {formatTime(msg.timestamp)}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="flex flex-col justify-center items-center h-full text-gray-500">
//                 <div className="w-16 h-16 mb-4 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                   </svg>
//                 </div>
//                 <p className="font-medium">Send a message to start the conversation</p>
//               </div>
//             )}
//           </div>

//           {/* Message Input */}
//           <div className="p-4 border-t border-orange-100 bg-white">
//             <form onSubmit={handleSendMessage} className="flex space-x-2">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 className="flex-grow border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
//               />
//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md flex items-center justify-center"
//               >
//                 <span className="mr-2">Send</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default UserChat;
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux"; // Import Redux hooks

export const UserChat = () => {
  // Get user data from Redux store safely
  const auth = useSelector((state) => state.auth) || {};
  const user = auth.user || null;
  
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(user?.id || `user_${Date.now()}`); // Use Redux user ID if available
  const [isRegistered, setIsRegistered] = useState(!!user); // Auto-register if user exists
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState(user ? `chat_${user.id}` : null);
  const [volunteer, setVolunteer] = useState(null);
  
  const messageContainerRef = useRef(null);

  // Connect to socket server
  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);

  // Auto-register user if authenticated via Redux
  useEffect(() => {
    if (socket && user && !isRegistered) {
      // Automatically register the user with data from Redux
      socket.emit("register_user", { 
        userId: user.id, 
        name: user.name // Use the name from Redux auth state
      });
      setUserId(user.id);
      setChatId(`chat_${user.id}`);
      setIsRegistered(true);
    }
  }, [socket, user, isRegistered]);

  // Setup socket listeners after registration
  useEffect(() => {
    if (socket && isRegistered) {
      // Create chat ID if not exists
      if (!chatId) {
        setChatId(`chat_${userId}`);
      }
      
      // Join chat room
      if (chatId) {
        socket.emit("join_chat", chatId);
      }

      // Listen for incoming messages
      socket.on("receive_message", (newMessage) => {
        setMessages(prev => [...prev, newMessage]);
      });

      // Listen for chat history
      socket.on("chat_history", (chat) => {
        setMessages(chat.messages || []);
        // If volunteer is assigned
        if (chat.volunteerId) {
          setVolunteer({
            id: chat.volunteerId,
            name: "Your Volunteer" // In a real app, you'd get the name from the server
          });
        }
        // Mark messages as read
        socket.emit("mark_messages_read", { chatId: chat.id, userType: "user" });
      });

      // Listen for volunteer assignment
      socket.on("volunteer_assigned", (data) => {
        setVolunteer({
          id: data.volunteerId,
          name: data.volunteerName
        });
      });

      return () => {
        socket.off("receive_message");
        socket.off("chat_history");
        socket.off("volunteer_assigned");
      };
    }
  }, [socket, isRegistered, chatId, userId]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Format timestamp to readable format
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Handle user registration (only shown if not authenticated through Redux)
  const handleRegister = (e) => {
    e.preventDefault();
    
    const userName = e.target.name.value.trim();
    if (userName && socket) {
      socket.emit("register_user", { userId, name: userName });
      setIsRegistered(true);
      setChatId(`chat_${userId}`);
    }
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (message.trim() && socket && chatId) {
      const messageData = {
        chatId,
        senderId: userId,
        senderType: "user",
        message: message.trim(),
        timestamp: Date.now(),
      };
      
      // If a volunteer is assigned, include recipient
      if (volunteer) {
        messageData.recipientId = volunteer.id;
      }
      
      // Send message to server
      socket.emit("send_message", messageData);
      
      // Update local messages
      setMessages(prev => [
        ...prev, 
        { ...messageData, id: Date.now().toString() }
      ]);
      
      // Clear input
      setMessage("");
    }
  };

  // Registration form - only show if not authenticated through Redux
  if (!isRegistered) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 justify-center items-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-orange-100">
          <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
            Start a Support Chat
          </h1>
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                placeholder="Enter your name"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium shadow-md"
            >
              Start Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Chat interface
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 pt-20">
      <div className="max-w-4xl w-full mx-auto my-8 px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
          {/* Chat Header */}
          <div className="p-5 border-b border-orange-100 bg-gradient-to-r from-orange-100 to-amber-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${volunteer ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                  {volunteer ? (
                    <span className="text-xl font-semibold">{volunteer.name.charAt(0)}</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <h2 className="font-bold text-xl text-orange-700">
                  {volunteer ? `Chatting with ${volunteer.name}` : "Support Chat"}
                </h2>
                <p className="text-sm text-gray-600">
                  {volunteer 
                    ? "Your volunteer is here to help you" 
                    : "A volunteer will join your chat soon"}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div 
            ref={messageContainerRef}
            className="h-96 p-6 overflow-y-auto space-y-5 bg-gradient-to-br from-gray-50 to-orange-50"
          >
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderType === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl p-4 max-w-xs md:max-w-md shadow-sm ${
                      msg.senderType === "user"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                        : "bg-white border border-gray-100"
                    }`}
                  >
                    <p className={msg.senderType === "user" ? "text-white" : "text-gray-800"}>
                      {msg.message}
                    </p>
                    <p className={`text-xs mt-1 text-right ${msg.senderType === "user" ? "text-orange-100" : "text-gray-400"}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center h-full text-gray-500">
                <div className="w-16 h-16 mb-4 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="font-medium">Send a message to start the conversation</p>
                {user && <p className="text-sm mt-2">Welcome, {user.name}</p>}
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-orange-100 bg-white">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md flex items-center justify-center"
              >
                <span className="mr-2">Send</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChat;