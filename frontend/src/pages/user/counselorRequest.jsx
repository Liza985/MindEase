
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { toast } from "react-toastify";

const CounselorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get user from Redux store
  const user = useSelector((state) => state?.auth?.user);
  const userId = user?.id;
  
  // Get query parameters to check for new request
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const newRequestId = queryParams.get("newRequest"); 
  // At the top of your CounselorRequests component
useEffect(() => {
  // Debug the user state
  console.log("Redux auth state:", user);
  console.log("User ID:", userId);
}, [user, userId]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!userId) {
        console.log("User ID not found, waiting briefly before checking again...");
        // Wait a moment before deciding the user isn't logged in
        setTimeout(() => {
          if (!userId) {
            setLoading(false);
            setError("You must be logged in to view your requests");
          }
        }, 1000); // Wait 1 second
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/counseling/requests/user/${userId}`
        );
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load your counseling requests");
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

  // Scroll to highlighted request if it exists
  useEffect(() => {
    if (newRequestId) {
      // Add a slight delay to ensure the DOM is fully rendered
      setTimeout(() => {
        const element = document.getElementById(`request-${newRequestId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [newRequestId, requests]);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-orange-50 pt-20">
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 w-full">
            <Header />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Counseling Requests</h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : requests.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">You haven't submitted any counseling requests yet.</p>
              <a 
                href="/counseling" 
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Request Counseling
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {requests.map((request) => (
                <div
                  key={request.id}
                  id={`request-${request.id}`}
                  className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ${
                    newRequestId === request.id.toString() ? "ring-2 ring-orange-500 animate-pulse-light" : ""
                  }`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">{request.topic}</h2>
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{request.description}</p>
                    
                    <div className="text-sm text-gray-500">
                      Submitted on {formatDate(request.submittedAt)}
                    </div>

                    {request.status === "pending" && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 italic">
                          Your request is being processed. A counselor will respond soon.
                        </p>
                      </div>
                    )}
                    
                    {request.counselorNotes && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h3 className="font-medium text-gray-700 mb-2">Counselor Notes:</h3>
                        <p className="text-gray-600">{request.counselorNotes}</p>
                      </div>
                    )}
                    
                    {request.nextSessionDate && (
                      <div className="mt-4 bg-green-50 p-4 rounded-md">
                        <h3 className="font-medium text-green-800 mb-1">Next Session:</h3>
                        <p className="text-green-700">{formatDate(request.nextSessionDate)}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white text-black text-center py-4 mt-8">
        <p>&copy; 2025 MindEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CounselorRequests;