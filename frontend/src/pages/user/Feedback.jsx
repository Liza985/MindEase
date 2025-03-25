import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
import {
	createUserFeedback,
	getAllUserFeedbacks,
} from "../../redux/Actions/feedbackAction";
import { toast } from "react-toastify";
import toastOptions, { successToastOptions } from "../../constants/toast";

const Feedback = () => {
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [feedbackText, setFeedbackText] = useState("");

	const { loading, userFeedbacks, feedbackError, feedbackMessage } =
		useSelector((state) => state.feedback);

	// Fetch all feedbacks when component mounts
	useEffect(() => {
		dispatch(getAllUserFeedbacks());
	}, [dispatch]);

	// Handle error and success messages
	useEffect(() => {
		if (feedbackError) {
			toast.error(feedbackError,toastOptions);
			dispatch({ type: "CLEAR_FEEDBACK_ERROR" });
		}
		if (
			feedbackMessage &&
			feedbackMessage !== "Feedback fetched successfully"
		) {
			toast.success(feedbackMessage,successToastOptions);
			dispatch({ type: "CLEAR_FEEDBACK_MESSAGE" });
			setIsModalOpen(false);
			setRating(0);
			setFeedbackText("");
		}
	}, [feedbackError, feedbackMessage, dispatch]);


	const handleSubmitFeedback = (e) => {
		e.preventDefault();
		if (rating === 0) {
			toast.error("Please select a rating");
			return;
		}
		const feedbackData = {
			rating,
			feedback: feedbackText,
		};
		dispatch(createUserFeedback(feedbackData));
	};


	return (
		<Layout>
			<div className="container mx-auto px-4 py-8">
				{/* Header Section */}
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">User Feedback</h1>
					<button
						onClick={() => setIsModalOpen(true)}
						className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
					>
						Give Feedback
					</button>
				</div>

				{/* Feedback Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{userFeedbacks &&
						userFeedbacks.map((feedback) => (
							<div
								key={feedback._id}
								className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
							>
								<div className="flex items-center mb-4">
									<img
										src={
											feedback.userId?.avatar?.url ||
											"https://randomuser.me/api/portraits/men/1.jpg"
										}
										alt={feedback.userId?.name || "User"}
										className="w-12 h-12 rounded-full mr-4"
									/>
									<div>
										<h3 className="font-semibold text-gray-800">
											{feedback.userId?.name || "Anonymous User"}
										</h3>
										<p className="text-sm text-gray-500">
											{new Date(feedback.createdAt).toLocaleDateString()}
										</p>
									</div>
								</div>
								<div className="mb-3">
									{[...Array(5)].map((_, index) => (
										<FontAwesomeIcon
											key={index}
											icon={faStar}
											className={`${
												index < feedback.rating
													? "text-yellow-400"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<p className="text-gray-600">{feedback.feedback}</p>
							</div>
						))}
				</div>

				{/* Feedback Modal */}
				{isModalOpen && (
					<div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
						<div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-2xl font-bold text-gray-800">
									Give Feedback
								</h2>
								<button
									onClick={() => setIsModalOpen(false)}
									className="text-gray-500 hover:text-gray-700"
								>
									<FontAwesomeIcon icon={faTimes} />
								</button>
							</div>

							<form onSubmit={handleSubmitFeedback}>
								{/* Rating Stars */}
								<div className="mb-6">
									<label className="block text-gray-700 mb-2">
										Your Rating
									</label>
									<div className="flex gap-2">
										{[...Array(5)].map((_, index) => {
											const ratingValue = index + 1;
											return (
												<FontAwesomeIcon
													key={index}
													icon={faStar}
													className={`cursor-pointer text-2xl ${
														ratingValue <= (hover || rating)
															? "text-yellow-400"
															: "text-gray-300"
													}`}
													onClick={() => setRating(ratingValue)}
													onMouseEnter={() => setHover(ratingValue)}
													onMouseLeave={() => setHover(rating)}
												/>
											);
										})}
									</div>
								</div>

								{/* Feedback Text */}
								<div className="mb-6">
									<label className="block text-gray-700 mb-2">
										Your Feedback
									</label>
									<textarea
										className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
										rows="4"
										value={feedbackText}
										onChange={(e) => setFeedbackText(e.target.value)}
										placeholder="Write your feedback here..."
										required
									></textarea>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									disabled={loading}
									className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
								>
									{loading ? "Submitting..." : "Submit Feedback"}
								</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Feedback;
