// Import the chat controller for tracking chats
import { endChat } from '../controllers/chatControllers.js';
import { trackChat, acceptChat, rejectChat } from '../controllers/chatControllers.js';
import { getAllChats } from '../controllers/chatControllers.js';
import Chat from '../models/chatModel.js';  
  // Keep track of connected users and volunteers
  const users = new Map();
  const volunteers = new Map();
  
  const setupSocketHandlers = (io) => {
    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
      
      // User registration
      socket.on("register_user", async ({ userId, name }) => {
        console.log(`User registered: ${name} (${userId})`);
        
        // Store user info
        users.set(userId, {
          socketId: socket.id,
          name
        });
        socket.userId = userId;
        
        // Create a chat ID
        const chatId = `chat_${userId}`;
        
        // Track this chat in our controller
        const stats = trackChat(chatId, userId, name);
        
        // If using database, create chat record
        try {
          const existingChat = await Chat.findOne({ 
            userId, 
            status: { $ne: 'ended' } 
          });
          
          if (!existingChat) {
            const newChat = new Chat({
              userId,
              userName: name,
              status: 'pending'
            });
            await newChat.save();
            socket.chatId = newChat._id;
          } else {
            socket.chatId = existingChat._id;
          }
        } catch (error) {
          console.error('Error creating chat record:', error);
        }
        
        // Notify volunteers about new chat using structure expected by volunteer component
        io.to("volunteers").emit("new_chat_request", {
          chatId: socket.chatId || chatId,
          userId: userId,
          userName: name,
          lastMessage: "New conversation started",
          timestamp: Date.now()
        });
        
        // Broadcast updated stats to volunteers
        io.to("volunteers").emit("chat_stats", {
          pending: stats.pending,
          accepted: stats.accepted,
          total: stats.pending + stats.accepted
        });
      });
      
      // Volunteer registration
      socket.on("register_volunteer", async ({ volunteerId, name }) => {
        console.log(`Volunteer registered: ${name} (${volunteerId})`);
        
        // Store volunteer info
        volunteers.set(volunteerId, {
          socketId: socket.id,
          name
        });
        socket.volunteerId = volunteerId;
        
        // Add socket to volunteers room
        socket.join("volunteers");
        
        // Send active chats to match your component
        let activeChats = [];
        
        // If using database, fetch chats
        try {
          // Get assigned chats for this volunteer
          const assignedChats = await Chat.find({
            volunteerId,
            status: 'assigned'
          });
          
          // Get pending chats
          const pendingChats = await Chat.find({
            volunteerId: null,
            status: 'pending'
          });
          
          // Format all chat data
          activeChats = [...assignedChats, ...pendingChats].map(chat => ({
            id: chat._id,
            userId: chat.userId,
            userName: chat.userName || "Anonymous User",
            messages: chat.messages || [],
            lastMessage: chat.messages && chat.messages.length > 0 
              ? chat.messages[chat.messages.length - 1].message 
              : "New conversation",
            time: formatTime(chat.lastActivity || chat.createdAt),
            unread: chat.unreadVolunteer || 0,
            volunteerId: chat.volunteerId,
            status: chat.volunteerId ? "assigned" : "pending"
          }));
        } catch (error) {
          console.error('Error fetching chats:', error);
          // Use in-memory if database fails
          const chats = getAllChats();
          activeChats = [
            ...chats.pending.map(c => ({...c, status: 'pending'})),
            ...chats.accepted.map(c => ({...c, status: 'assigned'}))
          ];
        }
        
        socket.emit("active_chats", activeChats);
        
        // Send chat stats
        socket.emit("chat_stats", {
          pending: activeChats.filter(c => c.status === 'pending').length,
          accepted: activeChats.filter(c => c.status === 'assigned').length,
          total: activeChats.length
        });
      });
      
      // Joining a chat room
      socket.on("join_chat", async (chatId) => {
        console.log(`${socket.id} joined chat: ${chatId}`);
        socket.join(chatId);
        
        // Get chat history if using database
        try {
          const chat = await Chat.findById(chatId);
          if (chat) {
            socket.emit("chat_history", {
              id: chat._id,
              messages: chat.messages || [],
              lastActivity: chat.lastActivity || chat.createdAt
            });
          } else {
            socket.emit("chat_history", {
              id: chatId,
              messages: [],
              lastActivity: Date.now()
            });
          }
        } catch (error) {
          console.error('Error getting chat history:', error);
          socket.emit("chat_history", {
            id: chatId,
            messages: [],
            lastActivity: Date.now()
          });
        }
      });
      
      // Accept chat
      socket.on("accept_chat", async ({ chatId, volunteerId }) => {
        console.log(`Volunteer ${volunteerId} accepted chat ${chatId}`);
        
        const volunteerData = volunteers.get(volunteerId);
        if (!volunteerData) {
          console.error(`Volunteer ${volunteerId} not found`);
          return;
        }
        
        // Update in controller
        const stats = acceptChat(chatId, volunteerId, volunteerData.name);
        
        // Update in database if available
        try {
          const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
              volunteerId,
              volunteerName: volunteerData.name,
              status: 'assigned',
              assignedAt: Date.now()
            },
            { new: true }
          );
          
          if (!updatedChat) {
            console.error(`Chat ${chatId} not found in database`);
          }
        } catch (error) {
          console.error('Error updating chat in database:', error);
        }
        
        // Notify the chat room
        io.to(chatId).emit("chat_assigned", {
          chatId,
          volunteerId,
          volunteerName: volunteerData.name,
          status: 'assigned'
        });
        
        // Broadcast updated stats to volunteers
        io.to("volunteers").emit("chat_stats", {
          pending: stats.pending,
          accepted: stats.accepted,
          total: stats.pending + stats.accepted
        });
      });
      
      // Reject chat
      socket.on("reject_chat", async ({ chatId, volunteerId }) => {
        console.log(`Volunteer ${volunteerId} rejected chat ${chatId}`);
        
        // Update in controller
        const stats = rejectChat(chatId);
        
        // If using database, mark as rejected
        try {
          await Chat.findByIdAndDelete(chatId);
        } catch (error) {
          console.error('Error deleting rejected chat:', error);
        }
        
        // Notify the volunteer
        socket.emit("chat_rejected", {
          chatId,
          volunteerId
        });
        
        // Broadcast updated stats to volunteers
        io.to("volunteers").emit("chat_stats", {
          pending: stats.pending,
          accepted: stats.accepted,
          total: stats.pending + stats.accepted
        });
      });
      
      // Sending messages
      socket.on("send_message", async (messageData) => {
        console.log(`New message in ${messageData.chatId}: ${messageData.message}`);
        
        // Add ID to the message
        const messageWithId = {
          ...messageData,
          id: Date.now().toString(),
          timestamp: Date.now()
        };
        
        // Store message in database if available
        try {
          const chat = await Chat.findById(messageData.chatId);
          if (chat) {
            // Add message to chat
            chat.messages.push({
              senderId: messageData.senderId,
              senderType: messageData.senderType,
              recipientId: messageData.recipientId,
              message: messageData.message,
              timestamp: messageData.timestamp || Date.now(),
              read: false
            });
            
            // Update last activity
            chat.lastActivity = Date.now();
            
            // Update unread count for recipient
            if (messageData.senderType === 'user') {
              chat.unreadVolunteer = (chat.unreadVolunteer || 0) + 1;
            } else {
              chat.unreadUser = (chat.unreadUser || 0) + 1;
            }
            
            await chat.save();
          }
        } catch (error) {
          console.error('Error storing message:', error);
        }
        
        // Broadcast to everyone in the room
        io.to(messageData.chatId).emit("receive_message", messageWithId);
      });
      
      // Mark messages as read
      socket.on("mark_messages_read", async ({ chatId, userType }) => {
        console.log(`${userType} marked messages as read in ${chatId}`);
        
        // Update database if available
        try {
          const update = {};
          if (userType === 'user') {
            update.unreadUser = 0;
          } else if (userType === 'volunteer') {
            update.unreadVolunteer = 0;
          }
          
          await Chat.findByIdAndUpdate(chatId, update);
        } catch (error) {
          console.error('Error marking messages as read:', error);
        }
      });
      
      // Get chat statistics
      socket.on("get_chat_stats", async () => {
        let pendingCount = 0;
        let acceptedCount = 0;
        
        // If using database
        try {
          pendingCount = await Chat.countDocuments({ 
            volunteerId: null, 
            status: 'pending' 
          });
          
          acceptedCount = await Chat.countDocuments({
            volunteerId: { $ne: null },
            status: 'assigned'
          });
        } catch (error) {
          console.error('Error getting chat stats from database:', error);
          // Use in-memory counts
          const chats = getAllChats();
          pendingCount = chats.pending.length;
          acceptedCount = chats.accepted.length;
        }
        
        socket.emit("chat_stats", {
          pending: pendingCount,
          accepted: acceptedCount,
          total: pendingCount + acceptedCount
        });
      });
      
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        
        // Remove from users/volunteers maps
        if (socket.userId) {
          users.delete(socket.userId);
        }
        
        if (socket.volunteerId) {
          volunteers.delete(socket.volunteerId);
        }
      });
    });
  };
  
  // Helper function for time formatting
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
  
  export default setupSocketHandlers;