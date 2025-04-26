import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header.jsx";
import RiskGauge from "../../components/SemiCircleGauge";
import { createSurvey } from "../../redux/Actions/surveyAction";
import toastOptions from "../../constants/toast";

const AnalysisPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [scores, setScores] = useState({});
	const [loading, setLoading] = useState(true);
	const [overallRisk, setOverallRisk] = useState("");
	const [overallPercentage, setOverallPercentage] = useState(0);
	const [recommendations, setRecommendations] = useState([]);
	const [mlPrediction, setMlPrediction] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { error, message } = useSelector((state) => state.survey);

	useEffect(() => {
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
		}
	}, [error, message, dispatch]);

	useEffect(() => {
		if (location.state?.formData && !isSubmitting) {
			analyzeResults(location.state.formData);
		} else {
			navigate("/survey");
		}
	}, [location.state, navigate]);

	const analyzeResults = async (formData) => {
		if (isSubmitting) return;
		setIsSubmitting(true);
		setLoading(true);

		try {
			// Get ML model prediction
			const response = await fetch("http://localhost:5000/predict", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Failed to get ML prediction");
			}

			const mlResult = await response.json();

			// Calculate category scores
			const categoryScores = {
				"Sleep & Energy": calculateCategoryScore(formData, [
					"Sleep",
					"SleepDisturbance",
					"Fatigue",
					"LowEnergy",
				]),
				"Mood & Emotions": calculateCategoryScore(formData, [
					"Worthlessness",
					"Hopelessness",
					"Aggression",
					"Interest",
				]),
				"Physical Symptoms": calculateCategoryScore(formData, [
					"Appetite",
					"Agitation",
					"Restlessness",
					"PanicAttacks",
				]),
				"Cognition & Thoughts": calculateCategoryScore(formData, [
					"Concentration",
					"SuicidalIdeation",
				]),
			};

			// Calculate overall scores
			const totalScore = Object.values(categoryScores).reduce(
				(sum, score) => sum + score.value,
				0,
			);
			const maxPossibleScore = Object.values(categoryScores).reduce(
				(sum, score) => sum + score.maxPossible,
				0,
			);
			const calculatedOverallPercentage = (totalScore / maxPossibleScore) * 100;

			// Save survey response
			const surveyData = {
				questions: formData,
				result: {
					prediction: mlResult.prediction,
					confidence: mlResult.confidence,
					categoryScores: categoryScores,
					overallPercentage: calculatedOverallPercentage,
				},
			};

			// Set ML prediction first
			setMlPrediction(mlResult);

			// Create survey
			const surveyResponse = await dispatch(createSurvey(surveyData));

			if (!surveyResponse) {
				throw new Error("Failed to save survey results");
			}

			// After successful survey creation, update UI state
			let risk = mlResult.prediction;
			if (parseInt(formData.SuicidalIdeation) >= 4) {
				risk = "Critical";
				// calculatedOverallPercentage = 95;
			}

			setScores(categoryScores);
			setOverallRisk(risk);
			setOverallPercentage(calculatedOverallPercentage);

			// Generate and set recommendations
			const recs = generateRecommendations(risk, categoryScores, formData);
			setRecommendations(recs);
		} catch (error) {
			console.error("Analysis error:", error);
			toast.error(error.message || "Failed to analyze results", toastOptions);
		} finally {
			setLoading(false);
			setIsSubmitting(false);
		}
	};

	const calculateCategoryScore = (formData, fields) => {
		const values = fields.map((field) => parseInt(formData[field] || 0));
		const totalValue = values.reduce((sum, val) => sum + val, 0);
		const maxPossible = fields.length * 5; // 5 is max value for each field
		const percentage = (totalValue / maxPossible) * 100;

		return {
			value: totalValue,
			maxPossible,
			percentage,
			level: determineLevelFromPercentage(percentage),
		};
	};

	const determineLevelFromPercentage = (percentage) => {
		if (percentage < 25) return "Low";
		if (percentage < 50) return "Moderate";
		if (percentage < 75) return "High";
		return "Severe";
	};

	const generateRecommendations = (
		risk,
		categoryScores,
		formData,
		mlResult = null,
	) => {
		const recommendations = [];

		// Add ML model confidence if available
		if (mlResult) {
			recommendations.push({
				title: "Assessment Confidence",
				description: `Our AI model is ${(mlResult.confidence * 100).toFixed(
					1,
				)} confident in this assessment.`,
				urgent: false,
			});
		}

		// General recommendations based on risk level
		switch (risk) {
			case "Critical":
				recommendations.push({
					title: "Seek Immediate Help",
					description:
						"Please contact a mental health crisis line or go to your nearest emergency room immediately.",
					urgent: true,
				});
				break;
			case "Severe":
				recommendations.push({
					title: "Professional Help Recommended",
					description:
						"We strongly recommend scheduling an appointment with a mental health professional within the next few days.",
					urgent: true,
				});
				break;
			case "Moderate":
				recommendations.push({
					title: "Consider Professional Support",
					description:
						"Consider talking to a mental health professional about your symptoms. Regular counseling may be beneficial.",
					urgent: false,
				});
				break;
			case "Mild":
				recommendations.push({
					title: "Self-Care Focus",
					description:
						"Focus on self-care strategies and monitor your symptoms. Consider talking to a counselor if symptoms persist.",
					urgent: false,
				});
				break;
			default:
				recommendations.push({
					title: "Maintain Well-being",
					description:
						"Continue practicing good mental health habits and self-care routines.",
					urgent: false,
				});
		}

		// Add specific recommendations based on category scores
		Object.entries(categoryScores).forEach(([category, score]) => {
			if (score.percentage > 50) {
				switch (category) {
					case "Sleep & Energy":
						recommendations.push({
							title: "Sleep Hygiene",
							description:
								"Focus on improving sleep habits: maintain a regular sleep schedule, create a relaxing bedtime routine, and limit screen time before bed.",
							urgent: false,
						});
						break;
					case "Mood & Emotions":
						recommendations.push({
							title: "Emotional Support",
							description:
								"Consider joining a support group or starting a mood journal. Regular exercise can also help regulate emotions.",
							urgent: false,
						});
						break;
					case "Physical Symptoms":
						recommendations.push({
							title: "Physical Well-being",
							description:
								"Practice relaxation techniques like deep breathing or progressive muscle relaxation. Regular exercise may help reduce physical symptoms.",
							urgent: false,
						});
						break;
					case "Cognition & Thoughts":
						recommendations.push({
							title: "Mental Wellness",
							description:
								"Try mindfulness meditation and cognitive exercises. If negative thoughts persist, consider cognitive behavioral therapy.",
							urgent: false,
						});
						break;
				}
			}
		});

		return recommendations;
	};

	const getCategoryColor = (level) => {
		switch (level) {
			case "Low":
				return "bg-green-500";
			case "Moderate":
				return "bg-yellow-500";
			case "High":
				return "bg-orange-500";
			case "Severe":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	return (
		<>
			<Header />
			<div className="min-h-screen bg-gray-50 pt-20">
				<div className="container mx-auto px-4 py-8">
					{loading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
							<p className="mt-4 text-gray-600">Analyzing your responses...</p>
						</div>
					) : (
						<>
							<div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
								<div className="bg-indigo-600 px-6 py-4">
									<h1 className="text-2xl font-bold text-white">
										Your MindEase Assessment Results
									</h1>
									<p className="text-indigo-100 mt-1">
										Based on your responses and AI analysis, we've prepared a
										personalized assessment.
									</p>
								</div>

								<div className="p-6">
									<div className="mb-8">
										<h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
											Overall Assessment
										</h2>
										<div className="flex flex-col items-center mt-4">
											<RiskGauge percentage={overallPercentage} />
											{mlPrediction && (
												<div className="mt-4 text-sm text-gray-600">
													AI Model Confidence:{" "}
													{(mlPrediction.confidence * 100).toFixed(1)}%
												</div>
											)}
										</div>
										<p className="mt-6 text-gray-600 text-center px-8">
											This assessment combines advanced AI analysis with
											clinical metrics to evaluate your mental well-being.
											Remember that this is not a clinical diagnosis but an
											indicator of potential areas of concern.
										</p>
									</div>

									<div className="mt-12 mb-8">
										<h2 className="text-xl font-semibold text-gray-900 mb-4">
											Category Breakdown
										</h2>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											{Object.entries(scores).map(([category, score]) => (
												<div
													key={category}
													className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100"
												>
													<h3 className="text-lg font-medium text-gray-800 mb-2">
														{category}
													</h3>
													<div className="w-full bg-gray-200 rounded-full h-3 mb-2">
														<div
															className={`h-3 rounded-full ${getCategoryColor(
																score.level,
															)}`}
															style={{ width: `${score.percentage}%` }}
														></div>
													</div>
													<div className="flex justify-between text-sm text-gray-600">
														<span>{score.level} concern</span>
														<span>{score.percentage.toFixed(0)}%</span>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>

							<div className="bg-white rounded-xl shadow-md overflow-hidden">
								<div className="bg-teal-600 px-6 py-4">
									<h1 className="text-2xl font-bold text-white">
										Recommendations
									</h1>
									<p className="text-teal-100 mt-1">
										Based on your assessment, here are some suggestions that may
										help.
									</p>
								</div>

								<div className="p-6">
									<div className="space-y-6">
										{recommendations.map((rec, index) => (
											<div
												key={index}
												className={`p-4 rounded-lg ${
													rec.urgent
														? "bg-red-50 border-l-4 border-red-500"
														: "bg-blue-50 border-l-4 border-blue-400"
												}`}
											>
												<h3
													className={`text-lg font-semibold ${
														rec.urgent ? "text-red-700" : "text-blue-700"
													}`}
												>
													{rec.title}
												</h3>
												<p
													className={`mt-1 ${
														rec.urgent ? "text-red-600" : "text-blue-600"
													}`}
												>
													{rec.description}
												</p>
											</div>
										))}
									</div>

									<div className="mt-8 text-center">
										<p className="text-gray-500 text-sm mb-4">
											Note: This assessment is not a substitute for professional
											medical advice, diagnosis, or treatment. Always seek the
											advice of a qualified healthcare provider with any
											questions you may have.
										</p>
										<button
											onClick={() => navigate("/wellness-hub")}
											className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
										>
											Explore Wellness Hub Resources
										</button>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default AnalysisPage;
