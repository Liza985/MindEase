import React from "react";
import { Route, Routes } from "react-router-dom";

import Blog from "../../pages/volunteer/Blog";
import Chat from "../../pages/volunteer/Chat";
import Dashboard from "../../pages/volunteer/Dashboard";
import LandingPage from "../../pages/volunteer/LandingPage";
import Request from "../../pages/volunteer/Request";
import ChatbotAssistant from "../../pages/volunteer/ChatAssistant";

const Volunteer = () => {
	return (
		<>
			<Routes>
				<Route
					path="/connect"
					element={
						// <AuthRoute>
						<LandingPage />
						//</AuthRoute>
					}
				/>
				<Route
					path="/volunteerDashboard"
					element={
						//<AuthRoute>
						<Dashboard />
						//</AuthRoute>
					}
				/>
				<Route
					path="/requests"
					element={
						//<AuthRoute>
						<Request />
						//</AuthRoute>
					}
				/>
				<Route
					path="/chat"
					element={
						//<AuthRoute>
						<Chat />
						//</AuthRoute>
					}
				/>
				<Route
					path="/article"
					element={
						//<AuthRoute>
						<Blog />
						//</AuthRoute>
					}
				/>
				<Route
					path="/ai"
					element={
						//<AuthRoute>
						<ChatbotAssistant/>
						//</AuthRoute>
					}
				/>
			</Routes>
		</>
	);
};

export default Volunteer;
