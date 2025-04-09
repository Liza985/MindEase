import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageSquare, Star, X, Filter, Download, Search } from "lucide-react";
import {
  createUserFeedback,
  getAllUserFeedbacks,
} from "../../redux/Actions/feedbackAction";
import { toast } from "react-toastify";
import toastOptions, { successToastOptions } from "../../constants/toast";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSideBar";

const Feedback = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, userFeedbacks, feedbackError, feedbackMessage } =
    useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(getAllUserFeedbacks());
  }, [dispatch]);

  useEffect(() => {
    if (feedbackError) {
      toast.error(feedbackError, toastOptions);
      dispatch({ type: "CLEAR_FEEDBACK_ERROR" });
    }
    if (
      feedbackMessage &&
      feedbackMessage !== "Feedback fetched successfully"
    ) {
      toast.success(feedbackMessage, successToastOptions);
      dispatch({ type: "CLEAR_FEEDBACK_MESSAGE" });
      setIsModalOpen(false);
      setRating(0);
      setFeedbackText("");
    }
  }, [feedbackError, feedbackMessage, dispatch]);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating", toastOptions);
      return;
    }
    const feedbackData = {
      rating,
      feedback: feedbackText,
    };
    dispatch(createUserFeedback(feedbackData));
  };

  const handleDeleteFeedback = (id) => {
    console.log(id);
    setConfirmDelete(null);
  };

  const exportFeedbackToCsv = () => {
    const headers = ["User", "Date", "Rating", "Feedback"];
    const feedbackData = userFeedbacks.map((item) => [
      item.userId?.name || "Anonymous User",
      new Date(item.createdAt).toLocaleDateString(),
      item.rating,
      item.feedback,
    ]);
    const csvContent = [
      headers.join(","),
      ...feedbackData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `feedback_export_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredFeedbacks = userFeedbacks
    ? userFeedbacks
        .filter((feedback) => {
          const matchesRating = filterRating === 0 || feedback.rating === filterRating;
          const matchesSearch = feedback.userId?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.feedback?.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesRating && matchesSearch;
        })
        .sort((a, b) => {
          if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
          if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
          if (sortBy === "highest") return b.rating - a.rating;
          if (sortBy === "lowest") return a.rating - b.rating;
          return 0;
        })
    : [];

  const averageRating = userFeedbacks && userFeedbacks.length > 0
    ? (userFeedbacks.reduce((sum, item) => sum + item.rating, 0) / userFeedbacks.length).toFixed(1)
    : "0.0";

  return (
    <div className="flex min-h-screen bg-orange-50">
      <div className="w-64">
        <AdminSidebar />
      </div>
      <div className="flex-1 w-full">
	  <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Feedback</h1>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center text-orange-800 font-bold">
              A
            </div>
            <span className="text-gray-700">Admin</span>
          </div>
        </header>
        <div className="container mx-auto px-4 py-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="rounded-full bg-orange-100 p-3 mr-4">
                <MessageSquare size={24} className="text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Feedbacks</p>
                <h3 className="text-2xl font-bold">{userFeedbacks?.length || 0}</h3>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="rounded-full bg-orange-100 p-3 mr-4">
                <Star size={24} className="text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Rating</p>
                <h3 className="text-2xl font-bold">{averageRating}</h3>
              </div>
            </div>
          </div>

          {/* Filter, Sort and Export */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <Filter size={20} className="text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-800">Filter:</h3>
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setFilterRating(value)}
                    className={`px-3 py-1 rounded-md ${
                      filterRating === value
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {value === 0 ? "All" : `${value}★`}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md px-2">
                  <Search className="text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="outline-none px-2 py-1"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>

				<button
					onClick={exportFeedbackToCsv}
					className="bg-white text-black border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
					>
					<Download size={18} className="mr-2 text-black" /> Export
					</button>

              </div>
            </div>
          </div>

          {/* Feedback Cards Render */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <>
              {filteredFeedbacks.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-lg text-gray-600">No feedback found</h3>
                  <p className="text-gray-500 mt-2">
                    {filterRating > 0
                      ? `No ${filterRating}-star feedback available.`
                      : "There is no feedback available yet."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFeedbacks.map((feedback) => (
                    <div
                      key={feedback._id}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
                    >
                      <div className="absolute top-3 right-3">
                        <button
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => setConfirmDelete(feedback._id)}
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="flex items-center mb-4">
                        <img
                          src={feedback.userId?.avatar?.url || "https://randomuser.me/api/portraits/men/1.jpg"}
                          alt={feedback.userId?.name || "User"}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {feedback.userId?.firstName || "Anonymous User"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(feedback.createdAt).toLocaleDateString()} at {" "}
                            {new Date(feedback.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                      <div className="mb-3 flex">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            size={18}
                            fill={index < feedback.rating ? "#F59E0B" : "none"}
                            stroke={index < feedback.rating ? "#F59E0B" : "#D1D5DB"}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{feedback.feedback}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;