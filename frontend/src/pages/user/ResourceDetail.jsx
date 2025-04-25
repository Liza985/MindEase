
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Bookmark, Share2, ThumbsUp } from 'lucide-react';
import { FaPlay } from 'react-icons/fa';
// Mock data - in production, you would fetch this from your API
const wellnessResources = [
  {
    title: "Guided Meditation",
    description: "Find inner peace with our expert-led sessions",
    icon: "Moon",
    category: "mindfulness",
    imageUrl: "https://img.freepik.com/premium-vector/middleaged-man-sits-quiet-room-eyes-closed-while-listening-customized-playlist-songs_216520-113520.jpg",
    youtubeUrl: "https://www.youtube.com/embed/KJwYBJMSbPI",
    videoThumbnail: "https://i.ytimg.com/vi/KJwYBJMSbPI/maxresdefault.jpg",
    content: `
      <h1><b>About Guided Meditation</b></h1>
      <p>Guided meditation is a process where one or more participants meditate in response to the guidance provided by a trained practitioner or teacher, either in person or via a written text, sound recording, video, or audiovisual media.</p>
      
      <h2><b>Benefits</b></h2>
      <ul>
        <li>Reduces stress and anxiety</li>
        <li>Improves focus and concentration</li>
        <li>Enhances self-awareness</li>
        <li>Promotes better sleep</li>
        <li>Increases emotional well-being</li>
      </ul>
      
      <h2><b>How to Practice</b></h2>
      <p>Find a quiet, comfortable place where you won't be disturbed. Sit in a comfortable position, close your eyes, and take a few deep breaths to center yourself. Then, follow along with the guided meditation instructions, focusing on your breath and the visualization provided.</p>
      
      <h2><b>Recommended Sessions</b></h2>
      <p>For beginners, we recommend starting with our 5-minute "Morning Clarity" session, followed by the 10-minute "Stress Relief" session once you feel comfortable with the practice.</p>
      
      <h2><b>Video Resources</b></h2>
      <p>Check out our video tutorials below to learn more about meditation techniques and get started with guided sessions led by our experts.</p>
    `,
    duration: "10-15 minutes",
    recommendedFrequency: "Daily",
    expertAuthor: "Dr. Khushi Aggarwal",
    relatedResources: ["Mood Tracking", "Calming Sounds"],
    videos: [
      {
        title: "5-Minute Guided Meditation for Beginners",
        duration: "5:23",
        thumbnail: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/oriental-meditation-japanese-music-youtube-th-design-template-007ee76146bb73195baf57d813b2ed83.jpg?ts=1595695510",
        youtubeUrl: "https://www.youtube.com/embed/KJwYBJMSbPI",
      },
      {
        title: "Morning Clarity Meditation Session",
        duration: "10:12",
        thumbnail: "https://w0.peakpx.com/wallpaper/725/338/HD-wallpaper-digital-clarity-clarity-sunlights-grass-background-nice-environment-shadows-forests-morning-widescreen-black-sky-trees-pines-cool-parkscapes-digital-awesome-brown-beautiful-seasons-thumbnail.jpg",
        youtubeUrl: "https://www.youtube.com/embed/KJwYBJMSbPI",
      }
    ]
  },
  {
    title: "Mood Tracking",
    description: "Monitor and understand your emotional patterns",
    icon: "BookOpen",
    category: "self-care",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4D12AQFpNaeNZNPBbg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1679902040405?e=2147483647&v=beta&t=2DkEoMD2xEPkjjheyLpNXekOJnNUv_jYcLVfnMQhduU",
    youtubeUrl: "https://www.youtube.com/embed/dOkyKyVFnSs",
    videoThumbnail: "https://i.ytimg.com/vi/dOkyKyVFnSs/maxresdefault.jpg",
    content: `
      <h2><b>About Mood Tracking</b></h2>
      <p>Mood tracking is the practice of recording your emotional state at regular intervals to identify patterns and triggers that affect your mental wellbeing.</p>
      
      <h2><b>Benefits</b></h2>
      <ul>
        <li>Identifies emotional patterns</li>
        <li>Recognizes triggers for mood changes</li>
        <li>Helps measure progress in mental health journey</li>
        <li>Provides insights for therapy sessions</li>
        <li>Increases emotional self-awareness</li>
      </ul>
      
      <h2><b>How to Track</b></h2>
      <p>Use our digital mood tracker to record your emotional state 2-3 times daily. Note the intensity of your feelings on a scale of 1-10, add context about what might have triggered your mood, and over time, review your data to identify patterns.</p>
      
      <h2><b>Getting Started</b></h2>
      <p>Begin by tracking basic emotions like happy, sad, anxious, and calm. As you become more comfortable with the practice, expand to more nuanced emotional states and add notes about potential triggers or situations.</p>
      
      <h2><b>Video Resources</b></h2>
      <p>Watch our tutorials to learn effective mood tracking techniques and how to interpret your emotional data.</p>
    `,
    duration: "2 minutes per entry",
    recommendedFrequency: "2-3 times daily",
    expertAuthor: "Dr. Lalit Jindal",
    relatedResources: ["Guided Meditation", "Mind-Body Exercise"],
    videos: [
      {
        title: "How to Track Your Emotions Effectively",
        duration: "7:45",
        thumbnail: "https://www.shutterstock.com/image-vector/emotions-concept-mood-scale-arrow-260nw-1922808407.jpg",
        youtubeUrl: "https://www.youtube.com/embed/dOkyKyVFnSs",
      },
      {
        title: "Understanding Your Mood Patterns",
        duration: "12:37",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgKRuteerEE1-6pHLiHJ3KmAep03F74s2Rsw&s",
        youtubeUrl: "https://www.youtube.com/embed/Onb6_bRJ0Bw",
      }
    ]
  },
  {
    title: "Calming Sounds",
    description: "Curated playlists for relaxation and focus",
    icon: "Music",
    category: "relaxation",
    imageUrl: "https://krisp.ai/blog/wp-content/uploads/2019/08/Top-relaxing-sounds-to-help-you-focus-1.jpg",
    youtubeUrl: "https://www.youtube.com/embed/G8nNGk6LHaM",
    videoThumbnail: "https://i.ytimg.com/vi/G8nNGk6LHaM/maxresdefault.jpg",
    content: `
      <h2><b>About Calming Sounds</b></h2>
      <p>Calming sounds therapy uses specific audio frequencies and natural soundscapes to promote relaxation, reduce stress, and improve focus.</p>
      
      <h2><b>Benefits</b></h2>
      <ul>
        <li>Reduces stress and anxiety</li>
        <li>Promotes relaxation and calmness</li>
        <li>Improves focus and concentration</li>
        <li>Aids in meditation practices</li>
        <li>Helps create a peaceful environment</li>
      </ul>
      
      <h2><b>Our Sound Library</b></h2>
      <p>Our library features nature sounds (rainfall, ocean waves, forest ambience), white noise, binaural beats, and instrumental music specifically composed for relaxation and focus.</p>
      
      <h2><b>Recommended Playlists</b></h2>
      <p>For sleep improvement, try our "Deep Ocean" playlist. For focus and productivity, the "Focus Flow" playlist with gentle instrumental music works best for many users.</p>
      
      <h2><b>Video Sessions</b></h2>
      <p>Experience our calming sound sessions with beautiful visuals to enhance your relaxation experience.</p>
    `,
    duration: "Variable (5-60 minutes)",
    recommendedFrequency: "As needed",
    expertAuthor: "Dr. Lakshay Bhatia",
    relatedResources: ["Guided Meditation", "Mind-Body Exercise"],
    videos: [
      {
        title: "Ocean Waves - 30 Minute Relaxation",
        duration: "30:00",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS89u8LllZ7RDy_KazACP_rTc-3NIvWzHeJbg&s",
        youtubeUrl: "https://www.youtube.com/embed/G8nNGk6LHaM",
      },
      {
        title: "Forest Sounds for Focus and Concentration",
        duration: "45:22",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCYfDfQPiOaXaJMcyefPMtqkh68kSpDH3PJA&s",
        youtubeUrl: "https://www.youtube.com/embed/RzVvThhjAKw",
      }
    ]
  },
  {
    title: "Mind-Body Exercise",
    description: "Holistic workouts for mental clarity",
    icon: "Activity",
    category: "physical",
    imageUrl: "https://img.freepik.com/premium-vector/retired-individual-maintaining-their-health-mobility-by-participating-virtual-workout_216520-81394.jpg",
    youtubeUrl: "https://www.youtube.com/embed/GIEPLHvN6lY",
    videoThumbnail: "https://i.ytimg.com/vi/GIEPLHvN6lY/maxresdefault.jpg",
    content: `
      <h2><b>About Mind-Body Exercise></b></h2>
      <p>Mind-body exercises combine physical movement with mental focus and controlled breathing to improve both physical fitness and mental wellbeing.</p>
      
      <h2><b>Benefits</b></h2>
      <ul>
        <li>Reduces physical tension and stress</li>
        <li>Improves physical strength and flexibility</li>
        <li>Enhances mental clarity and focus</li>
        <li>Promotes mind-body connection</li>
        <li>Balances energy and improves mood</li>
      </ul>
      
      <h2><b>Exercise Types</b></h2>
      <p>Our program includes yoga, tai chi, qigong, and mindful walking sessions, each designed to combine physical movement with mental awareness.</p>
      
      <h2><b>Getting Started</b></h2>
      <p>Begin with our "Gentle Morning Flow" for beginners. This 15-minute routine can be done upon waking to set a positive tone for your day and requires no special equipment.</p>
      
      <h2><b>Video Tutorials</b></h2>
      <p>Follow along with our instructor-led video sessions to learn proper techniques and incorporate mind-body exercises into your routine.</p>
    `,
    duration: "15-45 minutes",
    recommendedFrequency: "3-5 times weekly",
    expertAuthor: "Dr. Liza",
    relatedResources: ["Guided Meditation", "Calming Sounds"],
    videos: [
      {
        title: "Gentle Morning Yoga Flow for Beginners",
        duration: "15:48",
        thumbnail: "https://static.vecteezy.com/system/resources/thumbnails/055/087/255/small/yoga-and-meditation-retreat-illustration-for-relaxation-and-mindfulness-in-a-flat-style-background-vector.jpg",
        youtubeUrl: "https://www.youtube.com/embed/GIEPLHvN6lY",
      },
      {
        title: "Introduction to Tai Chi Fundamentals",
        duration: "22:15",
        thumbnail: "https://media.gettyimages.com/id/1472628333/video/yoga-fitness-and-class-with-a-people-in-a-studio-for-wellness-mental-health-or-inner-peace.jpg?s=640x640&k=20&c=H_W3GgERG4sDsC1xKwUWek8BZ-DP0F8OjKI6j1WMrtI=",
        youtubeUrl: "https://www.youtube.com/embed/gj0xiH7tca8",
      }
    ]
  }
];

