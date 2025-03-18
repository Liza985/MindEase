import React from 'react';
import Header from '../../components/Header.jsx';
import { useLocation } from 'react-router-dom';

const AnalysisPage = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  if (!formData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">No data to display.</p>
      </div>
    );
  }

  const calculateAverage = (fields) => {
    let sum = 0;
    let count = 0;
    fields.forEach(field => {
      if (formData[field]) {
        sum += parseInt(formData[field]);
        count++;
      }
    });
    return count > 0 ? sum / count : 0;
  };

  const sleepEnergyAverage = calculateAverage(["Sleep", "SleepDisturbance", "Fatigue", "LowEnergy"]);
  const moodEmotionsAverage = calculateAverage(["Worthlessness", "Hopelessness", "Aggression", "Interest"]);
  const physicalSymptomsAverage = calculateAverage(["Appetite", "Agitation", "Restlessness", "PanicAttacks"]);
  const cognitionThoughtsAverage = calculateAverage(["Concentration", "SuicidalIdeation"]);

  // Calculate overall depression score (average of all categories)
  const overallScore = (sleepEnergyAverage + moodEmotionsAverage + physicalSymptomsAverage + cognitionThoughtsAverage) / 4;
  
  // Map score to percentage for gauge (0-5 scale to 0-100%)
  const scorePercentage = (overallScore / 5) * 100;
  
  // Calculate the rotation angle for the needle (0-180 degrees)
  const needleRotation = (scorePercentage / 100) * 180;

  const getMoodLabel = (score) => {
    if (score < 1.5) return "GOOD";
    if (score < 2.5) return "NORMAL";
    if (score < 3.5) return "FAIR";
    if (score < 4.5) return "BAD";
    return "POOR";
  };

  const getInterpretation = (average) => {
    if (average < 2) return "Generally feeling good.";
    if (average < 3) return "Some areas of concern.";
    if (average < 4) return "Moderate areas of concern.";
    return "Significant areas of concern. Consider seeking professional help.";
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    // Sleep & Energy recommendations
    if (sleepEnergyAverage >= 2) {
      recommendations.push({
        category: "Sleep & Energy",
        tips: [
          "Maintain a consistent sleep schedule",
          "Create a relaxing bedtime routine",
          "Limit screen time before bed",
          "Consider short afternoon naps if feeling fatigued"
        ]
      });
    }
    
    // Mood & Emotions recommendations
    if (moodEmotionsAverage >= 2) {
      recommendations.push({
        category: "Mood & Emotions",
        tips: [
          "Practice daily gratitude journaling",
          "Engage in activities you previously enjoyed",
          "Connect with supportive friends or family",
          "Consider mindfulness meditation"
        ]
      });
    }
    
    // Physical Symptoms recommendations
    if (physicalSymptomsAverage >= 2) {
      recommendations.push({
        category: "Physical Symptoms",
        tips: [
          "Incorporate regular physical activity",
          "Try deep breathing exercises when feeling anxious",
          "Maintain a balanced diet",
          "Practice progressive muscle relaxation"
        ]
      });
    }
    
    // Cognition & Thoughts recommendations
    if (cognitionThoughtsAverage >= 2) {
      recommendations.push({
        category: "Cognition & Thoughts",
        tips: [
          "Challenge negative thought patterns",
          "Break large tasks into smaller, manageable steps",
          "Set realistic daily goals",
          "Consider cognitive behavioral therapy techniques"
        ]
      });
    }
    
    // If severe symptoms detected
    if (overallScore >= 4 || cognitionThoughtsAverage >= 4) {
      recommendations.unshift({
        category: "Important",
        tips: [
          "Please consider reaching out to a mental health professional",
          "Contact a crisis helpline if you're experiencing severe distress",
          "Remember that seeking help is a sign of strength, not weakness",
          "Share your feelings with someone you trust"
        ]
      });
    }
    
    return recommendations;
  };
  
  const recommendations = getRecommendations();
  const moodLabel = getMoodLabel(overallScore);

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-orange-50 to-blue-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Your MindEase Analysis</h1>
          </div>
          <div className="px-7 py-6">
            {/* Semicircle Gauge */}
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Your Mental Wellbeing Score</h2>
              
              <div className="relative w-64 h-32">
                {/* Semicircle Background */}
                <svg
                  viewBox="0 0 200 100"
                  className="w-full h-full"
                >
                  {/* Outer Arc (Thicker Gradient) */}
                  <defs>
                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" /> {/* Green */}
                      <stop offset="25%" stopColor="#84cc16" /> {/* Light Green */}
                      <stop offset="50%" stopColor="#facc15" /> {/* Yellow */}
                      <stop offset="75%" stopColor="#f97316" /> {/* Orange */}
                      <stop offset="100%" stopColor="#ef4444" /> {/* Red */}
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 90 A 90 90 0 0 1 190 90"
                    fill="none"
                    stroke="url(#gauge-gradient)"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />

                  {/* Inner Arc (Thinner Background) */}
                  <path
                    d="M 20 90 A 80 80 0 0 1 180 90"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Labels */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute bottom-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-700" style={{ left: '10%' }}>POOR</div>
                  <div className="absolute bottom-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-700" style={{ left: '30%' }}>BAD</div>
                  <div className="absolute bottom-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-700" style={{ left: '50%' }}>FAIR</div>
                  <div className="absolute bottom-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-700" style={{ left: '70%' }}>NORMAL</div>
                  <div className="absolute bottom-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-700" style={{ left: '90%' }}>GOOD</div>
                </div>

                {/* Needle */}
                <div
                  className="absolute bottom-0 left-1/2 w-1 h-24 bg-black transform origin-bottom"
                  style={{
                    transform: `translateX(-50%) rotate(${needleRotation}deg)`,
                  }}
                ></div>

                {/* Center Circle */}
                <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-black rounded-full transform -translate-x-1/2 translate-y-1/2 shadow-lg"></div>
              </div>
              
              <div className="text-center mb-2">
                <p className="text-2xl font-bold" style={{ 
                  color: moodLabel === "GOOD" ? "#22c55e" : 
                         moodLabel === "NORMAL" ? "#84cc16" :
                         moodLabel === "FAIR" ? "#facc15" :
                         moodLabel === "BAD" ? "#f97316" : "#ef4444"
                }}>{moodLabel}</p>
                <p className="text-lg mt-1">Score: {overallScore.toFixed(1)}/5.0</p>
                <p className="text-lg mt-1">{getInterpretation(overallScore)}</p>
              </div>
            </div>

            {/* Personalized Recommendations */}
            {recommendations.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Personalized Recommendations</h2>
                {recommendations.map((rec, index) => (
                  <div key={index} className="mb-6 bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg text-blue-700 mb-2">{rec.category}</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {rec.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              <p className="text-gray-600">
                This analysis is for informational purposes only and is not a substitute for professional medical advice.
                If you have concerns about your mental health, please consult a healthcare provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalysisPage;