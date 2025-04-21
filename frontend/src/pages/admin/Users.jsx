import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AdminSidebar from "../../components/AdminSideBar"
import ConfirmDelete from "../../components/AdminUserDelete"
import { Trash, Search, Download, X } from "lucide-react"
import { getAllUsers } from "../../redux/Actions/userAction"

const Users = () => {
  const dispatch = useDispatch()
  const { users = [], loading, error } = useSelector((state) => state.user)

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const [userToDelete, setUserToDelete] = useState(null)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    let filtered = [...users]
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredUsers(filtered)

    if (searchTerm && filtered.length === 0) {
      setNotFound(true)
      setTimeout(() => setNotFound(false), 2000)
    }
  }, [users, searchTerm])

  const handleDelete = (user) => {
    setUserToDelete(user)
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString("en-GB") // dd/mm/yyyy
  }

  const handleExport = () => {
    const headers = ["Name", "Email", "Phone", "Join Date"]
    const rows = filteredUsers.map((user) => [
      user.firstName + " " + user.lastName,
      user.email,
      user.phoneNumber,
      formatDate(user.createdAt)
    ])
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="w-64 flex-shrink-0" />

      <div className="flex-1">
        {/* Header (same as Volunteers page) */}
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
            <button
              onClick={handleExport}
              className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>

          {/* Search Bar */}
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
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                        <button
                          onClick={() => handleDelete(user)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Trash size={18} className="text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notification */}
            {notification.show && (
              <div
                className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${
                  notification.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <div className="ml-3 text-sm font-normal">{notification.message}</div>
                <button
                  type="button"
                  className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-gray-200"
                  onClick={() =>
                    setNotification({ show: false, message: "", type: "" })
                  }
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Confirm Delete Modal */}
            {userToDelete && (
              <ConfirmDelete
                user={userToDelete}
                onClose={() => setUserToDelete(null)}
                setNotification={setNotification}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Users
