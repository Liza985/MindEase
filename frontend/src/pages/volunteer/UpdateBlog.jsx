import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VolHeader from "../../components/VolHeader";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    image: ""
  });

  // Sample blog data - replace with API fetch in real implementation
  const blogData = [
    {
      id: 1,
      title: "Effective Communication Strategies for Volunteers",
      excerpt: "Learn how to effectively communicate with those seeking help...",
      content: `Effective communication is the cornerstone of successful volunteering. 
        When working with individuals seeking support, clear and compassionate 
        communication can make all the difference in establishing trust...`,
      image: "/api/placeholder/800/400",
      tags: ["Communication", "Volunteer Skills", "Mentoring"]
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchBlog = () => {
      setIsLoading(true);
      const blogPost = blogData.find(blog => blog.id === parseInt(id));

      if (blogPost) {
        setFormData({
          title: blogPost.title,
          excerpt: blogPost.excerpt,
          content: blogPost.content,
          tags: blogPost.tags.join(", "),
          image: blogPost.image
        });
      }
      setTimeout(() => setIsLoading(false), 500);
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFormData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file) // Show preview
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
        throw new Error("Please fill in all required fields");
      }

      console.log("Updating blog post with data:", formData);

      // Simulate API upload (replace this with actual API logic)
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate(`/volunteer/article/${id}`);
    } catch (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/volunteer/article/${id}`);
  };

  if (isLoading) {
    return (
      <>
        <VolHeader />
        <div className="flex min-h-screen justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-orange-700">Update Blog Post</h1>
              <button onClick={handleCancel} className="text-orange-500 hover:text-orange-600 transition">
                Cancel
              </button>
            </div>

            {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{errorMessage}</div>}

            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit}>
                
                {/* Image Preview */}
                {formData.image && (
                  <div className="mb-4">
                    <img src={formData.image} alt={formData.title} className="w-full rounded-md shadow-sm" />
                  </div>
                )}

                 {/* Image Upload */}
                 <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Update Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Title */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Excerpt <span className="text-red-500">*</span></label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    required
                  ></textarea>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Content <span className="text-red-500">*</span></label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    required
                  ></textarea>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                  />
                </div>

               

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Blog Post"}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
      <footer className="bg-white shadow-sm border-t p-4 text-center">
        <p className="text-sm">&copy; 2025 MindEaseConnect. All rights reserved.</p>
      </footer>
    </>
  );
};

export default UpdateBlog;
