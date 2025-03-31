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
import NewPost from "../../pages/volunteer/NewPost";
import BlogDetails from "../../pages/volunteer/BlogDetails";
import UpdateBlog from "../../pages/volunteer/updateBlog";
import CounselorRequests from "../../pages/user/counselorRequest";
import Profile from "../../pages/volunteer/Profile";
import Reviews from "../../pages/volunteer/Reviews";

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
					path="/volunteer/Dashboard"
					element={
						//<AuthRoute>
						<Dashboard />
						//</AuthRoute>
					}
				/>
				<Route
					path="/volunteer/requests"
					element={
						//<AuthRoute>
						<Request />
						//</AuthRoute>
					}
				/>
				<Route
					path="/newPost"
					element={
						//<AuthRoute>
						<NewPost />
						//</AuthRoute>
					}
				/>
				<Route
					path="/volunteer/chat"
					element={
						//<AuthRoute>
						<Chat />
						//</AuthRoute>
					}
				/>
				<Route
					path="/volunteer/article"
					element={
						//<AuthRoute>
						<Blog />
						//</AuthRoute>
					}
				/>

				<Route
					path="/volunteer/article/:id"
					element={
						//<AuthRoute>
						<BlogDetails />
						//</AuthRoute>
					}
				/>
				<Route
					path="/volunteer/article/update/:id"
					element={
						//<AuthRoute>
						<UpdateBlog />
						//</AuthRoute>
					}
				/>
				<Route
					path="/volunteer/ai"
					element={
						//<AuthRoute>
						<ChatbotAssistant />
						//</AuthRoute>
					}
				/>
				<Route path="/volunteer/profile" element={<Profile />} />
				<Route path="/volunteer/reviews" element={<Reviews />} />
			</Routes>
		</>
	);
};

export default Volunteer;
