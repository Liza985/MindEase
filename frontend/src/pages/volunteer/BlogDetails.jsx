import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import VolHeader from "../../components/VolHeader";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlogsById } from "../../redux/Actions/blogAction";



const BlogDetails = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample blog data - in a real app, you would fetch this from an API based on the ID
  const blogData = [
    {
      id: 1,
      title: "Effective Communication Strategies for Volunteers",
      author: "Jane Smith",
      date: "Feb 20, 2025",
      excerpt: "Learn how to effectively communicate with those seeking help and guidance...",
      content: `
        <p>Effective communication is the cornerstone of successful volunteering. When working with individuals seeking support, clear and compassionate communication can make all the difference in establishing trust and providing meaningful assistance.</p>
        
        <h2>Active Listening</h2>
        <p>Active listening involves fully concentrating on what the other person is saying rather than passively hearing their words. This means:</p>
        <ul>
          <li>Maintaining eye contact (in person) or giving verbal acknowledgments (virtually)</li>
          <li>Avoiding interruptions and allowing the person to express themselves completely</li>
          <li>Reflecting back what you've heard to confirm understanding</li>
          <li>Asking clarifying questions when needed</li>
        </ul>
        
        <h2>Using Empathetic Language</h2>
        <p>The words we choose can significantly impact how our support is received. Empathetic language involves:</p>
        <ul>
          <li>Using "I" statements to share your perspective without imposing judgment</li>
          <li>Acknowledging emotions with phrases like "That sounds difficult" or "I can understand why you might feel that way"</li>
          <li>Avoiding minimizing language such as "at least" or "it could be worse"</li>
        </ul>
        
        <h2>Cultural Sensitivity</h2>
        <p>As volunteers, we work with individuals from diverse backgrounds. Cultural sensitivity in communication includes:</p>
        <ul>
          <li>Being aware of cultural differences in communication styles</li>
          <li>Avoiding assumptions based on cultural stereotypes</li>
          <li>Asking respectful questions when you're unsure about cultural norms</li>
          <li>Being open to learning from those you're serving</li>
        </ul>
        
        <h2>Practical Techniques for Virtual Communication</h2>
        <p>Many volunteer interactions now happen virtually, requiring additional skills:</p>
        <ul>
          <li>Being mindful of technical issues and having backup plans</li>
          <li>Using video when possible to establish a more personal connection</li>
          <li>Checking in more frequently to ensure understanding, as nonverbal cues may be limited</li>
          <li>Being aware of your tone and pace, as these can be more easily misinterpreted online</li>
        </ul>
        
        <p>By implementing these communication strategies, volunteers can create a supportive environment where individuals feel heard, respected, and valued. Remember that effective communication is a skill that improves with practice and reflection.</p>
      `,
      image: "/api/placeholder/800/400",
      tags: ["Communication", "Volunteer Skills", "Mentoring"]
    },
    {
      id: 2,
      title: "Building Trust in Virtual Mentoring Relationships",
      author: "Mark Johnson",
      date: "Feb 15, 2025",
      excerpt: "Discover techniques to establish trust and rapport in online mentoring sessions...",
      content: `<p>This is the full content of the Building Trust article...</p>`,
      image: "/api/placeholder/800/400",
      tags: ["Trust Building", "Virtual Mentoring", "Online Support"]
    },
    {
      id: 3,
      title: "Setting Boundaries as a Volunteer",
      author: "Lisa Wong",
      date: "Feb 10, 2025",
      excerpt: "How to maintain healthy boundaries while providing meaningful support...",
      content: `<p>This is the full content of the Setting Boundaries article...</p>`,
      image: "/api/placeholder/800/400",
      tags: ["Boundaries", "Self-Care", "Volunteer Wellbeing"]
    }
  ];
  const {message,error,blogById,loading}=useSelector((state)=>state.blog)

  useEffect(() => {
    // Simulate API fetch
    dispatch(getBlogsById(id));
    

    
  }, [id]);

  const handleUpdateClick = () => {
    navigate(`/volunteer/article/update/${id}`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // In a real app, you would make an API call to delete the blog

    console.log(id)
    dispatch(deleteBlog(id));
    setShowDeleteModal(false);
    // Redirect to blog listing page after deletion
    navigate("/volunteer/article");
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <>
        <VolHeader />
        <div className="flex min-h-screen justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </>
    );
  }

  if (!blogById) {
    return (
      <>
        <VolHeader />
        <div className="flex min-h-screen justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">Blog Not Found</h2>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate("/volunteer/article")}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <VolHeader />
      <div className="flex min-h-screen">
        <div className="flex-1">
          <main className="max-w-4xl mx-auto p-6">
            {/* Back button */}
            <button 
              onClick={() => navigate("/volunteer/article")} 
              className="flex items-center text-orange-500 mb-6 hover:text-orange-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blogs
            </button>

            {/* Blog header with action buttons */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <img src={blogById?.image?.url} alt={blogById?.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-orange-700">{blogById?.title}</h1>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleUpdateClick}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Update
                    </button>
                    <button 
                      onClick={handleDeleteClick}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  By {blogById?.author} | {blogById?.date}
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {blogById?.topic?.map((tag, index) => (
                    <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Blog content */}
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: blogById?.body }}
                />
              </div>
            </div>

            {/* Related articles section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-orange-700 mb-4">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {blogData
                  .filter(relatedBlog => relatedBlog?.id !== parseInt(id))
                  .slice(0, 2)
                  .map(relatedBlog => (
                    <div key={relatedBlog.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition">
                      <h3 className="text-lg font-medium text-orange-700 mb-2">{relatedBlog?.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{relatedBlog?.excerpt}</p>
                      <button 
                        onClick={() => navigate(`/volunteer/article/${relatedBlog?.id}`)}
                        className="text-orange-500 text-sm font-medium hover:text-orange-600 transition"
                      >
                        Read More
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{blogById?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer className="bg-white shadow-sm border-t border-gray-200 p-4 text-center text-black-800">
        <p className="text-sm">
          &copy; 2025 MindEaseConnect. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default BlogDetails;