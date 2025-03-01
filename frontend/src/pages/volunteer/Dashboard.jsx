import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, Users, LogOut, Home, FileText, Clock } from 'lucide-react';
import VolHeader from '../../components/VolHeader';



const Dashboard = () => {
    const navigate = useNavigate();

    const StatCard = ({ title, value, icon }) => (
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="mr-4">
            {icon}
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      );
      
      const ActivityItem = ({ message, time }) => (
        <div className="border-b border-gray-100 pb-3">
          <p className="text-gray-800">{message}</p>
          <p className="text-xs text-gray-500 mt-1">{time}</p>
        </div>
      );
      
      const UpcomingSession = ({ name, topic, time }) => (
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-600">{topic}</p>
            <p className="text-xs text-gray-500 mt-1">{time}</p>
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition">
            Join
          </button>
        </div>
      );

  return (
    <>
        <VolHeader/>
        <div className="min-h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold p-6 pt-8 text-gray-800">Dashboard</h1>
      <main className="p-6 max-w-7xl mx-auto">
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
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
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
        </div>
      </main>
    </div>
        
    </>
  )
}

export default Dashboard