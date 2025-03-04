import {
	Activity,
	BookOpen,
	Calendar,
	Coffee,
	Heart,
	Moon,
	Music,
	Play,
	PlayCircle,
	Star,
	X,
} from "lucide-react";
import React, { useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const WellnessHub = () => {
	const navigate = useNavigate(); // ✅ Ensure this is inside the component

	const [activeTab, setActiveTab] = useState("all");
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [upcomingEvents, setUpcomingEvents] = useState([
		{
			id: 1,
			title: "Live Meditation Session",
			date: "March 5, 2025",
			time: "7:00 PM - 8:00 PM",
			host: "Dr. Emma Rivers",
			participants: 24,
			category: "mindfulness",
		},
		{
			id: 2,
			title: "Stress Management Workshop",
			date: "March 10, 2025",
			time: "6:30 PM - 8:30 PM",
			host: "James Wilson",
			participants: 18,
			category: "self-care",
		},
		{
			id: 3,
			title: "Sound Healing Circle",
			date: "March 15, 2025",
			time: "5:00 PM - 6:00 PM",
			host: "Maria Sanchez",
			participants: 12,
			category: "relaxation",
		},
	]);

	const wellnessResources = [
		{
			title: "Guided Meditation",
			description: "Find inner peace with our expert-led sessions",
			icon: <Moon className="w-6 h-6 text-purple-500" />,
			category: "mindfulness",
			imageUrl:
				"https://img.freepik.com/premium-vector/middleaged-man-sits-quiet-room-eyes-closed-while-listening-customized-playlist-songs_216520-113520.jpg",
		},
		{
			title: "Mood Tracking",
			description: "Monitor and understand your emotional patterns",
			icon: <BookOpen className="w-6 h-6 text-blue-500" />,
			category: "self-care",
			imageUrl:
				"https://media.licdn.com/dms/image/v2/D4D12AQFpNaeNZNPBbg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1679902040405?e=2147483647&v=beta&t=2DkEoMD2xEPkjjheyLpNXekOJnNUv_jYcLVfnMQhduU",
		},
		{
			title: "Calming Sounds",
			description: "Curated playlists for relaxation and focus",
			icon: <Music className="w-6 h-6 text-green-500" />,
			category: "relaxation",
			imageUrl:
				"https://krisp.ai/blog/wp-content/uploads/2019/08/Top-relaxing-sounds-to-help-you-focus-1.jpg",
		},
		{
			title: "Mind-Body Exercise",
			description: "Holistic workouts for mental clarity",
			icon: <Activity className="w-6 h-6 text-orange-500" />,
			category: "physical",
			imageUrl:
				"https://img.freepik.com/premium-vector/retired-individual-maintaining-their-health-mobility-by-participating-virtual-workout_216520-81394.jpg",
		},
	];

	const wellnessVideos = [
		{
			title: "Morning Meditation Routine",
			duration: "15 mins",
			youtubeUrl: "https://www.youtube.com/embed/KJwYBJMSbPI",
			category: "Featured",
			views: "10.5k",
		},
		{
			title: "Stress Relief Breathing",
			duration: "10 mins",
			youtubeUrl: "https://www.youtube.com/embed/inpok4MKVLM",
			category: "Popular",
			views: "8.2k",
		},
		{
			title: "Mindful Movement Flow",
			duration: "20 mins",
			youtubeUrl: "https://www.youtube.com/embed/qFZKK7K52uQ",
			category: "New",
			views: "5.7k",
		},
	];

	const [formData, setFormData] = useState({
		name: "",
		text: "",
		rating: 5,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleRatingChange = (newRating) => {
		setFormData({
			...formData,
			rating: newRating,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/testimonials", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSubmitMessage("Thank you for your testimonial!");
				setFormData({ name: "", text: "", rating: 5 });
			} else {
				setSubmitMessage(
					"There was an error submitting your testimonial. Please try again.",
				);
			}
		} catch (error) {
			setSubmitMessage(
				"There was an error submitting your testimonial. Please try again.",
			);
			console.error("Error submitting testimonial:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const VideoModal = ({ video, isOpen, onClose }) => {
		if (!isOpen || !video) return null;

		return (
			<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
				<div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full relative">
					<div className="relative pt-[56.25%]">
						<iframe
							className="absolute top-0 left-0 w-full h-full"
							src={video.youtubeUrl}
							title={video.title}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
					<div className="p-6">
						<h3 className="text-xl font-semibold">{video.title}</h3>
						<p className="text-gray-600">
							{video.category} • {video.views} views
						</p>
					</div>
					<button
						onClick={onClose}
						className="absolute top-2 right-2 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition"
					>
						<X className="w-6 h-6" />
					</button>
				</div>
			</div>
		);
	};

	const YouTubeThumbnail = ({ video, onClick }) => {
		return (
			<div
				className="relative w-full h-48 bg-gray-200 cursor-pointer"
				onClick={onClick}
			>
				<img
					src="https://via.placeholder.com/640x360"
					alt={video.title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all">
					<PlayCircle className="w-16 h-16 text-white" />
				</div>
			</div>
		);
	};

	const WaveBackground = () => (
		<div className="absolute inset-0 bg-white overflow-hidden mt-10">
			<div className="absolute w-full h-full">
				<svg
					className="absolute w-[200%] left-[-50%] animate-[wave_20s_linear_infinite]"
					viewBox="0 0 2000 200"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill="rgba(191, 219, 254, 0.2)"
						d="M-200,0 Q400,80 800,30 T1800,60 L1800,200 L-200,200 Z"
					>
						<animate
							attributeName="d"
							dur="10s"
							repeatCount="indefinite"
							values="M-200,0 Q400,80 800,30 T1800,60 L1800,200 L-200,200 Z;
                      M-200,0 Q400,30 800,80 T1800,40 L1800,200 L-200,200 Z;
                      M-200,0 Q400,80 800,30 T1800,60 L1800,200 L-200,200 Z"
						/>
					</path>
				</svg>
			</div>
			<div className="absolute w-full h-full">
				<svg
					className="absolute w-[200%] left-[-50%] animate-[wave_15s_linear_infinite]"
					viewBox="0 0 2000 200"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill="rgba(147, 197, 253, 0.2)"
						d="M-200,40 Q400,100 800,50 T1800,80 L1800,200 L-200,200 Z"
					>
						<animate
							attributeName="d"
							dur="15s"
							repeatCount="indefinite"
							values="M-200,40 Q400,100 800,50 T1800,80 L1800,200 L-200,200 Z;
                      M-200,40 Q400,50 800,100 T1800,60 L1800,200 L-200,200 Z;
                      M-200,40 Q400,100 800,50 T1800,80 L1800,200 L-200,200 Z"
						/>
					</path>
				</svg>
			</div>
			<div className="absolute w-full h-full">
				<svg
					className="absolute w-[200%] left-[-50%] animate-[wave_12s_linear_infinite]"
					viewBox="0 0 2000 200"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill="rgba(96, 165, 250, 0.1)"
						d="M-200,70 Q400,120 800,70 T1800,100 L1800,200 L-200,200 Z"
					>
						<animate
							attributeName="d"
							dur="20s"
							repeatCount="indefinite"
							values="M-200,70 Q400,120 800,70 T1800,100 L1800,200 L-200,200 Z;
                      M-200,70 Q400,70 800,120 T1800,80 L1800,200 L-200,200 Z;
                      M-200,70 Q400,120 800,70 T1800,100 L1800,200 L-200,200 Z"
						/>
					</path>
				</svg>
			</div>
		</div>
	);

	// New progress tracker component
	const ProgressTracker = () => {
		const [streakDays, setStreakDays] = useState(7);
		const [todayComplete, setTodayComplete] = useState(false);

		return (
			<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
				<h3 className="text-xl font-semibold mb-4 flex items-center">
					<Activity className="w-6 h-6 text-orange-300 mr-2" />
					Your Wellness Journey
				</h3>

				<div className="flex items-center justify-between mb-6">
					<div>
						<p className="text-gray-600">Current Streak</p>
						<p className="text-3xl font-bold text-black-600">
							{streakDays} days
						</p>
					</div>
					<div className="text-right">
						<p className="text-gray-600">Today's Progress</p>
						<button
							className={`px-4 py-2 rounded-md ${
								todayComplete
									? "bg-green-500 text-white"
									: "bg-gray-200 text-gray-700"
							}`}
							onClick={() => setTodayComplete(!todayComplete)}
						>
							{todayComplete ? "Completed" : "Mark Complete"}
						</button>
					</div>
				</div>

				<div className="flex space-x-1 mb-2">
					{[...Array(7)].map((_, i) => (
						<div
							key={i}
							className={`h-2 flex-1 rounded-full ${
								i < streakDays ? "bg-orange-300" : "bg-gray-200"
							}`}
						></div>
					))}
				</div>
				<p className="text-xs text-gray-500 text-right">7-day goal</p>
			</div>
		);
	};

	const scrollToResources = () => {
		document.getElementById("resources-section")?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};
	const filteredResources =
		activeTab === "all"
			? wellnessResources
			: wellnessResources.filter((resource) => resource.category === activeTab);


	return (
		<>
			<Header />
			<div className="min-h-screen bg-gradient-to-b from-white-50 to-orange-50 pt-16">
				{/* Hero Section */}
				<div className="relative h-96 mb-16 overflow-hidden">
					<WaveBackground />
					<div className="relative z-10 h-full flex items-center justify-center mt-10">
						<div className="text-center text-black p-8 max-w-4xl mx-auto">
							<h1 className="text-5xl sm:text-1xl font-bold mb-6">
								Welcome to Your Wellness Journey
							</h1>
							<p className="text-xl max-w-2xl mx-auto mb-8">
								Discover peace, balance, and inner harmony through our curated
								wellness experiences
							</p>
							<div className="flex flex-col sm:flex-row justify-center gap-4">
								<button
									onClick={scrollToResources}
									className="bg-white hover:bg-gray-100 text-black-600 px-8 py-3 rounded-lg font-medium transition shadow hover:shadow-md"
								>
									Explore Resources
								</button>
							</div>
						</div>
					</div>
				</div>

				<section id="resources-section" className="py-16 bg-gradient-to-b from-white to-orange-50">
			<div className="max-w-6xl mx-auto px-6 mb-16">
				<h2 className="text-3xl font-bold text-orange-900 text-center mb-10">
					Explore Wellness Resources
				</h2>

				{/* Tabs Navigation */}
				<div className="flex space-x-4 mb-8 bg-white rounded-lg p-2 shadow-md">
					{["all", "mindfulness", "self-care", "relaxation", "physical"].map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`px-4 py-2 rounded-md flex-1 capitalize transition-colors ${
								activeTab === tab ? "bg-orange-500 text-white" : "hover:bg-orange-50"
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Display Filtered Resources */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{filteredResources.map((resource, index) => (
						<div
							key={index}
							className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
							onClick={() => navigate(`/resource/${encodeURIComponent(resource.title)}`)}
						>
							{/* Image */}
							<img src={resource.imageUrl} alt={resource.title} className="w-full h-48 object-cover" />

							{/* Text Content */}
							<div className="p-6">
								<h3 className="text-xl font-semibold">{resource.title}</h3>
								<p className="text-gray-600">{resource.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
				{/* Featured Section */}
				<div className="max-w-6xl mx-auto px-6 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
					{[
						{
							icon: Moon,
							title: "Daily Meditation",
							text: "Start your day with mindfulness",
							bg: "from-purple-500 to-blue-500",
						},
						{
							icon: Heart,
							title: "Self-Care Rituals",
							text: "Nurture your mind and body",
							bg: "from-green-500 to-teal-500",
						},
						{
							icon: Coffee,
							title: "Mindful Living",
							text: "Transform your daily habits",
							bg: "from-orange-500 to-red-500",
						},
					].map(({ icon: Icon, title, text, bg }, index) => (
						<div
							key={index}
							className={`rounded-lg bg-gradient-to-br ${bg} text-white p-6 text-center transform transition hover:scale-105 hover:shadow-xl`}
						>
							<Icon className="w-12 h-12 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">{title}</h3>
							<p>{text}</p>
						</div>
					))}
				</div>
				{/* User Progress Section */}
				<div className="max-w-6xl mx-auto px-6 mb-16">
					<ProgressTracker />
				</div>

				{/* Video Section */}
				<div className="max-w-6xl mx-auto px-6 mb-16">
					<h2 className="text-3xl font-bold text-center mb-12">
						Wellness Videos
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						<div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-4 flex items-center">
								<Star className="w-6 h-6 mr-2" />
								Featured
							</h3>
							<p>Our most impactful wellness sessions</p>
						</div>

						<div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-4 flex items-center">
								<Heart className="w-6 h-6 mr-2" />
								Popular
							</h3>
							<p>Community favorites and trending content</p>
						</div>

						<div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-4 flex items-center">
								<Calendar className="w-6 h-6 mr-2" />
								New
							</h3>
							<p>Fresh content added weekly</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{wellnessVideos.map((video, index) => (
							<div
								key={index}
								className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
								onClick={() => setSelectedVideo(video)}
							>
								<YouTubeThumbnail
									video={video}
									onClick={() => setSelectedVideo(video)}
								/>
								<div className="p-4">
									<span className="text-sm font-medium text-purple-600 mb-2 block">
										{video.category}
									</span>
									<h3 className="text-lg font-semibold mb-2">{video.title}</h3>
									<div className="flex items-center text-gray-600 text-sm">
										<Play className="w-4 h-4 mr-1" />
										{video.views} views
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-6 justify-center items-center p-8">
      {/* Testimonial 1 */}
      <div className="p-6 bg-gradient-to-r from-white-100 to-orange-200 text-black shadow-xl rounded-2xl max-w-lg">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">John Doe</h3>
            <p className="text-sm opacity-90">
              "MindEase has truly changed my life. The wellness resources helped
              me manage stress and improve my daily routine. Highly recommend!"
            </p>
          </div>

          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="h-6 w-6 text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <span className="ml-2 text-sm opacity-80">5 out of 5</span>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="p-6 bg-gradient-to-r from-white to-blue-100 text-black shadow-xl rounded-2xl max-w-lg">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">Jane Smith</h3>
            <p className="text-sm opacity-90">
              "This platform has been a game-changer for my mental well-being.
              The guided exercises and resources are invaluable!"
            </p>
          </div>

          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="h-6 w-6 text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <span className="ml-2 text-sm opacity-80">5 out of 5</span>
          </div>
        </div>
      </div>
    </div>
	

				
				<footer className="bg-white text-black text-center py-4 mt-8">
					<p>&copy; 2025 MindEase. All rights reserved.</p>
				</footer>

				{/* Video Modal */}
				<VideoModal
					video={selectedVideo}
					isOpen={!!selectedVideo}
					onClose={() => setSelectedVideo(null)}
				/>
			</div>
		</>
	);
};

export default WellnessHub;
