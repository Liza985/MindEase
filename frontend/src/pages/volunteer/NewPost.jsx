import { useState } from 'react';
import VolHeader from '../../components/VolHeader';

const NewPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    description: '',
    body: '',
    image: null
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    // Check if all required fields are filled
    if (!formData.title || !formData.topic || !formData.description || !formData.body || !formData.image) {
      setMessage({ type: 'error', content: 'All fields are required' });
      setLoading(false);
      return;
    }


  };

  return (
    <>
    <VolHeader/>
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-300 to-blue-300 p-6">
            <h1 className="text-3xl font-bold text-white">Create New Blog Post</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {message.content && (
              <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.content}
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Blog Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="hidden" 
                id="image-upload"
              />
              <div className="flex items-center">
                <label 
                  htmlFor="image-upload" 
                  className="cursor-pointer bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium py-2 px-4 rounded transition duration-300"
                >
                  Select Image
                </label>
                <span className="ml-3 text-gray-500">
                  {formData.image ? formData.image.name : 'No image selected'}
                </span>
              </div>
              
              {preview && (
                <div className="mt-4">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="h-48 object-cover rounded border border-orange-200" 
                  />
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Enter blog title"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Topic</label>
              <input 
                type="text" 
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Enter blog topic"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Short Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-300 h-24"
                placeholder="Enter a short description"
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Blog Content</label>
              <textarea 
                name="body"
                value={formData.body}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-300 h-48"
                placeholder="Write your blog content here..."
              ></textarea>
            </div>
            
            <div className="text-right">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-gradient-to-r from-orange-400 to-blue-400 hover:from-orange-500 hover:to-blue-500 text-white font-medium py-2 px-6 rounded shadow transition duration-300 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
     
    </div>
    <footer className="bg-white shadow-sm border-t border-gray-200 p-4 text-center text-black-800">
        <p className="text-sm">
          &copy; 2025 MindEaseConnect. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default NewPost;