import { useState, useEffect } from "react"
import { Search, Download, Trash, Edit, UserIcon, X } from "lucide-react"
import AdminSidebar from "../../components/AdminSideBar"

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", joinDate: "2023-01-15", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", joinDate: "2023-02-22", status: "Active" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com", joinDate: "2023-03-10", status: "Inactive" },
    { id: 4, name: "Emily Davis", email: "emily.davis@example.com", joinDate: "2023-04-05", status: "Active" },
  ])

  const [formUser, setFormUser] = useState({ id: null, name: "", email: "", status: "Active", joinDate: "" })
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [userToDelete, setUserToDelete] = useState(null)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let filtered = [...users]

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter) {
      filtered = filtered.filter((user) => user.status === statusFilter)
    }

    setFilteredUsers(filtered)

    if (searchTerm && filtered.length === 0) {
      setNotFound(true)
      setTimeout(() => setNotFound(false), 2000)
    }
  }, [users, searchTerm, statusFilter])

  const handleSaveUser = () => {
    if (formUser.id) {
      setUsers(users.map((u) => (u.id === formUser.id ? formUser : u)))
    } else {
      const newUser = {
        ...formUser,
        id: Date.now(),
        joinDate: new Date().toISOString().split("T")[0],
      }
      setUsers([...users, newUser])
    }
    setShowForm(false)
    setFormUser({ id: null, name: "", email: "", status: "Active", joinDate: "" })
  }

  const handleEdit = (user) => {
    setFormUser(user)
    setShowForm(true)
  }

  const handleDelete = (user) => {
    setUserToDelete(user)
  }

  const confirmDeleteUser = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id))
    setUserToDelete(null)
  }

  const handleExport = () => {
    const headers = ["Name", "Email", "Join Date", "Status"]
    const rows = filteredUsers.map((user) => [user.name, user.email, user.joinDate, user.status])
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-GB")

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="w-64 flex-shrink-0" />
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-orange-700">Users</h2>
              <p className="text-gray-600">Manage all registered users</p>
            </div>
            <button
              onClick={() => {
                setFormUser({ id: null, name: "", email: "", status: "Active", joinDate: "" })
                setShowForm(true)
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <UserIcon size={18} className="mr-2" /> Add New User
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>

              <div className="flex space-x-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>

                <button
                  onClick={handleExport}
                  className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg bg-white"
                >
                  <Download size={18} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {notFound && <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg">User not found.</div>}

          {/* User  */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
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
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-800">{user.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4 text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(user.joinDate)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-600">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => handleEdit(user)} className="p-1 rounded-full hover:bg-gray-100">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(user)} className="p-1 rounded-full hover:bg-gray-100">
                          <Trash size={18} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Delete Confirmation */}
          {userToDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96 shadow-xl text-center">
                <h2 className="text-lg font-semibold mb-4">Delete User</h2>
                <p className="mb-4">
                  Are you sure you want to delete <strong>{userToDelete.name}</strong>?
                </p>
                <div className="flex justify-center space-x-4">
                  <button onClick={() => setUserToDelete(null)} className="px-4 py-2 bg-gray-200 rounded-lg">
                    Cancel
                  </button>
                  <button onClick={confirmDeleteUser} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form  */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96 shadow-xl relative">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                  <X size={20} />
                </button>
                <h2 className="text-lg font-semibold mb-4">{formUser.id ? "Edit User" : "Add New User"}</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={formUser.name}
                  onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
                  className="mb-3 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formUser.email}
                  onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
                  className="mb-3 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                />
                <input
                  type="date"
                  value={formUser.joinDate}
                  onChange={(e) => setFormUser({ ...formUser, joinDate: e.target.value })}
                  className="mb-3 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                />
                <select
                  value={formUser.status}
                  onChange={(e) => setFormUser({ ...formUser, status: e.target.value })}
                  className="mb-4 w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
                <button
                  onClick={handleSaveUser}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Users

