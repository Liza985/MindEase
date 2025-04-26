import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogByTopic, getBlogsById } from "../../redux/Actions/blogAction";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogById, topicBlog, loading } = useSelector((state) => state.blog);

  // Example quotes - in a real app, these would come from your data source
  const quotes = [
    {
      text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
      author: "Noam Shpancer"
    },
    {
      text: "Self-care is not self-indulgence, it is self-preservation.",
      author: "Audre Lorde"
    },
    {
      text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
      author: "Albus Dumbledore"
    }
  ];

  useEffect(() => {
    if (id) {
      dispatch(getBlogsById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (blogById?.topic?.[0]) {
      dispatch(getBlogByTopic(blogById.topic[0]));
    }
  }, [dispatch, blogById?.topic]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-orange-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <Header />

      {/* Blog Content */}
      <main className="container px-4 py-24 mx-auto flex-grow">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Breadcrumb */}
          <div className="px-8 pt-6 pb-2">
            <div className="flex items-center text-sm text-gray-500">
              <span
                className="hover:text-orange-600 transition duration-300 font-medium cursor-pointer"
                onClick={() => navigate("/blogs")}
              >
                Blogs
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>

              <span className="text-orange-600 font-medium">{blogById?.topic?.[0]}</span>
            </div>
          </div>

          {/* Blog Image */}
          {blogById?.image?.url && (
            <div className="px-8 py-4">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={blogById.image.url}
                  alt={blogById.title}
                  className="w-full h-80 object-cover transform hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Topics */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blogById?.topic?.map((topic, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {blogById?.title}
            </h1>

            {/* Meta info */}
            <div className="flex items-center mb-8 text-gray-500 text-sm">
              <span className="font-medium">
                By {blogById?.volunteerId?.firstName}{" "}
                {blogById?.volunteerId?.lastName}
              </span>
              <span className="mx-2 text-orange-300">•</span>
              <span>{new Date(blogById?.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg mb-8 leading-relaxed font-medium">
              {blogById?.description}
            </p>

            {/* Article content */}
            <div
              className="prose prose-lg prose-orange max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: blogById?.body }}
            />
            
            {/* Quotes Section */}
            <div className="my-12 border-t border-b border-orange-100 py-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-6 h-1 bg-orange-500 rounded-full mr-3"></span>
                Inspiring Quotes
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quotes.map((quote, index) => (
                  <div key={index} className="bg-orange-50 rounded-xl p-6 relative">
                    <div className="absolute top-4 left-4 text-orange-200 opacity-50">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-10 w-10" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <blockquote className="text-gray-700 pl-6 italic">
                      <p className="mb-4">{quote.text}</p>
                      <footer className="text-orange-600 font-medium text-sm text-right">
                        — {quote.author}
                      </footer>
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {topicBlog && topicBlog.length > 0 && (
            <div className="mt-12 bg-orange-50 px-8 py-10 rounded-b-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="w-8 h-1 bg-orange-500 rounded-full mr-3"></span>
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topicBlog.map(
                  (post) =>
                    post._id !== id && (
                      <div
                        key={post._id}
                        className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.topic.map((topic, index) => (
                              <span
                                key={index}
                                className="bg-orange-50 text-orange-600 px-2 py-1 rounded text-xs font-medium"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                            {post.description}
                          </p>
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">
                                By {post.volunteerId?.firstName}{" "}
                                {post.volunteerId?.lastName}
                              </span>
                            </div>
                            <span
                              className="text-orange-600 font-medium hover:text-orange-700 flex items-center cursor-pointer group"
                              onClick={() => navigate(`/blog/${post._id}`)}
                            >
                              Read More
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Back to top button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-orange-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>

      <footer className="bg-white text-center py-6 border-t border-gray-100">
        <p className="text-gray-600">&copy; 2025 MindEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BlogDetail;