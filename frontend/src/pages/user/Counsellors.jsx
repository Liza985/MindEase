import React from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const CounselingPage = () => {
	const navigate=useNavigate();
	return (
		<>
			<div className="min-h-screen flex flex-col bg-orange-50 pt-20">
				<nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
					<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between h-20 w-full">
							<Header />
						</div>
					</div>
				</nav>

				<main className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
					<h2 className="text-2xl font-semibold text-gray-800">
						How would you like to connect?
					</h2>
					<p className="text-gray-600 mb-8">
						Choose the type of counseling session that works best for you.
					</p>

					<div className="flex flex-wrap gap-8 justify-center">
						<div className="bg-white rounded-lg p-8 w-72 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
							<div className="text-5xl mb-4">🤖</div>
							<h2 className="text-xl font-bold text-orange-500 mb-2">
								AI Counseling
							</h2>
							<p className="text-gray-600 mb-6">
								Connect with our AI assistant for immediate guidance and
								resources. Available 24/7 for your convenience.
							</p>
							<button onClick={() => navigate("/aichat")} 
							className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300">
								Start AI Chat
							</button>
						</div>

						<div className="bg-white rounded-lg p-8 w-72 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
							<div className="text-5xl mb-4">👤</div>
							<h2 className="text-xl font-bold text-orange-300 mb-2">
								Human Counselor
							</h2>
							<p className="text-gray-600 mb-6">
								Connect with a certified counselor for personalized support and
								professional guidance.
							</p>
							<button className="bg-orange-300 hover:bg-orange-400 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300">
								Chat with Counselor
							</button>
						</div>
					</div>
				</main>

				<footer className="bg-white text-black text-center py-4 mt-8">
					<p>&copy; 2025 MindEase. All rights reserved.</p>
				</footer>
			</div>
		</>
	);
};

export default CounselingPage;

