import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, Home, Clock, MessageSquare, FileText, LogOut, User } from 'lucide-react';


export const VolHeader = ({ title }) => {
  const navigate = useNavigate();
  const links = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Requests", icon: <Clock size={18} />, path: "/requests" },
    { name: "Chats", icon: <MessageSquare size={18} />, path: "/chat" },
    { name: "Blogs", icon: <FileText size={18} />, path: "/article" }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-orange-600">MindEaseConnect</h1>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4">
            {links.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 transition"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* Notification Bell */}
          <button className="text-gray-500 hover:text-orange-500 transition relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="bg-orange-300 w-8 h-8 rounded-full flex items-center justify-center text-orange-800 font-bold text-sm">
              JD
            </div>
            <div className="hidden md:block">
              <h3 className="text-sm font-medium">John Doe</h3>
              <p className="text-xs text-gray-500">Volunteer</p>
            </div>
          </div>
          
          {/* Sign Out Button */}
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-orange-500 transition"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default VolHeader;