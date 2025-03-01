import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  BarChart, 
  Upload, 
  Video, 
  FileText, 
  PieChart, 
  Settings, 
  Plus,
  ChevronDown,
  Search
} from 'lucide-react';

// Admin Dashboard Component
const AdminDashboard = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('');
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Admin Dashboard" />
        <main className="p-6 bg-orange-50">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Users" 
              value="2,547" 
              increase="+12%" 
              icon={<Users size={24} className="text-orange-500" />} 
            />
            <StatCard 
              title="Total Volunteers" 
              value="148" 
              increase="+5%" 
              icon={<Users size={24} className="text-orange-500" />} 
            />
            <StatCard 
              title="Total Chats" 
              value="3,842" 
              increase="+18%" 
              icon={<MessageSquare size={24} className="text-orange-500" />} 
            />
            <StatCard 
              title="Content Uploads" 
              value="312" 
              increase="+7%" 
              icon={<Upload size={24} className="text-orange-500" />} 
            />
          </div>
          
            {/* Platform Activity & User Growth */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-orange-700">Platform Activity</h2>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                  </select>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center bg-orange-50 rounded-lg">
                <BarChart size={64} className="text-orange-300" />
                <span className="ml-4 text-gray-500">Activity Chart Visualization</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-orange-700 mb-6">User Growth</h2>
              <div className="h-64 flex items-center justify-center bg-orange-50 rounded-lg">
                <PieChart size={64} className="text-orange-300" />
                <span className="ml-4 text-gray-500">Growth Chart</span>
              </div>
            </div>
          </div>
          
          {/* Content Management & Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-orange-700">Content Management</h2>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-orange-600 transition"
              >
                <Plus size={18} />
                <span>Add Content</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-orange-100">
                <thead className="bg-orange-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date Added
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-orange-100">
                  <ContentRow 
                    title="Introduction to Volunteering" 
                    type="Video" 
                    creator="Admin" 
                    date="Feb 25, 2025" 
                    status="Published" 
                  />
                  <ContentRow 
                    title="Best Practices for Support Chats" 
                    type="PDF" 
                    creator="Sarah Johnson" 
                    date="Feb 22, 2025" 
                    status="Published" 
                  />
                  <ContentRow 
                    title="Volunteer Training Module 1" 
                    type="Video" 
                    creator="Admin" 
                    date="Feb 20, 2025" 
                    status="Published" 
                  />
                  <ContentRow 
                    title="Mental Health Resources" 
                    type="PDF" 
                    creator="David Wilson" 
                    date="Feb 18, 2025" 
                    status="Draft" 
                  />
                  <ContentRow 
                    title="Building Rapport with Users" 
                    type="Article" 
                    creator="Admin" 
                    date="Feb 15, 2025" 
                    status="Published" 
                  />
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Recent Volunteers Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-orange-700">Recent Volunteers</h2>
              <Link to="#" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-orange-100">
                <thead className="bg-orange-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Chats Completed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-orange-100">
                  <VolunteerRow 
                    name="John Doe" 
                    date="Feb 25, 2025" 
                    chats="12" 
                    status="Active" 
                  />
                  <VolunteerRow 
                    name="Emma Wilson" 
                    date="Feb 22, 2025" 
                    chats="8" 
                    status="Active" 
                  />
                  <VolunteerRow 
                    name="Michael Brown" 
                    date="Feb 20, 2025" 
                    chats="15" 
                    status="Active" 
                  />
                  <VolunteerRow 
                    name="Lisa Wong" 
                    date="Feb 18, 2025" 
                    chats="7" 
                    status="Inactive" 
                  />
                  <VolunteerRow 
                    name="James Rodriguez" 
                    date="Feb 15, 2025" 
                    chats="20" 
                    status="Active" 
                  />
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      
      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)} 
          setUploadType={setUploadType}
          uploadType={uploadType}
        />
      )}
    </div>
  );
};

// Admin Sidebar Component
const AdminSidebar = () => {
  const navigate = useNavigate();
  const links = [
    { name: "Dashboard", icon: <BarChart size={20} />, path: "/admin" },
    { name: "Users", icon: <Users size={20} />, path: "/admin/users" },
    { name: "Volunteers", icon: <Users size={20} />, path: "/admin/volunteers" },
    { name: "Chats", icon: <MessageSquare size={20} />, path: "/admin/chats" },
    { name: "Content", icon: <FileText size={20} />, path: "/admin/content" },
    { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" }
  ];
  
  return (
    <div className="w-64 bg-orange-600 text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-orange-500">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      
      <div className="p-4 border-b border-orange-500">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-300 w-10 h-10 rounded-full flex items-center justify-center text-orange-800 font-bold">
            A
          </div>
          <div>
            <h3 className="font-medium">Admin User</h3>
            <p className="text-sm text-orange-200">Administrator</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-grow py-4">
        <ul className="space-y-1">
          {links.map(link => (
            <li key={link.name}>
              <Link 
                to={link.path}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-orange-700 transition"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-orange-500">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-3 text-orange-200 hover:text-white transition w-full"
        >
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

// Admin Header Component
const AdminHeader = ({ title }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

// Stat Card Component
const StatCard = ({ title, value, increase, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 font-medium">{title}</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          <p className="text-sm text-green-500 mt-1">{increase} this month</p>
        </div>
        <div className="p-3 bg-orange-100 rounded-lg">{icon}</div>
      </div>
    </div>
  );
};

// Content Row Component
const ContentRow = ({ title, type, creator, date, status }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {type === 'Video' ? (
            <Video size={16} className="text-orange-500 mr-2" />
          ) : type === 'PDF' ? (
            <FileText size={16} className="text-orange-500 mr-2" />
          ) : (
            <FileText size={16} className="text-orange-500 mr-2" />
          )}
          <span className="text-sm text-gray-500">{type}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{creator}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{date}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          status === 'Published' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button className="text-orange-600 hover:text-orange-900 mr-3">Edit</button>
        <button className="text-red-600 hover:text-red-900">Delete</button>
      </td>
    </tr>
  );
};

// Volunteer Row Component
const VolunteerRow = ({ name, date, chats, status }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{date}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{chats}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button className="text-orange-600 hover:text-orange-900 mr-3">View</button>
        <button className="text-blue-600 hover:text-blue-900">Message</button>
      </td>
    </tr>
  );
};

// Upload Modal Component
const UploadModal = ({ onClose, setUploadType, uploadType }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the upload logic
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-orange-700">Add New Content</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter content title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Content Type
            </label>
            <div className="relative">
              <select
                id="type"
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                required
              >
                <option value="">Select Type</option>
                <option value="video">Video</option>
                <option value="pdf">PDF Document</option>
                <option value="article">Article</option>
                <option value="image">Image</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter content description"
              rows="3"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Upload File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-orange-500 transition">
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="file" className="cursor-pointer">
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  {file ? file.name : "Click to upload or drag and drop"}
                </p>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;