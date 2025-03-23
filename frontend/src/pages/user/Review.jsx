import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";

const Review = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);

	// Static review data
	const reviews = [
		{
			id: 1,
			userName: "John Doe",
			rating: 5,
			date: "2024-03-15",
			comment:
				"Excellent service! The counselor was very understanding and helpful.",
			userImage: "https://randomuser.me/api/portraits/men/1.jpg",
		},
		{
			id: 2,
			userName: "Jane Smith",
			rating: 4,
			date: "2024-03-14",
			comment: "Very professional approach. Would recommend to others.",
			userImage: "https://randomuser.me/api/portraits/women/2.jpg",
		},
		{
			id: 3,
			userName: "Mike Johnson",
			rating: 5,
			date: "2024-03-13",
			comment:
				"The platform is user-friendly and the counselors are very professional.",
			userImage: "https://randomuser.me/api/portraits/men/3.jpg",
		},
	];

	const handleSubmitReview = (e) => {
		e.preventDefault();
		// Handle review submission logic here
		setIsModalOpen(false);
		setRating(0);
	};

	return (
		<Layout>
			<div className="container mx-auto px-4 py-8">
				{/* Header Section */}
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">User Reviews</h1>
					<button
						onClick={() => setIsModalOpen(true)}
						className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
					>
						Write a Review
					</button>
				</div>

				{/* Reviews Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{reviews.map((review) => (
						<div
							key={review.id}
							className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
						>
							<div className="flex items-center mb-4">
								<img
									src={review.userImage}
									alt={review.userName}
									className="w-12 h-12 rounded-full mr-4"
								/>
								<div>
									<h3 className="font-semibold text-gray-800">
										{review.userName}
									</h3>
									<p className="text-sm text-gray-500">{review.date}</p>
								</div>
							</div>
							<div className="mb-3">
								{[...Array(5)].map((_, index) => (
									<FontAwesomeIcon
										key={index}
										icon={faStar}
										className={`${
											index < review.rating
												? "text-yellow-400"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>
							<p className="text-gray-600">{review.comment}</p>
						</div>
					))}
				</div>

				{/* Review Modal */}
				{isModalOpen && (
					<div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
						<div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-2xl font-bold text-gray-800">
									Write a Review
								</h2>
								<button
									onClick={() => setIsModalOpen(false)}
									className="text-gray-500 hover:text-gray-700"
								>
									<FontAwesomeIcon icon={faTimes} />
								</button>
							</div>

							<form onSubmit={handleSubmitReview}>
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

								{/* Review Text */}
								<div className="mb-6">
									<label className="block text-gray-700 mb-2">
										Your Review
									</label>
									<textarea
										className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
										rows="4"
										placeholder="Write your review here..."
										required
									></textarea>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
								>
									Submit Review
								</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Review;
