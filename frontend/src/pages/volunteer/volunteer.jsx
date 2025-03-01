import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, Users, LogOut, Home, FileText, Clock } from 'lucide-react';

// Main App Component


// Landing Page Component
export const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-orange-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">VolunteerConnect</h1>
          <div className="space-x-4">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="bg-white text-orange-600 px-4 py-2 rounded-md font-medium hover:bg-orange-100 transition"
            >
              Volunteer Login
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-orange-700 mb-6">Make a Difference Today</h2>
          <p className="text-xl text-gray-700 mb-8">
            Join our platform to connect with people who need your help and expertise.
            As a volunteer, you'll have the ability to accept or decline conversation requests.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-orange-500 text-4xl mb-4 flex justify-center">
                <MessageSquare />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meaningful Conversations</h3>
              <p className="text-gray-600">Connect with users and provide valuable guidance through our chat system.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-orange-500 text-4xl mb-4 flex justify-center">
                <Clock />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">Choose when to volunteer and which requests to accept based on your availability.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-orange-500 text-4xl mb-4 flex justify-center">
                <FileText />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Knowledge</h3>
              <p className="text-gray-600">Contribute to our blog section and help spread valuable information to the community.</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')} 
            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-orange-700 transition shadow-md"
          >
            Start Volunteering
          </button>
        </div>
      </main>
      
      <footer className="bg-orange-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 VolunteerConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Dashboard Component
export const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Dashboard" />
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Pending Requests" 
              value="12" 
              icon={<Clock className="text-orange-500" />} 
            />
            <StatCard 
              title="Active Chats" 
              value="5" 
              icon={<MessageSquare className="text-orange-500" />} 
            />
            <StatCard 
              title="Completed Sessions" 
              value="28" 
              icon={<Users className="text-orange-500" />} 
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-700">Recent Activity</h2>
            <div className="space-y-4">
              <ActivityItem 
                message="New chat request from Sarah about career guidance" 
                time="2 minutes ago" 
              />
              <ActivityItem 
                message="You completed a session with Mike" 
                time="Yesterday at 4:30 PM" 
              />
              <ActivityItem 
                message="New blog post published: 'How to effectively mentor others'" 
                time="2 days ago" 
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-700">Upcoming Sessions</h2>
            <div className="space-y-4">
              <UpcomingSession 
                name="John Doe" 
                topic="Financial planning advice" 
                time="Today, 3:00 PM" 
              />
              <UpcomingSession 
                name="Emma Wilson" 
                topic="Career transition guidance" 
                time="Tomorrow, 10:00 AM" 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Requests Page Component
