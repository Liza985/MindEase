


import React, { useState } from 'react';
import { Heart, BookOpen, Calendar, Music, Moon, Activity, Users, Star, Coffee, Play, PlayCircle, X } from 'lucide-react';
import Header from '../components/Header';

const WellnessHub = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const wellnessResources = [
    {
      title: "Guided Meditation",
      description: "Find inner peace with our expert-led sessions",
      icon: <Moon className="w-6 h-6 text-purple-500" />,
      category: "mindfulness",
      imageUrl: "/api/placeholder/800/600"
    },
    {
      title: "Mood Tracking",
      description: "Monitor and understand your emotional patterns",
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      category: "self-care",
      imageUrl: "/api/placeholder/800/600"
    },
    {
      title: "Calming Sounds",
      description: "Curated playlists for relaxation and focus",
      icon: <Music className="w-6 h-6 text-green-500" />,
      category: "relaxation",
      imageUrl: "/api/placeholder/800/600"
    },
    {
      title: "Mind-Body Exercise",
      description: "Holistic workouts for mental clarity",
      icon: <Activity className="w-6 h-6 text-orange-500" />,
      category: "physical",
      imageUrl: "/api/placeholder/800/600"
    }
  ];

  
  const wellnessVideos = [
    {
      title: "Morning Meditation Routine",
      duration: "15 mins",
      youtubeUrl: "https://www.youtube.com/embed/KJwYBJMSbPI",
      category: "Featured",
      views: "10.5k"
    },
    {
      title: "Stress Relief Breathing",
      duration: "10 mins",
      youtubeUrl: "https://www.youtube.com/embed/inpok4MKVLM",
      category: "Popular",
      views: "8.2k"
    },
    {
      title: "Mindful Movement Flow",
      duration: "20 mins",
      youtubeUrl: "https://www.youtube.com/embed/qFZKK7K52uQ",
      category: "New",
      views: "5.7k"
    }
  ];

  
  const testimonials = [
    {
      name: "Sarah J.",
      text: "This wellness hub transformed my daily routine. The meditation guides are exceptional!",
      rating: 5
    },
    {
      name: "Michael R.",
      text: "The mood tracking feature helped me understand my emotional patterns better.",
      rating: 5
    }
  ];
