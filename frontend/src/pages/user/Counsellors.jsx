import React, { useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const CounselingPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to submit the form
    try {
      // In a real app, you would send this data to your backend
      console.log("Submitting request:", formData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to the requests page
      navigate("/counselor-requests");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {!showForm ? (
            <>
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
                  <button
                    onClick={() => navigate("/aichat")}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
                  >
                    Start AI Chat
                  </button>
                </div>

                <div className="bg-white rounded-lg p-8 w-72 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="text-5xl mb-4">👤</div>
                  <h2 className="text-xl font-bold text-orange-500 mb-2">
                    Human Counselor
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Connect with a certified counselor for personalized support and
                    professional guidance.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
                  >
                    Chat with Counselor
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full max-w-2xl">
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center text-orange-500 hover:text-orange-600 mb-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Options
              </button>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Request Counseling Session
                </h2>
                <p className="text-gray-600 mb-6">
                  Please provide some information about what you'd like to discuss with
                  our counselor. This helps us connect you with the right professional.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="topic"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Topic <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      placeholder="e.g., Anxiety, Depression, Relationships"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="description"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Please describe what you're experiencing and what kind of help you're looking for..."
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>

        <footer className="bg-white text-black text-center py-4 mt-8">
          <p>&copy; 2025 MindEase. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default CounselingPage;