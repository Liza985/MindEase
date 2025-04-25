import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogByTopic, getBlogsById } from "../../redux/Actions/blogAction";

const BlogDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { blogById, topicBlog, loading } = useSelector((state) => state.blog);

	useEffect(() => {
		if (id) {
			dispatch(getBlogsById(id));
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (blogById?.topic?.[0]) {
			dispatch(getBlogByTopic(blogById.topic[0]));
		}
	}, [dispatch, blogById?.topic]);

	if (loading) {
		return <div className="pt-20 text-center">Loading...</div>;
	}

	return (
		<>
			<div className="min-h-screen flex flex-col bg-orange-50 pt-20">
				{/* Header */}
				<Header />

				{/* Blog Content */}
				<main className="container mx-auto px-4 py-8 flex-grow">
					<div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
						{/* Breadcrumb */}
						<div className="flex items-center text-sm text-gray-500 mb-6">
							<span
								className="hover:text-orange-600 cursor-pointer"
								onClick={() => navigate("/blogs")}
							>
								Blogs
							</span>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 mx-2"
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

							<span className="text-orange-600">{blogById?.topic?.[0]}</span>
						</div>

						{/* Blog Image */}
						{blogById?.image?.url && (
							<img
								src={blogById.image.url}
								alt={blogById.title}
								className="w-full h-64 object-contain rounded-lg mb-6"
							/>
						)}

						{/* Topics */}
						<div className="flex flex-wrap gap-2 mb-4">
							{blogById?.topic?.map((topic, index) => (
								<span
									key={index}
									className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
								>
									{topic}
								</span>
							))}
						</div>

						{/* Title */}
						<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
							{blogById?.title}
						</h1>

						{/* Meta info */}
						<div className="flex items-center mb-8 text-gray-500 text-sm">
							<span>
								By {blogById?.volunteerId?.firstName}{" "}
								{blogById?.volunteerId?.lastName}
							</span>
							<span className="mx-2">•</span>
							<span>{new Date(blogById?.createdAt).toLocaleDateString()}</span>
						</div>

						{/* Description */}
						<p className="text-gray-600 text-lg mb-6">
							{blogById?.description}
						</p>

						{/* Article content */}
						<div
							className="prose prose-orange max-w-none"
							dangerouslySetInnerHTML={{ __html: blogById?.body }}
						/>

						{/* Related Articles */}
						{topicBlog && topicBlog.length > 0 && (
							<div className="mt-12">
								<h2 className="text-2xl font-bold text-gray-800 mb-6">
									Related Articles
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{topicBlog.map(
										(post) =>
											post._id !== id && (
												<div
													key={post._id}
													className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
												>
													<div className="p-6">
														<div className="flex flex-wrap gap-2 mb-2">
															{post.topic.map((topic, index) => (
																<span
																	key={index}
																	className="bg-orange-50 text-orange-600 px-2 py-1 rounded text-sm"
																>
																	{topic}
																</span>
															))}
														</div>
														<h3 className="text-xl font-bold text-gray-800 mb-2">
															{post.title}
														</h3>
														<p className="text-gray-600 mb-4">
															{post.description}
														</p>
														<div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
															<div className="text-sm text-gray-500">
																<span>
																	By {post.volunteerId?.firstName}{" "}
																	{post.volunteerId?.lastName}
																</span>
															</div>
															<span
																className="text-orange-600 font-medium hover:text-orange-700 flex items-center cursor-pointer"
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
															</span>
														</div>
													</div>
												</div>
											),
									)}
								</div>
							</div>
						)}
					</div>
				</main>

				{/* Back to top button */}
				<div className="fixed bottom-8 right-8">
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className="bg-orange-600 text-white w-10 h-10 rounded-full shadow-md hover:bg-orange-700 transition-colors duration-300 flex items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 15l7-7 7 7"
							/>
						</svg>
					</button>
				</div>
			</div>

			<footer className="bg-white text-black text-center py-4">
				<p>&copy; 2025 MindEase. All rights reserved.</p>
			</footer>
		</>
	);
};

export default BlogDetail;