export const RequestsPage = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: "Sarah Johnson", topic: "Career guidance", status: "pending", time: "10 minutes ago" },
    { id: 2, name: "David Lee", topic: "Financial advice", status: "pending", time: "30 minutes ago" },
    { id: 3, name: "Maria Garcia", topic: "Educational resources", status: "pending", time: "1 hour ago" },
    { id: 4, name: "James Wilson", topic: "Mental health support", status: "pending", time: "2 hours ago" },
    { id: 5, name: "Emily Chen", topic: "Community involvement", status: "pending", time: "3 hours ago" },
  ]);
  
  const handleAccept = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "accepted" } : req
    ));
  };
  
  const handleReject = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "rejected" } : req
    ));
  };
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Chat Requests" />
        <main className="p-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-orange-100 bg-orange-50">
              <h2 className="text-xl font-semibold text-orange-700">Pending Requests</h2>
            </div>
            
            <div className="divide-y divide-orange-100">
              {requests.map(request => (
                <div key={request.id} className={`p-4 ${request.status === 'accepted' ? 'bg-green-50' : request.status === 'rejected' ? 'bg-red-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{request.name}</h3>
                      <p className="text-gray-600">{request.topic}</p>
                      <p className="text-sm text-gray-500">{request.time}</p>
                    </div>
                    <div className="space-x-2">
                      {request.status === 'pending' ? (
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
                        <span className={`px-3 py-1 rounded text-white ${request.status === 'accepted' ? 'bg-green-500' : 'bg-red-500'}`}>
                          {request.status === 'accepted' ? 'Accepted' : 'Rejected'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Chats Page Component
export const ChatsPage = () => {
  const chats = [
    { id: 1, name: "Sarah Johnson", lastMessage: "Thank you for your help!", time: "10 minutes ago", unread: 2 },
    { id: 2, name: "Michael Brown", lastMessage: "I'll try that approach, thanks!", time: "Yesterday", unread: 0 },
    { id: 3, name: "Lisa Wong", lastMessage: "Can we schedule another session?", time: "2 days ago", unread: 1 },
    { id: 4, name: "Robert Garcia", lastMessage: "The resources you shared were very helpful.", time: "1 week ago", unread: 0 },
  ];
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Chats" />
        <main className="p-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-3 h-[600px]">
              {/* Chat List */}
              <div className="border-r border-orange-100">
                <div className="p-4 border-b border-orange-100 bg-orange-50">
                  <h2 className="font-semibold text-orange-700">Conversations</h2>
                </div>
                <div className="overflow-y-auto h-[calc(600px-57px)]">
                  {chats.map(chat => (
                    <div key={chat.id} className="border-b border-orange-100 p-4 hover:bg-orange-50 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{chat.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{chat.time}</p>
                          {chat.unread > 0 && (
                            <span className="inline-block bg-orange-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chat Window */}
              <div className="col-span-2 flex flex-col">
                <div className="p-4 border-b border-orange-100 bg-orange-50">
                  <h2 className="font-semibold text-orange-700">Sarah Johnson</h2>
                </div>
                
                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs md:max-w-md">
                      <p className="text-gray-800">Hello! I'm looking for some career guidance in the tech industry.</p>
                      <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-orange-100 rounded-lg p-3 max-w-xs md:max-w-md">
                      <p className="text-gray-800">Hi Sarah! I'd be happy to help. What specific area of tech are you interested in?</p>
                      <p className="text-xs text-gray-500 mt-1">10:32 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs md:max-w-md">
                      <p className="text-gray-800">I'm currently in web development but I'm considering transitioning to AI/ML. Do you think that's a good move?</p>
                      <p className="text-xs text-gray-500 mt-1">10:35 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-orange-100 rounded-lg p-3 max-w-xs md:max-w-md">
                      <p className="text-gray-800">That's an exciting transition! AI/ML is definitely growing rapidly. Let me share some resources that might help you get started.</p>
                      <p className="text-xs text-gray-500 mt-1">10:37 AM</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-orange-100">
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Blogs Page Component
export const BlogsPage = () => {
  const blogs = [
    {
      id: 1,
      title: "Effective Communication Strategies for Volunteers",
      author: "Jane Smith",
      date: "Feb 20, 2025",
      excerpt: "Learn how to effectively communicate with those seeking help and guidance...",
      image: "/api/placeholder/800/400"
    },
    {
      id: 2,
      title: "Building Trust in Virtual Mentoring Relationships",
      author: "Mark Johnson",
      date: "Feb 15, 2025",
      excerpt: "Discover techniques to establish trust and rapport in online mentoring sessions...",
      image: "/api/placeholder/800/400"
    },
    {
      id: 3,
      title: "Setting Boundaries as a Volunteer",
      author: "Lisa Wong",
      date: "Feb 10, 2025",
      excerpt: "How to maintain healthy boundaries while providing meaningful support...",
      image: "/api/placeholder/800/400"
    }
  ];
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Blog Posts" />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-orange-700">Latest Articles</h2>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
              Create New Post
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-orange-700 mb-2">{blog.title}</h3>
                  <div className="text-sm text-gray-500 mb-2">
                    By {blog.author} | {blog.date}
                  </div>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <button className="text-orange-500 font-medium hover:text-orange-600 transition">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

// Shared Components
// export const Sidebar = () => {
//   const navigate = useNavigate();
//   const links = [
//     { name: "Dashboard", icon: <Home />, path: "/dashboard" },
//     { name: "Requests", icon: <Clock />, path: "/requests" },
//     { name: "Chats", icon: <MessageSquare />, path: "/chats" },
//     { name: "Blogs", icon: <FileText />, path: "/blogs" }
//   ];
  
//   return (
//     <div className="w-64 bg-orange-600 text-white min-h-screen flex flex-col">
//       <div className="p-4 border-b border-orange-500">
//         <h1 className="text-xl font-bold">VolunteerConnect</h1>
//       </div>
      
//       <div className="p-4 border-b border-orange-500">
//         <div className="flex items-center space-x-3">
//           <div className="bg-orange-300 w-10 h-10 rounded-full flex items-center justify-center text-orange-800 font-bold">
//             JD
//           </div>
//           <div>
//             <h3 className="font-medium">John Doe</h3>
//             <p className="text-sm text-orange-200">Volunteer</p>
//           </div>
//         </div>
//       </div>
      
//       <nav className="flex-grow py-4">
//         <ul className="space-y-1">
//           {links.map(link => (
//             <li key={link.name}>
//               <Link 
//                 to={link.path}
//                 className="flex items-center space-x-3 px-4 py-3 hover:bg-orange-700 transition"
//               >
//                 {link.icon}
//                 <span>{link.name}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
      
//       <div className="p-4 border-t border-orange-500">
//         <button 
//           onClick={() => navigate('/')}
//           className="flex items-center space-x-3 text-orange-200 hover:text-white transition w-full"
//         >
//           <LogOut size={18} />
//           <span>Sign Out</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export const Header = ({ title }) => {
//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200 p-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
//         <div className="flex space-x-4 items-center">
//           <button className="text-gray-500 hover:text-orange-500 transition relative">
//             <Bell />
//             <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               3
//             </span>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

export const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-500 font-medium">{title}</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
};

export const ActivityItem = ({ message, time }) => {
  return (
    <div className="border-l-4 border-orange-500 pl-4 py-2">
      <p className="text-gray-700">{message}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  );
};

export const UpcomingSession = ({ name, topic, time }) => {
  return (
    <div className="bg-orange-50 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-gray-600">{topic}</p>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
        <button className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
          Join
        </button>
      </div>
    </div>
  );
};

