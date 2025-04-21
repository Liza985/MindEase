import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import RiskGauge from '../../components/SemiCircleGauge';


const AnalysisPage = () => {
  const location = useLocation();
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [overallRisk, setOverallRisk] = useState('');
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (location.state?.formData) {
      analyzeResults(location.state.formData);
    }
  }, [location.state]);

  const analyzeResults = (formData) => {
    setLoading(true);
    
    // Calculate category scores
    const categoryScores = {
      "Sleep & Energy": calculateCategoryScore(formData, ["Sleep", "SleepDisturbance", "Fatigue", "LowEnergy"]),
      "Mood & Emotions": calculateCategoryScore(formData, ["Worthlessness", "Hopelessness", "Aggression", "Interest"]),
      "Physical Symptoms": calculateCategoryScore(formData, ["Appetite", "Agitation", "Restlessness", "PanicAttacks"]),
      "Cognition & Thoughts": calculateCategoryScore(formData, ["Concentration", "SuicidalIdeation"])
    };
    
    // Calculate overall score
    const totalScore = Object.values(categoryScores).reduce((sum, score) => sum + score.value, 0);
    const maxPossibleScore = Object.values(categoryScores).reduce((sum, score) => sum + score.maxPossible, 0);
    const calculatedOverallPercentage = (totalScore / maxPossibleScore) * 100;
    
    // Determine risk level based on overall percentage
    let risk;
    if (calculatedOverallPercentage < 25) {
      risk = 'Low';
    } else if (calculatedOverallPercentage < 50) {
      risk = 'Moderate';
    } else if (calculatedOverallPercentage < 75) {
      risk = 'High';
    } else {
      risk = 'Severe';
    }
    
    // Check for critical indicators (suicidal ideation)
    if (parseInt(formData.SuicidalIdeation) >= 4) {
      risk = 'Critical';
      // For the gauge visualization, we'll set Critical at 95% to keep it in the red zone
      setOverallPercentage(95);
    } else {
      setOverallPercentage(calculatedOverallPercentage);
    }
    
    // Generate recommendations based on risk level and specific high scores
    const recs = generateRecommendations(risk, categoryScores, formData);
    
    setScores(categoryScores);
    setOverallRisk(risk);
    setRecommendations(recs);
    setLoading(false);
  };

  const calculateCategoryScore = (formData, fields) => {
    const values = fields.map(field => parseInt(formData[field] || 0));
    const totalValue = values.reduce((sum, val) => sum + val, 0);
    const maxPossible = fields.length * 5; // 5 is max value for each field
    const percentage = (totalValue / maxPossible) * 100;
    
    return {
      value: totalValue,
      maxPossible,
      percentage,
      level: determineLevelFromPercentage(percentage)
    };
  };
  
  const determineLevelFromPercentage = (percentage) => {
    if (percentage < 25) return 'Low';
    if (percentage < 50) return 'Moderate';
    if (percentage < 75) return 'High';
    return 'Severe';
  };
  
  const generateRecommendations = (risk, categoryScores, formData) => {
    const recommendations = [];
    
    // General recommendations based on risk level
    switch (risk) {
      case 'Critical':
        recommendations.push({
          title: 'Seek Immediate Help',
          description: 'Please contact a mental health crisis line or go to your nearest emergency room immediately.',
          urgent: true
        });
        break;
      case 'Severe':
        recommendations.push({
          title: 'Professional Help Recommended',
          description: 'We strongly recommend scheduling an appointment with a mental health professional within the next few days.',
          urgent: true
        });
        break;
      case 'High':
        recommendations.push({
          title: 'Consider Professional Support',
          description: 'Consider scheduling an appointment with a therapist or counselor to discuss your symptoms.',
          urgent: false
        });
        break;
      default:
        recommendations.push({
          title: 'Self-Care Strategies',
          description: 'Continue practicing self-care and monitoring your mental well-being.',
          urgent: false
        });
    }
    
    // Specific recommendations based on category scores
    if (categoryScores["Sleep & Energy"].level === 'High' || categoryScores["Sleep & Energy"].level === 'Severe') {
      recommendations.push({
        title: 'Sleep Hygiene',
        description: 'Establish a regular sleep schedule and create a relaxing bedtime routine. Limit screen time before bed and consider sleep-promoting activities like reading or meditation.',
        urgent: false
      });
    }
    
    if (categoryScores["Mood & Emotions"].level === 'High' || categoryScores["Mood & Emotions"].level === 'Severe') {
      recommendations.push({
        title: 'Mood Management',
        description: 'Practice mindfulness and emotional regulation techniques. Consider keeping a mood journal to identify triggers and patterns.',
        urgent: false
      });
    }
    
    if (categoryScores["Physical Symptoms"].level === 'High' || categoryScores["Physical Symptoms"].level === 'Severe') {
      recommendations.push({
        title: 'Physical Well-being',
        description: 'Regular physical activity can help reduce anxiety and improve mood. Consider incorporating relaxation techniques like deep breathing or progressive muscle relaxation.',
        urgent: false
      });
    }
    
    if (categoryScores["Cognition & Thoughts"].level === 'High' || categoryScores["Cognition & Thoughts"].level === 'Severe') {
      recommendations.push({
        title: 'Thought Management',
        description: 'Practice identifying and challenging negative thought patterns. Consider cognitive-behavioral techniques or guided meditation focused on thought awareness.',
        urgent: false
      });
    }
    
    // Add resource recommendation
    recommendations.push({
      title: 'Resources',
      description: 'Explore our resource library for self-help materials, guided activities, and information about mental health services in your area.',
      urgent: false
    });
    
    return recommendations;
  };

  const getCategoryColor = (level) => {
    switch (level) {
      case 'Low': return 'bg-green-400';
      case 'Moderate': return 'bg-amber-400';
      case 'High': return 'bg-orange-400';
      case 'Severe': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Analyzing your responses...</p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="bg-indigo-600 px-6 py-4">
                  <h1 className="text-2xl font-bold text-white">Your MindEase Assessment Results</h1>
                  <p className="text-indigo-100 mt-1">Based on your responses, we've prepared a personalized analysis.</p>
                </div>
                
                <div className="p-6">
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">Overall Assessment</h2>
                    <div className="flex flex-col items-center mt-4">
                    <RiskGauge percentage={overallPercentage} />
                    </div>
                    <p className="mt-6 text-gray-600 text-center px-8">
                      This assessment is based on your responses across different areas of mental well-being. 
                      Remember that this is not a clinical diagnosis but an indicator of potential areas of concern.
                    </p>
                  </div>
                  
                  <div className="mt-12 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Category Breakdown</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(scores).map(([category, score]) => (
                        <div key={category} className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100">
                          <h3 className="text-lg font-medium text-gray-800 mb-2">{category}</h3>
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div 
                              className={`h-3 rounded-full ${getCategoryColor(score.level)}`} 
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
                  <h1 className="text-2xl font-bold text-white">Recommendations</h1>
                  <p className="text-teal-100 mt-1">Based on your assessment, here are some suggestions that may help.</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {recommendations.map((rec, index) => (
                      <div key={index} className={`p-4 rounded-lg ${rec.urgent ? 'bg-red-50 border-l-4 border-red-500' : 'bg-blue-50 border-l-4 border-blue-400'}`}>
                        <h3 className={`text-lg font-semibold ${rec.urgent ? 'text-red-700' : 'text-blue-700'}`}>{rec.title}</h3>
                        <p className={`mt-1 ${rec.urgent ? 'text-red-600' : 'text-blue-600'}`}>{rec.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                      Note: This assessment is not a substitute for professional medical advice, diagnosis, or treatment. 
                      Always seek the advice of a qualified healthcare provider with any questions you may have.
                    </p>
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