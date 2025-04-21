import { useDispatch } from "react-redux"

import { X } from "lucide-react"
import { motion } from "framer-motion"
import { deleteUserAccount, getAllUsers } from "../redux/Actions/userAction"

const ConfirmDelete = ({ user, onClose, setNotification }) => {
  const dispatch = useDispatch()

  const handleConfirm = async () => {
    try {
      await dispatch(deleteUserAccount(user._id)).unwrap()
      dispatch(getAllUsers())

      setNotification({
        show: true,
        message: `${user.name} has been deleted.`,
        type: "success",
      })
    } catch (error) {
      setNotification({
        show: true,
        message: `Failed to delete user: ${error.message}`,
        type: "error",
      })
    } finally {
      onClose()
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" })
      }, 3000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Confirm Delete</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
          </button>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          Are you sure you want to delete <strong>{user.name}</strong>?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ConfirmDelete
