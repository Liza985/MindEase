import React, { useState } from "react";
import { Search, Filter, MoreHorizontal, ArrowUpDown, Download } from "lucide-react";
import AdminSidebar from "../../components/AdminSideBar";

const Chats = () => {
  // Mock data for demo purposes
  const [chats, setChats] = useState([
    {
      id: "CHAT001",
      sender: { name: "John Doe", id: "USR124", email: "john@example.com" },
      receiver: { name: "Sarah Wilson", id: "VOL789", email: "sarah@example.com" },
      lastMessage: "Can you help me with the application process?",
      messages: 23,
      status: "Active",
      createdAt: "2025-02-25T14:30:00",
      updatedAt: "2025-03-02T10:15:00"
    },
    {
      id: "CHAT002",
      sender: { name: "Maria Garcia", id: "USR125", email: "maria@example.com" },
      receiver: { name: "Tom Jackson", id: "VOL456", email: "tom@example.com" },
      lastMessage: "Thank you for your assistance yesterday!",
      messages: 45,
      status: "Active",
      createdAt: "2025-02-20T09:45:00",
      updatedAt: "2025-03-01T16:20:00"
    },
    {
      id: "CHAT003",
      sender: { name: "Robert Chen", id: "USR126", email: "robert@example.com" },
      receiver: { name: "Emma Smith", id: "VOL321", email: "emma@example.com" },
      lastMessage: "I've uploaded the documents you requested.",
      messages: 12,
      status: "Inactive",
      createdAt: "2025-02-28T11:20:00",
      updatedAt: "2025-02-28T18:10:00"
    },
    {
      id: "CHAT004",
      sender: { name: "Aisha Khan", id: "USR127", email: "aisha@example.com" },
      receiver: { name: "David Miller", id: "VOL654", email: "david@example.com" },
      lastMessage: "When is the next orientation session?",
      messages: 8,
      status: "Active",
      createdAt: "2025-03-01T13:40:00",
      updatedAt: "2025-03-02T09:30:00"
    },
    {
      id: "CHAT005",
      sender: { name: "James Wilson", id: "USR128", email: "james@example.com" },
      receiver: { name: "Linda Johnson", id: "VOL987", email: "linda@example.com" },
      lastMessage: "I need to reschedule our appointment.",
      messages: 31,
      status: "On Hold",
      createdAt: "2025-02-18T15:50:00",
      updatedAt: "2025-02-27T14:25:00"
    }
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState("updatedAt");
  const [sortDirection, setSortDirection] = useState("desc");

  // Sorting function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort chats
  const filteredChats = chats
    .filter(chat => 
      (statusFilter === "All" || chat.status === statusFilter) &&
      (chat.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       chat.receiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       chat.id.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      let compareA, compareB;
      
      if (sortField === "messages") {
        compareA = a.messages;
        compareB = b.messages;
      } else if (sortField === "sender") {
        compareA = a.sender.name;
        compareB = b.sender.name;
      } else if (sortField === "receiver") {
        compareA = a.receiver.name;
        compareB = b.receiver.name;
      } else if (sortField === "status") {
        compareA = a.status;
        compareB = b.status;
      } else if (sortField === "createdAt") {
        compareA = new Date(a.createdAt);
        compareB = new Date(b.createdAt);
      } else {
        compareA = new Date(a.updatedAt);
        compareB = new Date(b.updatedAt);
      }
      
      if (compareA < compareB) return sortDirection === "asc" ? -1 : 1;
      if (compareA > compareB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="ml-64 flex-grow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Chats Management</h1>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded flex items-center gap-2">
            <Download size={16} />
            Export Data
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search by ID, name, or email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <select
                  className="border border-gray-300 rounded-md py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort("id")}
                    >
                      <span>Chat ID</span>
                      {sortField === "id" && (
                        <ArrowUpDown size={14} className={sortDirection === "asc" ? "transform rotate-180" : ""} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort("sender")}
                    >
                      <span>Sender</span>
                      {sortField === "sender" && (
                        <ArrowUpDown size={14} className={sortDirection === "asc" ? "transform rotate-180" : ""} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort("receiver")}
                    >
                      <span>Receiver</span>
                      {sortField === "receiver" && (
                        <ArrowUpDown size={14} className={sortDirection === "asc" ? "transform rotate-180" : ""} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort("messages")}
                    >
                      <span>Messages</span>
                      {sortField === "messages" && (
                        <ArrowUpDown size={14} className={sortDirection === "asc" ? "transform rotate-180" : ""} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort("status")}
                    >
                      <span>Status</span>
                      {sortField === "status" && (
                        <ArrowUpDown size={14} className={sortDirection === "asc" ? "transform rotate-180" : ""} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center space-x-1"
                      onClick={() => handleSort("updatedAt")}
                    >
                      <span>Last Activity</span>
                      {sortField === "updatedAt" && (
                        <ArrowUpDown size={14} className={sortDirection === "asc" ? "transform rotate-180" : ""} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChats.map((chat) => (
                  <tr key={chat.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{chat.id}</div>
                      <div className="text-xs text-gray-500">
                        Created: {formatDate(chat.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{chat.sender.name}</div>
                      <div className="text-xs text-gray-500">ID: {chat.sender.id}</div>
                      <div className="text-xs text-gray-500">{chat.sender.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{chat.receiver.name}</div>
                      <div className="text-xs text-gray-500">ID: {chat.receiver.id}</div>
                      <div className="text-xs text-gray-500">{chat.receiver.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {chat.messages}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${chat.status === "Active" ? "bg-green-100 text-green-800" : 
                          chat.status === "Inactive" ? "bg-gray-100 text-gray-800" : 
                          "bg-yellow-100 text-yellow-800"}`}>
                        {chat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(chat.updatedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-orange-600 hover:text-orange-800">
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-800">
                          Archive
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredChats.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No chats found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredChats.length}</span> of{" "}
              <span className="font-medium">{chats.length}</span> chats
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
