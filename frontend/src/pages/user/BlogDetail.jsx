import React from "react";
import Header from "../../components/Header";
// import { useRouter } from "next/router";
// import Link from "next/link";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetail = () => {
	// const router = useRouter();

	const { id } = useParams();
	const navigate = useNavigate();

	// Sample blog post data - in a real application, you would fetch this based on the ID
	const blogPost = {
		id: 1,
		title: "Understanding Anxiety in Everyday Life",
		excerpt:
			"Learn about common anxiety triggers and effective coping strategies for managing daily stress.",
		content: `
      <p>Anxiety is a normal and often healthy emotion. However, when a person regularly feels disproportionate levels of anxiety, it might become a medical disorder. Anxiety disorders form a category of mental health diagnoses that lead to excessive nervousness, fear, apprehension, and worry.</p>
      
      <h2>Common Anxiety Triggers</h2>
      <p>Understanding what triggers your anxiety is an important step in managing it. Some common triggers include:</p>
      <ul>
        <li><strong>Work pressure and deadlines</strong> - The fear of not meeting expectations or time constraints</li>
        <li><strong>Financial concerns</strong> - Worries about debt, expenses, or financial security</li>
        <li><strong>Health issues</strong> - Concerns about personal health or the health of loved ones</li>
        <li><strong>Social situations</strong> - Fear of judgment, criticism, or rejection</li>
        <li><strong>Major life changes</strong> - Moving, changing jobs, or relationship changes</li>
      </ul>
      
      <h2>Effective Coping Strategies</h2>
      <p>While anxiety can feel overwhelming, there are several evidence-based strategies that can help manage symptoms:</p>
      
      <h3>1. Deep Breathing Exercises</h3>
      <p>When anxiety strikes, our breathing becomes shallow and rapid. Deep breathing counters this response by activating the parasympathetic nervous system, which helps calm the body.</p>
      <p>Try the 4-7-8 technique: Inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds. Repeat this cycle 3-5 times.</p>
      
      <h3>2. Progressive Muscle Relaxation</h3>
      <p>This technique involves tensing and then relaxing different muscle groups in sequence. It helps reduce physical tension associated with anxiety.</p>
      
      <h3>3. Mindfulness Meditation</h3>
      <p>Practicing mindfulness helps bring attention to the present moment, reducing rumination about the past or worry about the future. Even 5-10 minutes daily can make a significant difference.</p>
      
      <h3>4. Cognitive Restructuring</h3>
      <p>This involves identifying negative thought patterns and challenging them with more balanced, realistic perspectives. Ask yourself: "What's the evidence for and against this thought?" and "What would I tell a friend in this situation?"</p>
      
      <h3>5. Regular Physical Exercise</h3>
      <p>Exercise releases endorphins, which are natural mood elevators. Aim for at least 30 minutes of moderate activity most days of the week.</p>
      
      <h2>When to Seek Professional Help</h2>
      <p>While self-help strategies can be effective for mild to moderate anxiety, it's important to know when to seek professional help. Consider reaching out to a mental health professional if:</p>
      <ul>import Header from './../../components/Header';

        <li>Your anxiety interferes with daily activities</li>
        <li>You experience panic attacks</li>
        <li>Your anxiety is accompanied by depression</li>
        <li>You're using substances to cope</li>
        <li>You have thoughts of self-harm</li>
      </ul>
      
      <p>Remember that seeking help is a sign of strength, not weakness. With the right support and strategies, anxiety can be effectively managed.</p>
    `,
		author: "Dr. Sarah Johnson",
		date: "February 28, 2025",
		readTime: "6 min read",
		category: "Mental Health",
		authorBio:
			"Dr. Sarah Johnson is a licensed clinical psychologist specializing in anxiety disorders with over 15 years of experience. She holds a Ph.D. in Clinical Psychology from Stanford University and maintains a private practice in Boston.",
		relatedPosts: [2, 3, 4],
	};

	// Sample data for related posts
	const relatedPostsData = [
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
	];

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

							<span
								className="hover:text-orange-600 cursor-pointer"
								onClick={() =>
									navigate(
										`/blogs/categories/${blogPost.category
											.toLowerCase()
											.replace(/\s+/g, "-")}`,
									)
								}
							>
								{blogPost.category}
							</span>
						</div>

						{/* Category and Read Time */}
						<div className="flex items-center text-sm text-orange-600 mb-4">
							<span className="bg-orange-50 px-2 py-1 rounded">
								{blogPost.category}
							</span>
							<span className="mx-2">•</span>
							<span>{blogPost.readTime}</span>
						</div>

						{/* Title */}
						<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
							{blogPost.title}
						</h1>

						{/* Meta info */}
						<div className="flex items-center mb-8 text-gray-500 text-sm">
							<span>By {blogPost.author}</span>
							<span className="mx-2">•</span>
							<span>{blogPost.date}</span>
						</div>

						{/* Article content */}
						<div
							className="prose prose-orange max-w-none"
							dangerouslySetInnerHTML={{ __html: blogPost.content }}
						/>

						{/* Author bio */}
						<div className="mt-12 pt-8 border-t border-gray-100">
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								About the Author
							</h3>
							<p className="text-gray-600">{blogPost.authorBio}</p>
						</div>

						{/* Share buttons */}
						<div className="mt-8 pt-6 border-t border-gray-100">
							<div className="flex items-center">
								<span className="text-gray-700 mr-4">Share this article:</span>
								<div className="flex space-x-3">
									<button className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
										</svg>
									</button>
									<button className="bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
										</svg>
									</button>
									<button className="bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Related Articles */}
					<div className="max-w-3xl mx-auto mt-12">
						<h2 className="text-2xl font-bold text-gray-800 mb-6">
							Related Articles
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{relatedPostsData.map((post) => (
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
										<h3 className="text-xl font-bold text-gray-800 mb-2">
											{post.title}
										</h3>
										<p className="text-gray-600 mb-4">{post.excerpt}</p>
										<div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
											<div className="text-sm text-gray-500">
												<span>By {post.author}</span>
											</div>
											<span
												className="text-orange-600 font-medium hover:text-orange-700 flex items-center cursor-pointer"
												onClick={() => navigate(`/blog/${post.id}`)}
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
							))}
						</div>
					</div>

					{/* Newsletter */}
					<div className="max-w-3xl mx-auto bg-orange-50 rounded-xl p-8 mt-12 text-center border border-orange-100">
						<h2 className="text-2xl font-bold text-gray-800 mb-2">
							Enjoyed this article?
						</h2>
						<p className="text-gray-600 mb-6">
							Subscribe to our newsletter for more insights on mental health and
							well-being.
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