const VideoModal = ({ video, isOpen, onClose }) => {
  if (!isOpen || !video) return null;
  
  // Helper function to extract YouTube ID from various URL formats
  const getYouTubeId = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  // Get the embed URL for the video
  const youtubeId = getYouTubeId(video.youtubeUrl);
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : video.youtubeUrl;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl w-full relative">
        <div className="relative pt-[56.25%]">
          {embedUrl ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black">
              <p className="text-white">Video URL not available</p>
            </div>
          )}
        </div>
        <div className="p-6 ">
          <h3 className="text-xl font-semibold">{video.title}</h3>
          <p className="text-gray-600">
            {video.duration && `Duration: ${video.duration}`}
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};


const ResourceDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100) + 10);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    // In production, you would fetch data from your API here
    const decodedTitle = decodeURIComponent(title);
    const foundResource = wellnessResources.find(r => r.title === decodedTitle);
    
    if (foundResource) {
      setResource(foundResource);
      setIsLoading(false);
    } else {
      // Resource not found, redirect to resources page
      navigate('/resources');
    }
  }, [title, navigate]);

  useEffect(() => {
    // Close video modal if ESC is pressed
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowVideoModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    // Prevent body scrolling when modal is open
    if (showVideoModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [showVideoModal]);

  // Only one loading condition
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    // In production, you would save this to user's profile
  };

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
    // In production, you would update this in your database
  };

  const handleShareClick = () => {
    // In production, implement your sharing functionality
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };
  
  const openVideoModal = (video) => {
    setActiveVideo(video);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setActiveVideo(null);
  };
  const YouTubeThumbnail = ({ video, onClick }) => {
    return (
      <div
        className="relative w-full h-48 bg-gray-200 cursor-pointer"
        onClick={onClick}
      >
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

  return (
    <div className="bg-gradient-to-b from-white to-orange-50 min-h-screen">
      {/* Hero section with image */}
      <div className="relative h-72 md:h-96 lg:h-112 overflow-hidden">
        <img 
          src={resource.imageUrl} 
          alt={resource.title} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
        
        {/* Video play button if video exists */}
        {resource.videoUrl && (
          <button
            onClick={() => openVideoModal({
              title: `${resource.title} Introduction`,
              url: resource.videoUrl,
              thumbnail: resource.videoThumbnail
            })}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 bg-opacity-90 p-5 rounded-full hover:bg-orange-600 transition-all z-10 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-opacity-50"
            aria-label="Play introduction video"
          >
            <FaPlay className="w-8 h-8 text-white" fill="white" FaPlay />
          </button>
        )}
        
        {/* Back button */}
        <button 
          onClick={handleBackClick}
          className="absolute top-6 left-6 bg-white/90 p-2.5 rounded-full hover:bg-white shadow-md transition-all z-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-orange-900" />
        </button>
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col space-y-2">
              <span className="inline-block w-fit px-4 py-1.5 bg-orange-500 text-white text-sm font-medium rounded-full capitalize shadow-sm">
                {resource.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                {resource.title}
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content container */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-16">
        {/* Resource metadata card */}
        <div className="bg-white rounded-xl shadow-md -mt-6 md:-mt-10 mb-10 p-5 md:p-6 z-10 relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-orange-500" />
                <span className="font-medium">{resource.duration}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                <span className="font-medium">{resource.recommendedFrequency}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-5">
              <button 
                onClick={handleSaveClick} 
                className={`flex items-center gap-1.5 ${isSaved ? 'text-orange-500' : 'text-gray-600'} hover:text-orange-500 transition-colors`}
              >
                <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
                <span className="font-medium">{isSaved ? 'Saved' : 'Save'}</span>
              </button>
              <button 
                onClick={handleLikeClick} 
                className="flex items-center gap-1.5 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <ThumbsUp className="w-5 h-5" />
                <span className="font-medium">{likeCount}</span>
              </button>
              <button 
                onClick={handleShareClick} 
                className="flex items-center gap-1.5 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-6 bg-gray-50 rounded-2xl shadow-lg">
      {/* Main content column */}
      {/* Main content column with improved Tailwind styling */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Description with enhanced typography and readability */}
                  <p className="
                    text-lg 
                    leading-relaxed 
                    text-gray-700 
                    tracking-wide 
                    antialiased 
                    border-l-4 
                    border-orange-500 
                    pl-4 
                    italic 
                    font-light
                  ">
                    {resource.description}
                  </p>
                  
                  {/* Main content with advanced Tailwind prose styling */}
                  <div 
                    className="
                      prose prose-lg prose-orange 
                      max-w-none 
                      prose-headings:text-orange-900 
                      prose-headings:font-bold 
                      prose-headings:border-b-2 
                      prose-headings:border-orange-200 
                      prose-headings:pb-1
                      prose-headings:mt-8
                      prose-p:text-gray-700 
                      prose-p:leading-relaxed
                      prose-p:mb-4
                      prose-li:text-gray-600 
                      prose-li:marker:text-orange-500
                      prose-li:marker:font-bold
                      prose-li:pl-2
                      prose-strong:text-orange-900 
                      prose-strong:font-extrabold
                      prose-img:rounded-xl 
                      prose-img:shadow-lg 
                      prose-img:transition-transform 
                      prose-img:hover:scale-105
                      prose-a:text-orange-600 
                      prose-a:underline 
                      prose-a:decoration-orange-300
                      prose-a:hover:text-orange-800
                      prose-a:transition-colors
                      prose-blockquote:border-l-orange-400
                      prose-blockquote:text-gray-600
                      prose-blockquote:italic
                      space-y-6
                    "
                    dangerouslySetInnerHTML={{ __html: resource.content }}
                  />     

                  {/* Video section with enhanced styling */}
                  {resource.videos && resource.videos.length > 0 && (
                    <div className="mt-12">
                      <h3 className="
                        text-2xl 
                        font-bold 
                        text-orange-900 
                        mb-6 
                        pb-3 
                        border-b-2 
                        border-orange-200
                      ">
                        Video Resources
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {resource.videos.map((video, index) => (
                          <div 
                            key={index} 
                            className="
                              group 
                              bg-white 
                              rounded-xl 
                              overflow-hidden 
                              shadow-md 
                              hover:shadow-lg 
                              transition-all 
                              cursor-pointer 
                              border 
                              border-transparent 
                              hover:border-orange-200
                            "
                            onClick={() => openVideoModal(video)}
                          >
                            <div className="relative h-48 overflow-hidden">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className="
                                  w-full 
                                  h-full 
                                  object-cover 
                                  group-hover:scale-105 
                                  transition-transform 
                                  duration-300
                                "
                              />
                              <div className="
                                absolute 
                                inset-0 
                                bg-black 
                                bg-opacity-30 
                                flex 
                                items-center 
                                justify-center 
                                opacity-0 
                                group-hover:opacity-100 
                                transition-opacity
                              ">
                                <div className="
                                  bg-orange-500 
                                  rounded-full 
                                  p-4 
                                  group-hover:animate-pulse
                                ">
                                  <FaPlay className="w-6 h-6 text-white" fill="white" />
                                </div>
                              </div>
                              <div className="
                                absolute 
                                bottom-2 
                                right-2 
                                bg-black 
                                bg-opacity-70 
                                px-2 
                                py-1 
                                rounded-md
                              ">
                                <span className="text-white text-xs font-medium">
                                  {video.duration}
                                </span>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="
                                font-medium 
                                text-gray-800 
                                group-hover:text-orange-600 
                                transition-colors
                              ">
                                {video.title}
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              {/* Sidebar column */}
          <div className="space-y-8">
            {/* Expert author card */}
            <div className="bg-orange-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">Resource Expert</h3>
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">{resource.expertAuthor}</p>
              </div>
            </div>
            
            {/* CTA card */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-orange-900 mb-3">Ready to try this resource?</h3>
              <p className="text-gray-700 mb-5">Add it to your wellness routine and track your progress.</p>
              <button className="w-full px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                Add to My Resources
              </button>
            </div>
          </div>
        </div>
        
        {/* Related resources section */}
        {resource.relatedResources && resource.relatedResources.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-orange-900 mb-6">Related Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resource.relatedResources.map((relatedTitle, index) => {
                const relatedResource = wellnessResources.find(r => r.title === relatedTitle);
                if (!relatedResource) return null;
                
                return (
                  <div 
                    key={index} 
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => navigate(`/resource/${encodeURIComponent(relatedResource.title)}`)}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relatedResource.imageUrl} 
                        alt={relatedResource.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <span className="inline-block px-2.5 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full mb-3 capitalize">
                        {relatedResource.category}
                      </span>
                      <h4 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">{relatedResource.title}</h4>
                      <p className="text-sm text-gray-600">{relatedResource.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Video Modal */}
      <VideoModal 
          video={activeVideo}
          isOpen={showVideoModal}
          onClose={closeVideoModal}
        />
      </div>

  );
}

export default ResourceDetail;