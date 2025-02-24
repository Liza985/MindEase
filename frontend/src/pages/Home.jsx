
import React from 'react';
import Layout from "../components/Layout";
import { ChevronRight, Heart, Brain, Smile, Clock, Calendar, Book, Shield, Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const WaveBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
    {/* First Wave Layer */}
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

    {/* Second Wave Layer */}
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

    {/* Third Wave Layer */}
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

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group transform hover:-translate-y-2 transition-all duration-300">
    <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="text-blue-600 h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);
const ProgramCard = ({ icon: Icon, title, description }) => (
	  <div className="transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 bg-white p-6 rounded-lg shadow-lg">
	    <Icon className="h-8 w-8 text-orange-500 mb-4 transform group-hover:scale-110 transition-transform" />
	    <h3 className="text-lg font-semibold mb-2">{title}</h3>
	    <p className="text-gray-600">{description}</p>
	  </div>
	);
	
	const TestimonialCard = ({ name, role, content }) => (
	  <div className="transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 bg-white p-6 rounded-lg shadow-md">
	    <div className="flex items-center mb-4">
	      <div className="bg-orange-100 rounded-full p-2 transform hover:scale-110 transition-transform">
	        <Star className="h-5 w-5 text-orange-500" />
	      </div>
	    </div>
	    <p className="text-gray-600 mb-4 italic">"{content}"</p>
	    <div>
	      <p className="font-semibold">{name}</p>
	       <p className="text-sm text-gray-500">{role}</p>
	     </div>
	   </div>
	 );

	 const LandingPage = () => {
	
		  const features = [
		    { icon: Brain, title: "Mindfulness Tools", description: "Access meditation guides, breathing exercises, and wellness resources." },
		    { icon: Heart, title: "Expert Guidance", description: "Connect with certified mental health professionals for support." },
		    { icon: Smile, title: "Peaceful Community", description: "Join a community of individuals sharing experiences and growth." }
		  ];
		
		  const programs = [
		    { icon: Clock, title: "Quick Relief Sessions", description: "15-minute guided sessions for immediate stress relief" },
		    { icon: Calendar, title: "Wellness Programs", description: "Structured 8-week programs for sustained mental health" },
		    { icon: Book, title: "Self-Paced Courses", description: "Learn at your own pace with our comprehensive courses" },
		    { icon: Shield, title: "Crisis Support", description: "24/7 access to emergency mental health resources" }
		  ];
		
		  const testimonials = [
		    { name: "Sarah Johnson", role: "Working Professional", content: "MindEase has transformed my daily routine. The quick meditation sessions have helped me manage work stress effectively." },
		    { name: "Michael Chen", role: "Student", content: "The self-paced courses are incredible. I've learned so many techniques to manage anxiety during exam periods." },
		    { name: "Emma Williams", role: "Parent", content: "The community support here is amazing. It's helped me balance family life and personal well-being." }
		  ];
		
		  const scrollToFeatures = () => {
		    document.getElementById('features')?.scrollIntoView({ 
		      behavior: 'smooth',
		      block: 'start'
		    });
		  };
  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">
        <WaveBackground />
        <div className="relative">
          <header className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold text-blue-900 mb-4 hover:scale-105 transition-transform">Welcome to MindEase</h1>
             <p className="text-xl text-gray-600 max-w-2xl">Your journey to mental wellness starts here.</p>
            <div className="inline-flex rounded-full shadow-lg hover:shadow-xl transition-shadow bg-white bg-opacity-50 backdrop-blur-sm p-1 mt-8">
 			<NavLink
				to="/register"
				>
				<button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all flex items-center group">
					Start Your Journey <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /> 
				</button>
			</NavLink>
			
              <button 
                onClick={scrollToFeatures}
                className="text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-white transform hover:scale-105 transition-all"
              >
                Learn More
              </button>
            </div>
			</header>


          {/* Features Section */}
          <section id="features" className="container mx-auto px-4 py-16 transform hover:scale-105 transition-transform scroll-mt-16">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">How We Support You</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => <FeatureCard key={index} {...feature} />)}
            </div>
          </section>

           <section id="programs" className="container mx-auto px-4 py-16 bg-orange-50 transform hover:scale-105 transition-transform scroll-mt-16">
             <h2 className="text-3xl font-bold text-center text-orange-900 mb-12">Our Wellness Programs</h2>
             <div className="grid md:grid-cols-4 gap-6">
               {programs.map((program, index) => <ProgramCard key={index} {...program} />)}
             </div>
           </section>

           <section id="testimonials" className="container mx-auto px-4 py-16 transform hover:scale-105 transition-transform scroll-mt-16">
             <h2 className="text-3xl font-bold text-center text-orange-900 mb-4">Success Stories</h2>
             <p className="text-center text-gray-600 mb-12">Hear from our community members who have transformed their lives</p>
             <div className="grid md:grid-cols-3 gap-8">
               {testimonials.map((testimonial, index) => <TestimonialCard key={index} {...testimonial} />)}
             </div>
           </section>

           {/* <section id="cta" className="py-16 mt-8 relative overflow-hidden scroll-mt-16">
             <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-90" />
             <div className="relative container mx-auto px-4 text-center text-white transform hover:scale-105 transition-transform">
               <h2 className="text-3xl font-bold mb-4">Begin Your Wellness Journey Today</h2>
               <p className="text-xl mb-8 opacity-90">Take the first step towards lasting mental well-being</p>
               <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-110 hover:shadow-2xl transition-all">Get Started Now</button>
             </div>
           </section> */}

				<section id="cta" className="py-16 mt-8 relative overflow-hidden scroll-mt-16">
				{/* Gradient Background: White to Light Orange */}
				<div className="absolute inset-0 bg-gradient-to-r from-white to-orange-200 opacity-90" />

				{/* Content Section */}
				<div className="relative container mx-auto px-6 text-center text-gray-900 transform hover:scale-105 transition-transform">
					<h2 className="text-4xl font-bold mb-6 text-orange-700 drop-shadow-md">Begin Your Wellness Journey Today</h2>
					<p className="text-lg mb-8 opacity-80 text-gray-700">
					Take the first step towards lasting mental well-being.
					</p>
					
					{/* CTA Button */}
					<button className="bg-orange-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transform hover:scale-110 hover:shadow-xl transition-all duration-300">
					Get Started Now
					</button>
				</div>
				</section>


          {/* Footer */}
          <footer className="container mx-auto px-4 py-8 text-center text-gray-600 border-t border-orange-100">
            © 2025 MindEase. All rights reserved.
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
