// import React from "react";
// import VolHeader from "../../components/VolHeader";
// import { buildTheme } from "@botpress/webchat-generator";
// import { Webchat } from "@botpress/webchat";
// import { WebchatProvider } from "@botpress/webchat";
// import { getClient } from "@botpress/webchat";

// // Customize your chatbot theme
// const { theme, style } = buildTheme({
//   themeName: "prism",
//   themeColor: "#634433",
// });

// // Add your Botpress Client ID here ⬇️
// const clientId = import.meta.env.VITE_VOL_CLIENT_ID;
// const client = getClient({ clientId });

// const ChatbotAssistant = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
//       <VolHeader title="AI Assistant" />

//       {/* Welcome banner */}
//       <header className="bg-white shadow-sm border-b border-gray-200 p-6 text-center w-full mt-1">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-2xl font-bold text-orange-600">
//             Welcome to MindEaseConnect Assistant
//           </h1>
//         </div>
//       </header>

//       {/* Chatbot Section */}
//       <main className="flex-grow flex justify-center items-center p-4 md:p-8">
//         <div className="w-full max-w-4xl h-96 md:h-[600px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
//           <style>{style}</style>
//           <WebchatProvider theme={theme} client={client}>
//             <Webchat />
//           </WebchatProvider>
//         </div>
//       </main>

//       {/* Support info */}
//       <div className="bg-white p-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h3 className="text-xl font-semibold mb-4">How MindEaseConnect Helps</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="p-4 bg-orange-50 rounded-lg">
//               <h4 className="font-medium mb-2">24/7 Support</h4>
//               <p>Connect with trained volunteers anytime, day or night</p>
//             </div>
//             <div className="p-4 bg-orange-50 rounded-lg">
//               <h4 className="font-medium mb-2">Confidential</h4>
//               <p>All conversations are private and secure</p>
//             </div>
//             <div className="p-4 bg-orange-50 rounded-lg">
//               <h4 className="font-medium mb-2">Resource Connection</h4>
//               <p>Get connected to helpful community resources</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-white shadow-sm border-t border-gray-200 p-4 text-center text-gray-600">
//         <p className="text-sm">&copy; 2025 MindEaseConnect. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default ChatbotAssistant;

import React from "react";
import VolHeader from "../../components/VolHeader";
import { buildTheme } from "@botpress/webchat-generator";
import { Webchat } from "@botpress/webchat"; // Only import Webchat now
import { getClient } from "@botpress/webchat";

// Customize your chatbot theme
const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#634433",
});

// Add your Botpress Client ID here ⬇️
const clientId = import.meta.env.VITE_VOL_CLIENT_ID;
const client = getClient({ clientId });

const ChatbotAssistant = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <VolHeader title="AI Assistant" />

      {/* Welcome banner */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-6 text-center w-full mt-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-orange-600">
            Welcome to MindEaseConnect Assistant
          </h1>
        </div>
      </header>

      {/* Chatbot Section */}
      <main className="flex-grow flex justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-4xl h-96 md:h-[600px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
          <style>{style}</style>
          {/* Directly use Webchat component */}
          <Webchat theme={theme} client={client} />
        </div>
      </main>

      {/* Support info */}
      <div className="bg-white p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">How MindEaseConnect Helps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium mb-2">24/7 Support</h4>
              <p>Connect with trained volunteers anytime, day or night</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium mb-2">Confidential</h4>
              <p>All conversations are private and secure</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium mb-2">Resource Connection</h4>
              <p>Get connected to helpful community resources</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-sm border-t border-gray-200 p-4 text-center text-gray-600">
        <p className="text-sm">&copy; 2025 MindEaseConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ChatbotAssistant;
