import React, { useState } from "react";
import { X, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux"; // Import the useDispatch hook
import { updateContent } from "../redux/Actions/activityAction";

const ContentViewModal = ({ item, onClose }) => {
	if (!item) return null;

	const [isEditing, setIsEditing] = useState(false);
	const [editedItem, setEditedItem] = useState(item);
	const dispatch = useDispatch(); // Initialize dispatch
	const { loading, error } = useSelector((state) => state.content);

	const handleEditChange = (e) => {
		const { name, value } = e.target;

		// Prevent editing the author field
		if (name === "author") return;

		setEditedItem((prev) => ({ ...prev, [name]: value }));
	};

	const handleSaveEdit = () => {
		// Dispatch the updated item to the Redux store
		dispatch(updateContent(item._id, editedItem));
		setIsEditing(false); // Exit edit mode after saving
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative border border-gray-200">
				<div className="absolute top-4 right-4 flex space-x-3">
					<button
						onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
						title={isEditing ? "Save Changes" : "Edit Content"}
						className="text-orange-600 hover:text-orange-800 transition-colors"
					>
						<Edit size={20} />
					</button>
					<button
						onClick={onClose}
						title="Close"
						className="text-gray-400 hover:text-gray-700 transition-colors"
					>
						<X size={20} />
					</button>
				</div>

				<h2 className="text-2xl font-bold text-gray-800 mb-4">
					{isEditing ? (
						<input
							type="text"
							name="title"
							value={editedItem.title}
							onChange={handleEditChange}
							className="text-2xl font-bold w-full bg-transparent border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none"
						/>
					) : (
						editedItem.title
					)}
				</h2>

				<div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
					<div>
						<strong>Category:</strong>{" "}
						{isEditing ? (
							<select
								name="category"
								value={editedItem.category}
								onChange={handleEditChange}
								className="bg-transparent border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none"
							>
								<option value="Assistance Programs">Assistance Programs</option>
								<option value="Volunteers">Volunteers</option>
								<option value="Resources">Resources</option>
								<option value="Events">Events</option>
								<option value="Community">Community</option>
							</select>
						) : (
							editedItem.category
						)}
					</div>
					<div>
						<strong>Type:</strong>{" "}
						{isEditing ? (
							<select
								name="contentType"
								value={editedItem.contentType}
								onChange={handleEditChange}
								className="bg-transparent border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none"
							>
								<option value="Video">Video</option>
								<option value="PDF Document">PDF Document</option>
								<option value="Image">Image</option>
								<option value="Article">Article</option>
							</select>
						) : (
							editedItem.contentType
						)}
					</div>
					<div>
						<strong>Status:</strong>{" "}
						{isEditing ? (
							<select
								name="status"
								value={editedItem.status}
								onChange={handleEditChange}
								className="bg-transparent border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none"
							>
								<option value="Published">Published</option>
								<option value="Draft">Draft</option>
								<option value="Under Review">Under Review</option>
							</select>
						) : (
							editedItem.status
						)}
					</div>
					<div>
						<strong>Author:</strong>{" "}
						<span className="text-gray-600">{editedItem.author}</span>
					</div>
				</div>

				<div className="text-sm text-gray-700 mb-4">
					<strong>Description:</strong>
					{isEditing ? (
						<textarea
							name="description"
							value={editedItem.description}
							onChange={handleEditChange}
							className="mt-1 w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:outline-none p-2"
							rows={4}
						/>
					) : (
						<p className="mt-1 whitespace-pre-wrap leading-relaxed">
							{editedItem.description}
						</p>
					)}
				</div>

				{/* Link field: Editable when in editing mode */}
				<div className="text-sm text-gray-700 mb-4">
					<strong>Link:</strong>{" "}
					{isEditing ? (
						<input
							type="url"
							name="link"
							value={editedItem.link}
							onChange={handleEditChange}
							className="mt-1 w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:outline-none p-2"
						/>
					) : (
						<a
							href={editedItem.link}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:text-blue-800 text-sm underline"
						>
							{editedItem.link}
						</a>
					)}
				</div>

				{item.media?.url && !isEditing && (
					<div className="mt-6">
						<img
							src={item.media.url}
							alt="content media"
							className="rounded-md max-h-64 object-contain mx-auto"
						/>
					</div>
				)}

				{isEditing && (
					<div className="flex justify-end mt-4">
						<button
							onClick={handleSaveEdit}
							className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
						>
							Save Changes
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ContentViewModal;
