import { ChevronDown, Upload } from "lucide-react";
import React, { useState } from "react";

const UploadModal = ({ onClose, setUploadType, uploadType }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
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
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="title"
						>
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
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="type"
						>
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
							<ChevronDown
								size={16}
								className="absolute right-3 top-3 text-gray-400 pointer-events-none"
							/>
						</div>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="description"
						>
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
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="file"
						>
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

export default UploadModal;