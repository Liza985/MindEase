import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Auth from "../../pages/volunteer/Auth";
import Blog from "../../pages/volunteer/Blog";
import BlogDetails from "../../pages/volunteer/BlogDetails";
import Chat from "../../pages/volunteer/Chat";
import ChatbotAssistant from "../../pages/volunteer/ChatAssistant";
import Dashboard from "../../pages/volunteer/Dashboard";
import LandingPage from "../../pages/volunteer/LandingPage";
import LoginOtp from "../../pages/volunteer/LoginOtp";
import NewPost from "../../pages/volunteer/NewPost";
import Profile from "../../pages/volunteer/Profile";
import Request from "../../pages/volunteer/Request";
import Reviews from "../../pages/volunteer/Reviews";
import UpdateBlog from "../../pages/volunteer/updateBlog";
import VerifyOtp from "../../pages/volunteer/VerifyOtp";
import { getVolunteerProfile } from "../../redux/Actions/volunteerAction";
import AuthRoute from "../user/AuthRoute";
import ProtectedRoute from "./ProtectedRoute";

const Volunteer = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getVolunteerProfile());
	},[]);
	return (
		<>
			<Routes>
				<Route
					path="/volunteer/login"
					element={
						<AuthRoute>
							<Auth />
						</AuthRoute>
					}
				/>
				<Route
					path="/volunteer/register"
					element={
						<AuthRoute>
							<Auth />
						</AuthRoute>
					}
				/>
				<Route
					path="/volunteer/verify/:id"
					element={
						<AuthRoute>
							<VerifyOtp />
						</AuthRoute>
					}
				/>
				<Route
					path="/volunteer/login/:id"
					element={
						<AuthRoute>
							<LoginOtp />
						</AuthRoute>
					}
				/>
				<Route
					path="/connect"
					element={
						<AuthRoute>
							<LandingPage />
						</AuthRoute>
					}
				/>
				<Route
					path="/volunteer/Dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/volunteer/requests"
					element={
						<ProtectedRoute>
							<Request />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/newPost"
					element={
						<ProtectedRoute>
							<NewPost />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/volunteer/chat"
					element={
						<ProtectedRoute>
							<Chat />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/volunteer/article"
					element={
						<ProtectedRoute>
							<Blog />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/volunteer/article/:id"
					element={
						<ProtectedRoute>
							<BlogDetails />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/volunteer/article/update/:id"
					element={
						<ProtectedRoute>
							<UpdateBlog />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/volunteer/ai"
					element={
						<ProtectedRoute>
							<ChatbotAssistant />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/volunteer/profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/volunteer/reviews"
					element={
						<ProtectedRoute>
							<Reviews />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
};

export default Volunteer;
