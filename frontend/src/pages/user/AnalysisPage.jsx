import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header.jsx';
// import AnalysisPage from './AnalysisPage';

const AnalysisPage = () => {
  const location = useLocation();
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [overallRisk, setOverallRisk] = useState('');
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
    const overallPercentage = (totalScore / maxPossibleScore) * 100;
    
    // Determine risk level based on overall percentage
    let risk;
    if (overallPercentage < 25) {
      risk = 'Low';
    } else if (overallPercentage < 50) {
      risk = 'Moderate';
    } else if (overallPercentage < 75) {
      risk = 'High';
    } else {
      risk = 'Severe';
    }
    
    // Check for critical indicators (suicidal ideation)
    if (parseInt(formData.SuicidalIdeation) >= 4) {
      risk = 'Critical';
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

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Severe':
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (level) => {
    switch (level) {
      case 'Low': return 'bg-green-500';
      case 'Moderate': return 'bg-yellow-500';
      case 'High': return 'bg-orange-500';
      case 'Severe': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-orange-50 to-blue-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Analyzing your responses...</p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="bg-blue-600 px-6 py-4">
                  <h1 className="text-2xl font-bold text-white">Your MindEase Assessment Results</h1>
                  <p className="text-blue-50 mt-1">Based on your responses, we've prepared a personalized analysis.</p>
                </div>
                
                <div className="p-6">
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Overall Assessment</h2>
                    <div className={`inline-block px-4 py-2 rounded-full font-medium ${getRiskColor(overallRisk)}`}>
                      {overallRisk} Risk Level
                    </div>
                    <p className="mt-3 text-gray-600">
                      This assessment is based on your responses across different areas of mental well-being. 
                      Remember that this is not a clinical diagnosis but an indicator of potential areas of concern.
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Category Breakdown</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(scores).map(([category, score]) => (
                        <div key={category} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                          <h3 className="text-lg font-medium text-gray-800 mb-2">{category}</h3>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                            <div 
                              className={`h-2.5 rounded-full ${getCategoryColor(score.level)}`} 
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
                <div className="bg-green-600 px-6 py-4">
                  <h1 className="text-2xl font-bold text-white">Recommendations</h1>
                  <p className="text-green-50 mt-1">Based on your assessment, here are some suggestions that may help.</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {recommendations.map((rec, index) => (
                      <div key={index} className={`p-4 rounded-lg ${rec.urgent ? 'bg-red-50 border-l-4 border-red-500' : 'bg-blue-50'}`}>
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

export default AnalysisPage