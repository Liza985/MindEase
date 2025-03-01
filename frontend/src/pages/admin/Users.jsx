import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Filter, Download, Trash, Edit, User } from 'lucide-react';
import AdminSidebar from '../../components/AdminSideBar';

const Users = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', joinDate: '2023-01-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', joinDate: '2023-02-22', status: 'Active' },
    { id: 3, name: 'Robert Johnson', email: 'robert.j@example.com', joinDate: '2023-03-10', status: 'Inactive' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', joinDate: '2023-04-05', status: 'Active' },
    { id: 5, name: 'Michael Wilson', email: 'michael.w@example.com', joinDate: '2023-05-18', status: 'Active' },
    { id: 6, name: 'Sarah Brown', email: 'sarah.b@example.com', joinDate: '2023-06-30', status: 'Pending' },
    { id: 7, name: 'David Miller', email: 'david.m@example.com', joinDate: '2023-07-12', status: 'Active' },
    { id: 8, name: 'Jennifer Taylor', email: 'jennifer.t@example.com', joinDate: '2023-08-25', status: 'Inactive' },
    { id: 9, name: 'Thomas Anderson', email: 'thomas.a@example.com', joinDate: '2023-09-14', status: 'Active' },
    { id: 10, name: 'Lisa Martinez', email: 'lisa.m@example.com', joinDate: '2023-10-03', status: 'Pending' },
  ]);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar/>
      <div className="w-64 flex-shrink-0"></div>
      
      <div className="flex-1">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">User Management</h1>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center text-orange-800 font-bold">
              A
            </div>
            <span className="text-gray-700">Admin</span>
          </div>
        </header>

        <main className="p-6 bg-orange-50">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-orange-700">Users</h2>
              <p className="text-gray-600">Manage all registered users</p>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center">
              <User size={18} className="mr-2" />
              Add New User
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              
              <div className="flex space-x-3">
                <div className="relative">
                  <button className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg bg-white">
                    <Filter size={18} />
                    <span>Filter</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
                
                <button className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg bg-white">
                  <Download size={18} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Name</span>
                        <ChevronDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Join Date</span>
                        <ChevronDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-800">{user.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(user.joinDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="p-1 rounded-full hover:bg-gray-100">
                            <Edit size={18} className="text-gray-600" />
                          </button>
                          <button className="p-1 rounded-full hover:bg-gray-100">
                            <Trash size={18} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">100</span> results
              </div>
              <div className="flex space-x-1">
                <button className="px-3 py-1 border border-gray-300 rounded-md flex items-center">
                  <ChevronLeft size={16} />
                </button>
                <button className="px-3 py-1 border border-gray-300 bg-orange-500 text-white rounded-md">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md flex items-center">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;