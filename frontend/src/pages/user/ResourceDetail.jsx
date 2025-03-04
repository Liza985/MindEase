import { useParams, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";

const wellnessResources = [
  {
    title: "Guided Meditation",
    description: "Find inner peace with our expert-led sessions.",
    imageUrl: "https://img.freepik.com/premium-vector/middleaged-man-sits-quiet-room-eyes-closed-while-listening-customized-playlist-songs_216520-113520.jpg",
    videoUrl: "https://www.youtube.com/embed/inpok4MKVLM",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    books: [
      { title: "The Miracle of Mindfulness", author: "Thich Nhat Hanh", link: "https://www.goodreads.com/book/show/129592.The_Miracle_of_Mindfulness" }
    ],
    references: [
      { title: "Mindful.org - Meditation Guide", link: "https://www.mindful.org/how-to-meditate/" }
    ],
    benefits: ["Reduces stress and anxiety", "Improves focus", "Enhances emotional well-being"],
    steps: ["Find a quiet space.", "Close your eyes and breathe.", "Follow the guided voice."],
    testimonials: [
      { name: "Sarah L.", feedback: "This changed my life! I feel so calm now." },
      { name: "John D.", feedback: "Amazing guided meditation. Helped me sleep better." }
    ]
  },
  {
    title: "Mood Tracking",
    description: "Monitor and understand your emotional patterns.",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4D12AQFpNaeNZNPBbg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1679902040405?e=2147483647&v=beta&t=2DkEoMD2xEPkjjheyLpNXekOJnNUv_jYcLVfnMQhduU",
    videoUrl: "https://www.youtube.com/embed/inpok4MKVLM",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",    books: [
      { title: "The Mood Cure", author: "Julia Ross", link: "https://www.goodreads.com/book/show/287201.The_Mood_Cure" }
    ],
    references: [
      { title: "Understanding Mood Patterns", link: "https://www.psychologytoday.com/us/blog/your-mind-your-body/201811/how-track-your-mood" }
    ],
    benefits: [
      "Helps identify emotional triggers",
      "Improves self-awareness",
      "Assists in tracking mental health progress"
    ],
    steps: [
      "Log your mood daily using a journal or app.",
      "Identify patterns and emotional triggers.",
      "Use insights to improve mental well-being."
    ],
    testimonials: [
      { name: "Emma W.", feedback: "Mood tracking helped me recognize my stress patterns." },
      { name: "Jake T.", feedback: "A simple yet powerful tool for self-awareness!" }
    ]
  },
  {
    title: "Calming Sounds",
    description: "Curated playlists for relaxation and focus.",
    imageUrl: "https://krisp.ai/blog/wp-content/uploads/2019/08/Top-relaxing-sounds-to-help-you-focus-1.jpg",
    videoUrl: "https://www.youtube.com/embed/qYnA9wWFHLI",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    books: [
      { title: "Healing at the Speed of Sound", author: "Don Campbell", link: "https://www.goodreads.com/book/show/11250844-healing-at-the-speed-of-sound" }
    ],
    references: [
      { title: "How Sounds Impact Mental Health", link: "https://www.health.harvard.edu/mind-and-mood/the-power-of-music" }
    ],
    benefits: [
      "Reduces stress and anxiety",
      "Improves sleep quality",
      "Boosts focus and concentration"
    ],
    steps: [
      "Choose a relaxing playlist or nature sound.",
      "Use noise-canceling headphones for better effect.",
      "Play sounds during work, meditation, or sleep."
    ],
    testimonials: [
      { name: "Liam K.", feedback: "Listening to ocean sounds at night improved my sleep!" },
      { name: "Sophia M.", feedback: "Perfect for focus and relaxation!" }
    ]
  },
  {
    title: "Mind-Body Exercise",
    description: "Holistic workouts for mental clarity.",
    imageUrl: "https://img.freepik.com/premium-vector/retired-individual-maintaining-their-health-mobility-by-participating-virtual-workout_216520-81394.jpg",
    videoUrl: "https://www.youtube.com/embed/inpok4MKVLM",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",    books: [
      { title: "The Mindbody Prescription", author: "John E. Sarno", link: "https://www.goodreads.com/book/show/313776.The_Mindbody_Prescription" }
    ],
    references: [
      { title: "Mind-Body Connection in Exercise", link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5865870/" }
    ],
    benefits: [
      "Enhances mental clarity and focus",
      "Reduces stress and increases energy",
      "Improves flexibility and posture"
    ],
    steps: [
      "Start with 5 minutes of deep breathing.",
      "Practice stretching or light yoga movements.",
      "Combine mindfulness with movement exercises.",
      "Stay consistent for long-term benefits."
    ],
    testimonials: [
      { name: "David P.", feedback: "Yoga and mindfulness workouts transformed my mornings!" },
      { name: "Anna R.", feedback: "I feel more balanced and focused after each session." }
    ]
  }

];

function ResourceDetail() {
  const { title } = useParams();
  const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);

//   if (!isAuthenticated) {
//     navigate("/login");
//     return null;
  //}

  const resource = wellnessResources.find((r) => r.title === decodeURIComponent(title));

  if (!resource) {
    return <div className="text-center text-red-500">Resource not found!</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 mt-20">
        <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg ">
          {/* Cover Image */}
          <img src={resource.imageUrl} alt={resource.title} className="w-full h-72 object-cover" />
          
          <div className="p-8">
            <h2 className="text-4xl font-bold text-gray-800">{resource.title}</h2>
            <p className="text-gray-700 mt-4 text-lg">{resource.description}</p>

            {/* Benefits */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-blue-600">✨ Benefits</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2 text-lg">
                {resource.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            {/* How to Get Started */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-green-600">🛠️ How to Get Started</h3>
              <ol className="list-decimal list-inside text-gray-600 mt-2 text-lg">
                {resource.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Video Section */}
            {resource.videoUrl && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-red-600">🎥 Watch a Video</h3>
                <div className="mt-3">
                  <iframe 
                    className="w-full h-80 rounded-lg shadow-md"
                    src={resource.videoUrl} 
                    title="Resource Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Audio Player */}
            {resource.audioUrl && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-purple-600">🎵 Listen to Calming Sounds</h3>
                <audio controls className="w-full mt-2">
                  <source src={resource.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* Testimonials */}
            {resource.testimonials && (
              <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-2xl font-semibold text-orange-600">🗣️ What People Say</h3>
                {resource.testimonials.map((testimonial, index) => (
                  <p key={index} className="mt-2 text-gray-800 italic">
                    "{testimonial.feedback}" - <strong>{testimonial.name}</strong>
                  </p>
                ))}
              </div>
            )}

            {/* Books */}
            {resource.books.length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-purple-600">📚 Recommended Books</h3>
                <ul className="list-disc list-inside text-gray-600 mt-2 text-lg">
                  {resource.books.map((book, index) => (
                    <li key={index}>
                      <a href={book.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {book.title} - <span className="italic">{book.author}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* References */}
            {resource.references.length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-orange-600">🔗 Useful References</h3>
                <ul className="list-disc list-inside text-gray-600 mt-2 text-lg">
                  {resource.references.map((ref, index) => (
                    <li key={index}>
                      <a href={ref.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {ref.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social Sharing */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-semibold text-teal-600">📢 Share with Friends</h3>
              <div className="flex justify-center gap-4 mt-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Facebook</button>
                <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition">Twitter</button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">WhatsApp</button>
              </div>
            </div>

            {/* Back Button at End */}
            <div className="mt-8 text-center">
              <button onClick={() => navigate(-1)} className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                🔙 Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResourceDetail;
