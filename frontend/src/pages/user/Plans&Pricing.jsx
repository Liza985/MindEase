import { CheckCircle, Star } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header.jsx";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 9,
    yearlyPrice: 90,
    features: ["Basic Meditation", "Community Access", "Guided Sessions","Live Sessions",],
    buttonText: "Get Started",
    buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  {
    name: "Professional",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "All Starter Features",
      "Unlimited Meditation",
      "Live Sessions",
      "Priority Support",
    ],
    buttonText: "Choose Plan",
    buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: [
      "All Pro Features",
      "Personal Coaching",
      "Exclusive Workshops",
      "24/7 Support",
    ],
    buttonText: "Go Premium",
    buttonStyle: "bg-orange-500 hover:bg-orange-600 text-white",
  },
];

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
    <Header/>
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-50 py-20 px-6 mt-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 hover:scale-105 transition-all">
                    Flexible Pricing Plans
                    </h1>
                    <p className="text-lg text-gray-600 mt-3">
                    Choose the best plan for your journey.
                    </p>

                    {/* Toggle for Monthly/Yearly */}
                    <div className="flex justify-center mt-6">
                    <button
                        className={`px-6 py-2 text-sm font-semibold rounded-l-lg transition ${
                        !isYearly ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setIsYearly(false)}
                    >
                        Monthly
                    </button>
                    <button
                        className={`px-6 py-2 text-sm font-semibold rounded-r-lg transition ${
                        isYearly ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setIsYearly(true)}
                    >
                        Yearly (Save 20%)
                    </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative bg-white shadow-xl rounded-3xl p-10 text-center transition-all transform hover:scale-105 ${
                        plan.popular ? "border-4 border-purple-500" : ""
                        }`}
                    >
                        {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs px-4 py-1 rounded-full shadow-md">
                            Best Value
                        </div>
                        )}

                        <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                        <p className="text-5xl font-extrabold text-blue-600 my-4">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        <span className="text-lg text-gray-500"> / {isYearly ? "year" : "month"}</span>
                        </p>

                        <ul className="space-y-4 mb-6 text-gray-700 text-left">
                        {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                            <CheckCircle className="text-green-500 mr-2" size={20} />
                            {feature}
                            </li>
                        ))}
                        </ul>

                        <button
                        className={`w-full py-3 rounded-lg font-semibold transition-all ${plan.buttonStyle}`}
                        >
                        {plan.buttonText}
                        </button>
                    </div>
                    ))}
                </div>
            </div>
            </>
  );
};

export default PricingPage;
