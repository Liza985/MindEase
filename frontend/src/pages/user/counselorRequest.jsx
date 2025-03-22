import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const CounselorRequests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [activeChats, setActiveChats] = useState([]);

  // Mock data - in a real app, you would fetch this from your backend
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setRequests([
        {
          id: 1,
          topic: "Anxiety Management",
          description: "I've been experiencing increased anxiety at work and would like strategies to manage it better.",
          status: "pending",
          submittedAt: "2025-03-19T14:30:00Z"
        },
        {
          id: 2,
          topic: "Relationship Counseling",
          description: "Having communication issues with my partner and need guidance on how to improve.",
          status: "assigned",
          counselor: "Dr. Sarah Johnson",
          submittedAt: "2025-03-18T09:15:00Z"
        }
      ]);

      setActiveChats([
        {
          id: 1,
          topic: "Work-Life Balance",
          counselor: "Dr. Michael Patel",
          lastMessage: "Let's schedule our follow-up for next Tuesday at 3pm.",
          unread: 2,
          updatedAt: "2025-03-20T16:45:00Z"
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  const handleStartChat = (chatId) => {
    // In a real app, you would navigate to the specific chat
    navigate(`/counselor-chat/${chatId}`);
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Counseling</h2>

          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                className={`pb-4 px-1 ${
                  activeTab === "requests"
                    ? "border-b-2 border-orange-500 text-orange-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("requests")}
              >
                Requests
              </button>
              <button
                className={`pb-4 px-1 ${
                  activeTab === "chats"
                    ? "border-b-2 border-orange-500 text-orange-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("chats")}
              >
                Active Chats
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <>
              {activeTab === "requests" && (
                <div>
                  {requests.length > 0 ? (
                    <div className="space-y-4">
                      {requests.map((request) => (
                        <div
                          key={request.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-gray-800">
                              {request.topic}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {request.status === "pending" ? "Pending" : "Assigned"}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{request.description}</p>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Submitted: {formatDate(request.submittedAt)}</span>
                            {request.counselor && (
                              <span>Counselor: {request.counselor}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        You don't have any active requests.
                      </p>
                      <button
                        onClick={() => navigate("/counseling")}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                      >
                        Create New Request
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "chats" && (
                <div>
                  {activeChats.length > 0 ? (
                    <div className="space-y-4">
                      {activeChats.map((chat) => (
                        <div
                          key={chat.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => handleStartChat(chat.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-gray-800">
                              {chat.topic}
                            </h3>
                            {chat.unread > 0 && (
                              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                {chat.unread} new
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">
                            <span className="font-medium">
                              {chat.counselor}:
                            </span>{" "}
                            {chat.lastMessage}
                          </p>
                          <div className="text-sm text-gray-500">
                            Last updated: {formatDate(chat.updatedAt)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        You don't have any active chats.
                      </p>
                      <button
                        onClick={() => navigate("/counseling")}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                      >
                        Request Counseling
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
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
