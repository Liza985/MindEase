import React from "react";

const LandingPage = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-orange-500 text-white shadow-md">
				<div className="container mx-auto px-4 py-3 flex justify-between items-center">
					<h1 className="text-2xl font-bold">MindEaseConnect</h1>
					<div className="space-x-4">
						<button
							onClick={() => navigate("/dashboard")}
							className="bg-white text-orange-600 px-4 py-2 rounded-md font-medium hover:bg-orange-100 transition"
						>
							MindEaseConnect Login
						</button>
					</div>
				</div>
			</header>

			<main className="flex-grow container mx-auto px-4 py-8">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-4xl font-bold text-orange-700 mb-6">
						Make a Difference Today
					</h2>
					<p className="text-xl text-gray-700 mb-8">
						Join our platform to connect with people who need your help and
						expertise. As a volunteer, you'll have the ability to accept or
						decline conversation requests.
					</p>

					<div className="grid md:grid-cols-3 gap-6 mb-12">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="text-orange-500 text-4xl mb-4 flex justify-center">
								<MessageSquare />
							</div>
							<h3 className="text-xl font-semibold mb-2">
								Meaningful Conversations
							</h3>
							<p className="text-gray-600">
								Connect with users and provide valuable guidance through our
								chat system.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="text-orange-500 text-4xl mb-4 flex justify-center">
								<Clock />
							</div>
							<h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
							<p className="text-gray-600">
								Choose when to volunteer and which requests to accept based on
								your availability.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<div className="text-orange-500 text-4xl mb-4 flex justify-center">
								<FileText />
							</div>
							<h3 className="text-xl font-semibold mb-2">Share Knowledge</h3>
							<p className="text-gray-600">
								Contribute to our blog section and help spread valuable
								information to the community.
							</p>
						</div>
					</div>

					<button
						onClick={() => navigate("/dashboard")}
						className="bg-orange-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-orange-700 transition shadow-md"
					>
						Start Volunteering
					</button>
				</div>
			</main>

			<footer className="bg-orange-600 text-white py-6">
				<div className="container mx-auto px-4 text-center">
					<p>© 2025 MindEaseConnect. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;
