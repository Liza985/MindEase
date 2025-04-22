import { Route, Routes } from "react-router-dom";

import AnalysisPage from "../../pages/user/AnalysisPage";
import Auth from "../../pages/user/Auth";
import Blogs from "../../pages/user/Blogs";
import CounselingPage from "../../pages/user/Counsellors";
import ForgotPassword from "../../pages/user/ForgotPassword";
import Home from "../../pages/user/Home";
import HowItWorks from "../../pages/user/HowItWorks";
import MindeaseForm from "../../pages/user/MindeaseForm";
import PricingPage from "../../pages/user/Plans&Pricing";
import ResourceDetail from "../../pages/user/ResourceDetail";
import VerifyOtp from "../../pages/user/VerifyOtp";
import WellnessHub from "../../pages/user/WellnesaHub";
import BlogDetail from "../../pages/user/BlogDetail";
import CounselorRequests from "../../pages/user/counselorRequest";
import CounselorChat from "../../pages/user/CounselorChat";
import Feedback from "../../pages/user/Feedback";
import Profile from "../../pages/user/Profile";
import UserChat from "../../pages/user/UserChat";
import AuthRoute from "./AuthRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../../redux/Actions/userAction";
import ProtectedRoute from "./ProtectedRoute";
import ChatbotPage from './../../pages/user/ChatBot';

const User = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, loading, error } = useSelector(
		(state) => state.user,
	);

	useEffect(() => {
			dispatch(getUserProfile());
	}, []); 

	return (
		<>
			<Routes>
				<Route
					path="/login"
					element={
						<AuthRoute>
							<Auth />
						</AuthRoute>
					}
				/>

				<Route
					path="/register"
					element={
						<AuthRoute>
							<Auth />
						</AuthRoute>
					}
				/>
				<Route
					path="/verify/:id"
					element={
						<AuthRoute>
							<VerifyOtp />
						</AuthRoute>
					}
				/>
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/forgot-password/:id" element={<ForgotPassword />} />
				<Route path="/changepassword/:id" element={<ForgotPassword />} />
				<Route path="/" element={<Home />} />
				<Route
					path="/how-it-works"
					element={
						<ProtectedRoute>
						<HowItWorks />
						 </ProtectedRoute>
					}
				/>
				<Route
					path="/wellness-hub"
					element={
						<ProtectedRoute>
						<WellnessHub />
						 </ProtectedRoute>
					}
				/>
				<Route
					path="/counselling"
					element={
						 <ProtectedRoute>
						<CounselingPage />
						 </ProtectedRoute>
					}
				/>
				<Route
					path="/blogs"
					element={
						<ProtectedRoute>
						<Blogs />
						 </ProtectedRoute>
					}
				/>
				<Route
					path="/survey"
					element={
						 <ProtectedRoute>
						<MindeaseForm />
						 </ProtectedRoute>
					}
				/>
				<Route path="/counselor-requests" element={<CounselorRequests />} />
				<Route path="/counselor-chat/:chatId" element={<CounselorChat />} />
				<Route path="/blog/:id" element={<BlogDetail />} />
				<Route
					path="/user-chat"
					element={
						//  <ProtectedRoute>
						<UserChat />
						//  </ProtectedRoute>
					}
				/>
				<Route
					path="/plans&pricing"
					element={
						 <ProtectedRoute>
						<PricingPage />
						 </ProtectedRoute>
					}
				/>
				<Route path="/resource/:title" element={<ResourceDetail />} />
				<Route
					path="/analysis"
					element={
						 <ProtectedRoute>
						<AnalysisPage />
						 </ProtectedRoute>
					}
				/>
				<Route path="/feedback" element={<Feedback />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/aichat" element={<ChatbotPage/>}/>
			</Routes>
		</>
	);
};

export default User;
