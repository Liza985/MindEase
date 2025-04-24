import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import VolHeader from "../../components/VolHeader";
import { getReviewsByVolId } from "../../redux/Actions/reviewAction";

const Reviews = () => {
	const dispatch = useDispatch();
	const { volReview: reviews, loading } = useSelector((state) => state.review);
	const [stats, setStats] = useState({
		averageRating: 0,
		totalReviews: 0,
		ratingDistribution: {
			5: 0,
			4: 0,
			3: 0,
			2: 0,
			1: 0,
		},
	});
	const [filteredReviews, setFilteredReviews] = useState([]);
	const [selectedUser, setSelectedUser] = useState("all");

	useEffect(() => {
		dispatch(getReviewsByVolId());
	}, [dispatch]);

	useEffect(() => {
		if (reviews) {
			setFilteredReviews(reviews);

			// Calculate statistics
			const totalReviews = reviews.length;
			const sumRatings = reviews.reduce((acc, curr) => acc + curr.rating, 0);
			const avgRating = totalReviews > 0 ? sumRatings / totalReviews : 0;

			// Calculate rating distribution
			const distribution = reviews.reduce(
				(acc, curr) => {
					acc[curr.rating] = (acc[curr.rating] || 0) + 1;
					return acc;
				},
				{ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
			);

			setStats({
				averageRating: avgRating.toFixed(1),
				totalReviews,
				ratingDistribution: distribution,
			});
		}
	}, [reviews]);

	const renderStars = (rating) => {
		return [...Array(5)].map((_, index) => (
			<FontAwesomeIcon
				key={index}
				icon={index < rating ? solidStar : regularStar}
				className={index < rating ? "text-yellow-400" : "text-gray-300"}
			/>
		));
	};

	const calculatePercentage = (count) => {
		return ((count / stats.totalReviews) * 100).toFixed(1);
	};

	const handleUserFilter = (userId) => {
		setSelectedUser(userId);
		if (userId === "all") {
			setFilteredReviews(reviews);
		} else {
			setFilteredReviews(
				reviews.filter((review) => review.userId._id === userId),
			);
		}
	};

	const uniqueUsers = [...new Set(reviews.map((review) => review.userId._id))];

	return (
		<>
			<VolHeader />
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-8">My Reviews</h1>

				{/* Stats Section */}
				<div className="bg-white rounded-lg shadow-md p-6 mb-8">
					<div className="grid md:grid-cols-2 gap-8">
						{/* Overall Rating */}
						<div className="text-center md:text-left">
							<div className="text-5xl font-bold text-gray-800 mb-2">
								{stats.averageRating}
							</div>
							<div className="flex justify-center md:justify-start mb-2">
								{renderStars(Math.round(stats.averageRating))}
							</div>
							<div className="text-gray-600">
								Based on {stats.totalReviews} reviews
							</div>
						</div>

						{/* Rating Distribution */}
						<div>
							{[5, 4, 3, 2, 1].map((rating) => (
								<div key={rating} className="flex items-center mb-2">
									<div className="w-12 text-sm text-gray-600">
										{rating} stars
									</div>
									<div className="flex-1 mx-4">
										<div className="h-2 bg-gray-200 rounded">
											<div
												className="h-2 bg-yellow-400 rounded"
												style={{
													width: `${calculatePercentage(
														stats.ratingDistribution[rating],
													)}%`,
												}}
											></div>
										</div>
									</div>
									<div className="w-12 text-sm text-gray-600">
										{stats.ratingDistribution[rating]}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* User Filter */}
				<div className="mb-6">
					<select
						value={selectedUser}
						onChange={(e) => handleUserFilter(e.target.value)}
						className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
					>
						<option value="all">All Reviews</option>
						{uniqueUsers.map((userId) => {
							const user = reviews.find((r) => r.userId._id === userId)?.userId;
							return (
								<option key={userId} value={userId}>
									{user?.firstName} {user?.lastName}&apos;s Reviews
								</option>
							);
						})}
					</select>
				</div>

				{/* Reviews List */}
				<div className="space-y-6">
					{filteredReviews.map((review, index) => (
						<div key={index} className="bg-white rounded-lg shadow-md p-6">
							<div className="flex items-center mb-4">
								<div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
									{review.userId?.firstName?.[0] || "U"}
								</div>
								<div className="ml-4">
									<h3 className="font-semibold text-gray-800">
										{review.userId?.firstName} {review.userId?.lastName}
									</h3>
									<div className="flex items-center">
										{renderStars(review.rating)}
										<span className="ml-2 text-sm text-gray-600">
											{new Date(review.createdAt).toLocaleDateString()}
										</span>
									</div>
								</div>
							</div>
							<p className="text-gray-600">{review.review}</p>
						</div>
					))}

					{filteredReviews.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-600">No reviews found</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Reviews;
