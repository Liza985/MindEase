
import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Calendar, Music, Moon, Activity, Users, Star, Coffee, Play, PlayCircle, X, Bell, ArrowRight, Search, Filter, ChevronDown, Clock } from 'lucide-react';
import Header from '../components/Header';

const WellnessHub = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Live Meditation Session",
      date: "March 5, 2025",
      time: "7:00 PM - 8:00 PM",
      host: "Dr. Emma Rivers",
      participants: 24,
      category: "mindfulness"
    },
    {
      id: 2,
      title: "Stress Management Workshop",
      date: "March 10, 2025",
      time: "6:30 PM - 8:30 PM",
      host: "James Wilson",
      participants: 18,
      category: "self-care"
    },
    {
      id: 3,
      title: "Sound Healing Circle",
      date: "March 15, 2025",
      time: "5:00 PM - 6:00 PM",
      host: "Maria Sanchez",
      participants: 12,
      category: "relaxation"
    }
  ]);

  const wellnessResources = [
    {
      title: "Guided Meditation",
      description: "Find inner peace with our expert-led sessions",
      icon: <Moon className="w-6 h-6 text-purple-500" />,
      category: "mindfulness",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZ9S5Z_DjMu7MqnO5zdqj5n_Y-euHMBiWxA&s"
    },
    {
      title: "Mood Tracking",
      description: "Monitor and understand your emotional patterns",
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      category: "self-care",
      imageUrl: "https://media.licdn.com/dms/image/v2/D4D12AQFpNaeNZNPBbg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1679902040405?e=2147483647&v=beta&t=2DkEoMD2xEPkjjheyLpNXekOJnNUv_jYcLVfnMQhduU"
    },
    {
      title: "Calming Sounds",
      description: "Curated playlists for relaxation and focus",
      icon: <Music className="w-6 h-6 text-green-500" />,
      category: "relaxation",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjexMSq3giVjO21j36L1wK9tFQNSCDYwbPiw&s"
    },
    {
      title: "Mind-Body Exercise",
      description: "Holistic workouts for mental clarity",
      icon: <Activity className="w-6 h-6 text-orange-500" />,
      category: "physical",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsB7boaXz1rTVC9fN94MlzlhzagWTA9LazVg&s"
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

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Any initialization code can go here
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  // Header title for the section
  const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-gray-600 mt-2">{subtitle}</p>
    </div>
  );

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

  // New progress tracker component
  const ProgressTracker = () => {
    const [streakDays, setStreakDays] = useState(7);
    const [todayComplete, setTodayComplete] = useState(false);
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="w-6 h-6 text-orange-300 mr-2" />
          Your Wellness Journey
        </h3>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600">Current Streak</p>
            <p className="text-3xl font-bold text-black-600">{streakDays} days</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Today's Progress</p>
            <button 
              className={`px-4 py-2 rounded-md ${todayComplete ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setTodayComplete(!todayComplete)}
            >
              {todayComplete ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>
        
        <div className="flex space-x-1 mb-2">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className={`h-2 flex-1 rounded-full ${i < streakDays ? 'bg-orange-300' : 'bg-gray-200'}`}
            ></div>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-right">7-day goal</p>
      </div>
    );
  };

  // New subscription component
  
const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus({ 
        message: 'Please enter a valid email address', 
        type: 'error' 
      });
      return;
    }
    
    // Simulate API call
    setStatus({ message: 'Submitting...', type: 'loading' });
    
    // Simulate success after delay
    setTimeout(() => {
      setStatus({ 
        message: 'Thank you for subscribing!', 
        type: 'success' 
      });
      setEmail('');
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Subscribe to Our Newsletter</h3>
        <p className="text-gray-600">Get weekly wellness tips and updates on new content</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <button 
            type="submit"
            className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Subscribe
          </button>
        </div>
        
        {status.message && (
          <div className={`text-center py-2 rounded-md ${
            status.type === 'success' ? 'text-green-600 bg-green-50' : 
            status.type === 'error' ? 'text-red-600 bg-red-50' : 
            'text-gray-600 bg-gray-50'
          }`}>
            {status.message}
          </div>
        )}
        
        <div className="text-xs text-gray-500 text-center mt-4">
          By subscribing, you agree to our <a href="#" className="underline hover:text-purple-600">Privacy Policy</a>. 
          We'll never share your email address.
        </div>
      </form>
    </div>
  );
};
const UpcomingEvents = () => {
  // Sample upcoming events data with meeting links
  const upcomingEvents = [
    {
      id: 1,
      title: "Guided Meditation Session",
      date: "February 26, 2025",
      time: "7:00 PM - 8:00 PM EST",
      host: "Sarah Johnson",
      participants: 24,
      meetingLink: "https://zoom.us/j/1234567890"
    },
    {
      id: 2,
      title: "Stress Management Workshop",
      date: "February 28, 2025",
      time: "6:30 PM - 8:00 PM EST",
      host: "Dr. Michael Chen",
      participants: 42,
      meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 3,
      title: "Mindful Movement Class",
      date: "March 2, 2025",
      time: "10:00 AM - 11:00 AM EST",
      host: "Emma Rodriguez",
      participants: 18,
      meetingLink: "https://teams.microsoft.com/meeting/123456"
    }
  ];

  // Function to handle joining an event
  const handleJoinEvent = (meetingLink) => {
    // Open the meeting link in a new tab
    window.open(meetingLink, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-16">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Upcoming Live Events</h3>
        <button className="text-orange-500 font-medium flex items-center">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      
      <div className="space-y-4">
        {upcomingEvents.map(event => (
          <div key={event.id} className="border-l-4 border-orange-500 pl-4 py-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg">{event.title}</h4>
                <p className="text-gray-600 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {event.date}
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {event.time}
                </p>
                <p className="text-gray-600 mt-1">Host: {event.host}</p>
              </div>
              <div className="text-right">
                <span className="bg-purple-100 text-black text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {event.participants} joined
                </span>
                <button 
                  className="block mt-2 bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-300 transition text-sm"
                  onClick={() => handleJoinEvent(event.meetingLink)}
                >
                  Join Event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

 return (
    <>
     <Header/>
          <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pt-16">
            {/* Hero Section */}
            <div className="relative h-96 mb-16 overflow-hidden">
              <WaveBackground />
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center text-black p-8 max-w-4xl mx-auto">
                  <h1 className="text-5xl sm:text-6xl font-bold mb-6">Welcome to Your Wellness Journey</h1>
                  <p className="text-xl max-w-2xl mx-auto mb-8">
                    Discover peace, balance, and inner harmony through our curated wellness experiences
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={"/register"} className="bg-blue-400 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      Start Your Journey
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-black-600 px-8 py-3 rounded-lg font-medium transition shadow hover:shadow-md">
                      Explore Resources
                    </button>
                  </div>
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
                ? 'bg-orange-500 text-white' 
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

        

        {/* Featured Section */}
        <div className="max-w-6xl mx-auto px-6 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{icon: Moon, title: "Daily Meditation", text: "Start your day with mindfulness", bg: "from-purple-500 to-blue-500"},
            {icon: Heart, title: "Self-Care Rituals", text: "Nurture your mind and body", bg: "from-green-500 to-teal-500"},
            {icon: Coffee, title: "Mindful Living", text: "Transform your daily habits", bg: "from-orange-500 to-red-500"}]
            .map(({ icon: Icon, title, text, bg }, index) => (
              <div key={index} className={`rounded-lg bg-gradient-to-br ${bg} text-white p-6 text-center transform transition hover:scale-105 hover:shadow-xl`}>
                <Icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p>{text}</p>
              </div>
          ))}
        </div>
        {/* User Progress Section */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <ProgressTracker />
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

        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto px-6 mb-8 bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" className="block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-500 focus:ring-1 focus:ring-purple-500" placeholder="Search wellness resources..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center px-4 py-2 border rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-purple-500">
            <Filter className="h-5 w-5 mr-2" /> Filters <ChevronDown className="h-4 w-4 ml-2" />
          </button>
        </div>

        {/* Upcoming Events Section */}
        <div className="max-w-6xl mx-auto px-6">
          <UpcomingEvents />
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

          <div className="max-w-6xl mx-auto px-6 mb-16">
            <NewsletterSubscription />
          </div>
        
      </div>
    </>
  );
};

export default WellnessHub;