const VideoModal = ({ video, isOpen, onClose }) => {
  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full relative">
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={video.youtubeUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold">{video.title}</h3>
          <p className="text-gray-600">{video.category} • {video.views} views</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const YouTubeThumbnail = ({ video, onClick }) => {
  return (
    <div className="relative w-full h-48 bg-gray-200 cursor-pointer" onClick={onClick}>
      <img 
        src="https://via.placeholder.com/640x360"
        alt={video.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all">
        <PlayCircle className="w-16 h-16 text-white" />
      </div>
    </div>
  );
};
  const WaveBackground = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
      <div className="absolute w-full h-full">
        <svg className="absolute w-[200%] left-[-50%] animate-[wave_20s_linear_infinite]" viewBox="0 0 2000 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="rgba(191, 219, 254, 0.2)"
            d="M-200,0 Q400,80 800,30 T1800,60 L1800,200 L-200,200 Z">
            <animate attributeName="d" dur="10s" repeatCount="indefinite"
              values="M-200,0 Q400,80 800,30 T1800,60 L1800,200 L-200,200 Z;
                      M-200,0 Q400,30 800,80 T1800,40 L1800,200 L-200,200 Z;
                      M-200,0 Q400,80 800,30 T1800,60 L1800,200 L-200,200 Z"/>
          </path>
        </svg>
      </div>
      <div className="absolute w-full h-full">
        <svg className="absolute w-[200%] left-[-50%] animate-[wave_15s_linear_infinite]" viewBox="0 0 2000 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="rgba(147, 197, 253, 0.2)"
            d="M-200,40 Q400,100 800,50 T1800,80 L1800,200 L-200,200 Z">
            <animate attributeName="d" dur="15s" repeatCount="indefinite"
              values="M-200,40 Q400,100 800,50 T1800,80 L1800,200 L-200,200 Z;
                      M-200,40 Q400,50 800,100 T1800,60 L1800,200 L-200,200 Z;
                      M-200,40 Q400,100 800,50 T1800,80 L1800,200 L-200,200 Z"/>
          </path>
        </svg>
      </div>
      <div className="absolute w-full h-full">
        <svg className="absolute w-[200%] left-[-50%] animate-[wave_12s_linear_infinite]" viewBox="0 0 2000 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="rgba(96, 165, 250, 0.1)"
            d="M-200,70 Q400,120 800,70 T1800,100 L1800,200 L-200,200 Z">
            <animate attributeName="d" dur="20s" repeatCount="indefinite"
              values="M-200,70 Q400,120 800,70 T1800,100 L1800,200 L-200,200 Z;
                      M-200,70 Q400,70 800,120 T1800,80 L1800,200 L-200,200 Z;
                      M-200,70 Q400,120 800,70 T1800,100 L1800,200 L-200,200 Z"/>
          </path>
        </svg>
      </div>
    </div>
  );

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative h-96 mb-12 overflow-hidden">
        <WaveBackground />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-black p-8">
            <h1 className="text-5xl font-bold mb-4">Welcome to Your Wellness Journey</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover peace, balance, and inner harmony through our curated wellness experiences
            </p>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white p-6 text-center">
            <Moon className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Daily Meditation</h3>
            <p>Start your day with mindfulness</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-green-500 to-teal-500 text-white p-6 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Self-Care Rituals</h3>
            <p>Nurture your mind and body</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 text-center">
            <Coffee className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mindful Living</h3>
            <p>Transform your daily habits</p>
          </div>
        </div>
      </div>

      {/* Tabs and Resources */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="flex space-x-4 mb-8 bg-white rounded-lg p-2">
          {['all', 'mindfulness', 'self-care', 'relaxation'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md flex-1 capitalize transition-colors ${
                activeTab === tab 
                ? 'bg-purple-500 text-white' 
                : 'hover:bg-purple-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wellnessResources
            .filter(resource => activeTab === 'all' || resource.category === activeTab)
            .map((resource, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img 
                  src={resource.imageUrl} 
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    {resource.icon}
                    <h3 className="text-xl font-semibold">{resource.title}</h3>
                  </div>
                  <p className="text-gray-600">{resource.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Wellness Videos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Star className="w-6 h-6 mr-2" />
              Featured
            </h3>
            <p>Our most impactful wellness sessions</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              Popular
            </h3>
            <p>Community favorites and trending content</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              New
            </h3>
            <p>Fresh content added weekly</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wellnessVideos.map((video, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <YouTubeThumbnail 
                video={video} 
                onClick={() => setSelectedVideo(video)} 
              />
                             <div className="p-4">
                 <span className="text-sm font-medium text-purple-600 mb-2 block">
                   {video.category}
                 </span>
                 <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                 <div className="flex items-center text-gray-600 text-sm">
                   <Play className="w-4 h-4 mr-1" />
                   {video.views} views
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>

       {/* Testimonials */}
       <div className="bg-white py-16 mb-16">
         <div className="max-w-6xl mx-auto px-6">
           <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {testimonials.map((testimonial, index) => (
               <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
                 <div className="flex items-center mb-4">
                   {[...Array(testimonial.rating)].map((_, i) => (
                     <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                   ))}
                 </div>
                 <p className="text-gray-700 italic mb-4">{testimonial.text}</p>
                 <p className="font-semibold text-gray-900">{testimonial.name}</p>
               </div>
             ))}
           </div>
         </div>
       </div>
      {/* Video Modal */}
    <VideoModal 
    video={selectedVideo} 
    isOpen={!!selectedVideo} 
    onClose={() => setSelectedVideo(null)} 
    />
     </div>

    </>
    


   );
 };

 export default WellnessHub;

