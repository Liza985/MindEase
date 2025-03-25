import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../redux/Actions/blogAction";

const Blogs = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { message, error, blogs, loading } = useSelector((state) => state.blog);

	useEffect(() => {
		dispatch(getAllBlogs());
	}, []);

	return (
		<>
			<div className="min-h-screen flex flex-col bg-orange-50 pt-20">
				<Header />

				{/* Blog Header */}
				<div className="bg-orange-600 text-white py-12 px-4">
					<div className="container mx-auto text-center">
						<h1 className="text-4xl font-bold mb-4">MindEase Blogs</h1>
						<p className="text-xl max-w-2xl mx-auto">
							Insights, tips and expert advice to support your mental health and
							well-being journey.
						</p>
					</div>
				</div>

				{/* Blog Posts */}
				<main className="container mx-auto px-4 py-8 flex-1">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{blogs?.map((post) => (
							<div
								key={post?._id}
								className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
							>
								{/* Blog Image */}
								<img
									src={post?.image?.url } // Fallback to default image if not available
									alt={post?.title}
									className="w-full h-48 object-fill rounded-t-xl"
								/>
								<div className="p-6">
									<div className="flex items-center text-sm text-orange-600 mb-2">
										<span className="bg-orange-50 px-2 py-1 rounded">
											{post?.category}
										</span>
										<span className="mx-2">•</span>
										<span>{post?.readTime}</span>
									</div>
									<h2 className="text-xl font-bold text-gray-800 mb-2">
										{post?.title}
									</h2>
									<p className="text-gray-600 mb-4">{post?.topic}</p>
									<div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
										<div className="text-sm text-gray-500">
											<span>
												By {post?.volunteerId?.firstName} {post?.volunteerId?.lastName}
											</span>
											<span className="mx-1">•</span>
											<span>{post?.createdAt?.split("T")[0]}</span>
										</div>
										<button
											className="text-orange-600 font-medium hover:text-orange-700 flex items-center"
											onClick={() => navigate(`/blog/${post._id}`)}
										>
											Read More
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4 ml-1"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
			<footer className="bg-white text-black text-center py-4 mt-8">
				<p>&copy; 2025 MindEase. All rights reserved.</p>
			</footer>
		</>
	);
};

export default Blogs;
