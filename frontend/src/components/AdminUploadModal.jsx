import { ChevronDown, Upload } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContent } from "../redux/Actions/activityAction";

const UploadModal = ({ onClose, setUploadType, uploadType }) => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [status, setStatus] = useState("Published");
	const [link, setLink] = useState("");
	const [file, setFile] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("category", category);
		formData.append("status", status);
		formData.append("link", link);
		formData.append("contentType", uploadType);
		if (file) formData.append("file", file);

		dispatch(addContent(formData));
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold text-orange-700">
						Add New Content
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						&times;
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					{/* Title */}
					<div className="mb-4">
						<label className="block text-sm font-bold text-gray-700 mb-1">
							Title
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full px-3 py-2 border rounded-md"
							required
						/>
					</div>

					{/* Description */}
					<div className="mb-4">
						<label className="block text-sm font-bold text-gray-700 mb-1">
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full px-3 py-2 border rounded-md"
							rows="3"
							required
						/>
					</div>

					{/* Content Type */}
					<div className="mb-4">
						<label className="block text-sm font-bold text-gray-700 mb-1">
							Content Type
						</label>
						<div className="relative">
							<select
								value={uploadType}
								onChange={(e) => setUploadType(e.target.value)}
								className="w-full px-3 py-2 border rounded-md appearance-none"
								required
							>
								<option value="">Select Type</option>
								<option value="Video">Video</option>
								<option value="PDF Document">PDF Document</option>
								<option value="Article">Article</option>
								<option value="Image">Image</option>
							</select>
							<ChevronDown
								size={16}
								className="absolute right-3 top-3 text-gray-400 pointer-events-none"
							/>
						</div>
					</div>

					{/* Category */}
					<div className="mb-4">
						<label className="block text-sm font-bold text-gray-700 mb-1">
							Category
						</label>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="w-full px-3 py-2 border rounded-md"
							required
						>
							<option value="">Select Category</option>
							<option value="Assistance Programs">Assistance Programs</option>
							<option value="Volunteers">Volunteers</option>
							<option value="Resources">Resources</option>
							<option value="Events">Events</option>
							<option value="Community">Community</option>
						</select>
					</div>

					{/* Status */}
					<div className="mb-4">
						<label className="block text-sm font-bold text-gray-700 mb-1">
							Status
						</label>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className="w-full px-3 py-2 border rounded-md"
						>
							<option value="Published">Published</option>
							<option value="Draft">Draft</option>
							<option value="Under Review">Under Review</option>
						</select>
					</div>

					{/* Optional Link */}
					<div className="mb-4">
						<label className="block text-sm font-bold text-gray-700 mb-1">
							Optional Link
						</label>
						<input
							type="url"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							className="w-full px-3 py-2 border rounded-md"
							placeholder="https://example.com/resource"
						/>
					</div>

					{/* File Upload */}
					<div className="mb-6">
						<label className="block text-sm font-bold text-gray-700 mb-2">
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

					{/* Actions */}
					<div className="flex justify-end space-x-3">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
						>
							Upload
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UploadModal;
