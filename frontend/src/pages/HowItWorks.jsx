import Layout from "../components/Layout";
import { Link } from "react-router-dom";
const HowItWorks = () => {
	const steps = [
		{
			title: "Know Your Needs",
			description:
				"Answer a few quick questions and get a therapist recommendation right away.",
			icon: "🤔",
		},
		{
			title: "Choose The Right Plan", 
			description:
				"Decide on the number of sessions you would like to opt for.",
			icon: "📋",
		},
		{
			title: "Get Matched",
			description:
				"Choose the recommended therapist or talk to a matching expert who will connect you with the right therapist based on your needs.",
			icon: "🤝",
		},
		{
			title: "Schedule A Session",
			description:
				"Choose a convenient time slot and get an appointment with your therapist.",
			icon: "📅",
		},
		{
			title: "Get Therapy",
			description:
				"At the scheduled time join the session with your therapist using the mobile application or web browser.",
			icon: "💻",
		},
		{
			title: "Regular Messages",
			description:
				"In addition to the scheduled video sessions, you can reach out to your therapist via voice messages or chat. The therapist will respond 1-2 times a day, based on availability.",
			icon: "💬",
		},
		{
			title: "Continuous Support",
			description:
				"You have the flexibility to reschedule sessions or change the counselor at any point. For any issues or support, facility helpdesk has you covered.",
			icon: "🤗",
		},
	];

	return (
		<Layout>
			<div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
				<div className="text-center mb-16 bg-gray-50 rounded-2xl py-12 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
					<h1 className="text-3xl md:text-4xl font-medium mb-4 text-black">
						How It Works
					</h1>
					<div className="w-48 h-0.5 bg-gray-800 mx-auto mb-8"></div>
					<p className="text-lg max-w-4xl mx-auto leading-relaxed">
						<span className="text-gray-700 font-medium">
							The most simple & convenient way to access talk therapy
						</span>
						<span className="text-blue-500"> - </span>
						<span className="italic text-gray-600">
							anytime, anywhere, any device.
						</span>
					</p>
				</div>

				<div className="relative">
					{/* Vertical Line */}
					<div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[6px] bg-gray-400 hidden md:block"></div>

					{steps.map((step, index) => (
						<div key={index} className="relative mb-16 last:mb-0">
							<div
								className={`flex flex-col md:flex-row items-center gap-12 ${
									index % 2 === 0 ? "md:flex-row-reverse" : ""
								}`}
							>
								<div className="flex-1 text-center md:text-left">
									<div className="text-5xl mb-6 transform hover:scale-110 transition-transform duration-200">
										{step.icon}
									</div>
									<h3 className="text-2xl font-semibold mb-4 text-gray-900">
										{step.title}
									</h3>
									<p className="text-lg text-gray-600 leading-relaxed">
										{step.description}
									</p>
								</div>

								{/* Circle on Timeline - with background to hide the line */}
								<div className="hidden md:flex md:items-center md:justify-center w-12 h-12 bg-white border-[6px] border-gray-400 rounded-full absolute left-1/2 transform -translate-x-1/2 shadow-lg transition-transform duration-200 hover:scale-110"></div>

								<div className="flex-1"></div>
							</div>
						</div>
					))}
				</div>

				<div className="text-center mt-20">
					<Link
						to="/login"
						className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
					>
						Get Started
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default HowItWorks;
