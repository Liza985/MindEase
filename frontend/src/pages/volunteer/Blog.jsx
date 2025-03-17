
import { useNavigate } from "react-router-dom";
import VolHeader from "../../components/VolHeader";

const Blog = () => {
	const navigate=useNavigate();
	const blogs = [
		{
			id: 1,
			title: "Effective Communication Strategies for Volunteers",
			author: "Jane Smith",
			date: "Feb 20, 2025",
			excerpt:
				"Learn how to effectively communicate with those seeking help and guidance...",
			image: "/api/placeholder/800/400",
		},
		{
			id: 2,
			title: "Building Trust in Virtual Mentoring Relationships",
			author: "Mark Johnson",
			date: "Feb 15, 2025",
			excerpt:
				"Discover techniques to establish trust and rapport in online mentoring sessions...",
			image: "/api/placeholder/800/400",
		},
		{
			id: 3,
			title: "Setting Boundaries as a Volunteer",
			author: "Lisa Wong",
			date: "Feb 10, 2025",
			excerpt:
				"How to maintain healthy boundaries while providing meaningful support...",
			image: "/api/placeholder/800/400",
		},
	];
	return (
		<>
			<VolHeader />

			<div className="flex min-h-screen">
				<div className="flex-1">
					<main className="p-6">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-orange-700">
								Latest Articles
							</h2>
							<button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition" onClick={(()=>navigate("/newPost"))}>
								Create New Post
							</button>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{blogs.map((blog) => (
								<div
									key={blog.id}
									className="bg-white rounded-lg shadow-md overflow-hidden"
								>
									<img
										src={blog.image}
										alt={blog.title}
										className="w-full h-48 object-cover"
									/>
									<div className="p-4">
										<h3 className="text-xl font-semibold text-orange-700 mb-2">
											{blog.title}
										</h3>
										<div className="text-sm text-gray-500 mb-2">
											By {blog.author} | {blog.date}
										</div>
										<p className="text-gray-600 mb-4">{blog.excerpt}</p>
										<button className="text-orange-500 font-medium hover:text-orange-600 transition">
											Read More
										</button>
									</div>
								</div>
							))}
						</div>
					</main>
				</div>
			</div>
			<footer className="bg-white shadow-sm border-t border-gray-200 p-4 text-center text-black-800">
				<p className="text-sm">
					&copy; 2025 MindEaseConnect. All rights reserved.
				</p>
			</footer>
		</>
	);
};

export default Blog;
