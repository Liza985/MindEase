import React from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
	const navigate=useNavigate();
	// Sample blog posts data
	const blogPosts = [
		{
			id: 1,
			title: "Understanding Anxiety in Everyday Life",
			excerpt:
				"Learn about common anxiety triggers and effective coping strategies for managing daily stress.",
			author: "Dr. Sarah Johnson",
			date: "February 28, 2025",
			readTime: "6 min read",
			category: "Mental Health",
		},
		{
			id: 2,
			title: "The Power of Mindfulness Meditation",
			excerpt:
				"Discover how just 10 minutes of daily mindfulness practice can transform your mental well-being.",
			author: "Mark Thompson",
			date: "February 24, 2025",
			readTime: "8 min read",
			category: "Wellness",
		},
		{
			id: 3,
			title: "Building Resilience Through Difficult Times",
			excerpt:
				"Practical techniques to strengthen your emotional resilience when facing life's challenges.",
			author: "Dr. Emily Chen",
			date: "February 20, 2025",
			readTime: "5 min read",
			category: "Personal Growth",
		},
		{
			id: 4,
			title: "Improving Communication in Relationships",
			excerpt:
				"Expert advice on how to foster healthier communication patterns with your loved ones.",
			author: "James Wilson, LMFT",
			date: "February 15, 2025",
			readTime: "7 min read",
			category: "Relationships",
		},
	];

	// Mild dark orange color
	const mildDarkOrange = "rgb(217, 119, 6)"; // Equivalent to a mild dark orange

	return (
		<>
			<div className="min-h-screen flex flex-col bg-orange-50 pt-20">
				{/* Header */}
				<Header />

				{/* Blog Header */}
				<div className="bg-orange-600 text-white py-12 px-4">
					<div className="container mx-auto text-center">
						<h1 className="text-4xl font-bold mb-4">MindEase Blogs</h1>
						<p className="text-xl max-w-2xl mx-auto">
							Insights, tips and expert advice to support your mental health and
							well-being journey
						</p>
					</div>
				</div>

				{/* Categories */}
				<div className="container mx-auto px-4 py-6">
					<div className="flex flex-wrap justify-center gap-4 mb-8">
						<button className="bg-orange-600 text-white px-4 py-2 rounded-full">
							All Topics
						</button>
						<button className="bg-white text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-50">
							Mental Health
						</button>
						<button className="bg-white text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-50">
							Wellness
						</button>
						<button className="bg-white text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-50">
							Personal Growth
						</button>
						<button className="bg-white text-orange-600 border border-orange-600 px-4 py-2 rounded-full hover:bg-orange-50">
							Relationships
						</button>
					</div>
				</div>

				{/* Blog Posts */}
				<main className="container mx-auto px-4 py-8 flex-1">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{blogPosts.map((post) => (
							<div
								key={post.id}
								className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
							>
								<div className="p-6">
									<div className="flex items-center text-sm text-orange-600 mb-2">
										<span className="bg-orange-50 px-2 py-1 rounded">
											{post.category}
										</span>
										<span className="mx-2">•</span>
										<span>{post.readTime}</span>
									</div>
									<h2 className="text-xl font-bold text-gray-800 mb-2">
										{post.title}
									</h2>
									<p className="text-gray-600 mb-4">{post.excerpt}</p>
									<div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
										<div className="text-sm text-gray-500">
											<span>By {post.author}</span>
											<span className="mx-1">•</span>
											<span>{post.date}</span>
										</div>
										<button className="text-orange-600 font-medium hover:text-orange-700 flex items-center" onClick={() => navigate(`/blog/${post.id}`)}>
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

					{/* Newsletter */}
					<div className="bg-orange-50 rounded-xl p-8 mt-12 text-center border border-orange-100">
						<h2 className="text-2xl font-bold text-gray-800 mb-2">
							Subscribe to Our Newsletter
						</h2>
						<p className="text-gray-600 mb-6">
							Get the latest articles, resources and tips to help you maintain
							your mental well-being.
						</p>
						<div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
							<input
								type="email"
								placeholder="Your email address"
								className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-orange-600"
							/>
							<button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors duration-300">
								Subscribe
							</button>
						</div>
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
