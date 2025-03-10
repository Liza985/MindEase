import { Route, Routes } from "react-router-dom";

import Blog from "../../pages/volunteer/Blog";
import Chat from "../../pages/volunteer/Chat";
import Dashboard from "../../pages/volunteer/Dashboard";
import LandingPage from "../../pages/volunteer/LandingPage";
import Request from "../../pages/volunteer/Request";
import ChatbotAssistant from "../../pages/volunteer/ChatAssistant";
import Auth from "../../pages/volunteer/Auth";
import VerifyOtp from "../../pages/volunteer/VerifyOtp";
import LoginOtp from "../../pages/volunteer/LoginOtp";

const Volunteer = () => {
	return (
		<>
			<Routes>
				<Route path="/volunteer/login" element={<Auth />} />
				<Route path="/volunteer/register" element={<Auth />} />
				<Route path="/volunteer/verify/:id" element={<VerifyOtp />} />
				<Route path="/volunteer/login/:id" element={<LoginOtp />} />
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
						<ChatbotAssistant />
						//</AuthRoute>
					}
				/>
			</Routes>
		</>
	);
};

export default Volunteer;
