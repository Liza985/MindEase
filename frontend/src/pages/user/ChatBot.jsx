import React from "react";
import Header from "../../components/Header";

const ChatbotPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Header />
      
      {/* Added margin-top to create space below the Header component */}
      <header className="bg-orange-200 text-gray-800 p-4 text-center w-full shadow-md z-10 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Welcome to MindEase Assistant</h1>
          <p className="text-lg opacity-80">Your virtual assistant is here to help you 24/7!</p>
        </div>
      </header>

      {/* Chatbot Embed Section */}
      <main className="flex-grow flex justify-center items-center p-6 md:p-10">
        <div className="w-full max-w-4xl h-96 md:h-[600px] bg-white rounded-lg shadow-md">
          {/* Your chatbot embed code will go here */}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 MindEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ChatbotPage;