import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../../pages/Auth";
import Blogs from "../../pages/user/Blogs";
import CounselingPage from "../../pages/user/Counsellors";
import Home from "../../pages/user/Home";
import HowItWorks from "../../pages/user/HowItWorks";
import WellnessHub from "../../pages/user/WellnesaHub";
import MindeaseForm from "../../pages/user/MindeaseForm";

const User = () => {
	return (
		<>
			<Routes>
				<Route
					path="/login"
					element={
						//<AuthRoute>
						<Auth />
						///</AuthRoute>
					}
				/>

				<Route
					path="/register"
					element={
						//<AuthRoute>
						<Auth />
						//</AuthRoute>
					}
				/>
				<Route path="/" element={<Home />} />
				<Route
					path="/how-it-works"
					element={
						// <ProtectedRoute>
						<HowItWorks />
						// </ProtectedRoute>
					}
				/>
				<Route
					path="/wellness-hub"
					element={
						// <ProtectedRoute>
						<WellnessHub />
						// </ProtectedRoute>
					}
				/>
				<Route
					path="/counselling"
					element={
						// <ProtectedRoute>
						<CounselingPage />
						// </ProtectedRoute>
					}
				/>
				<Route
					path="/blogs"
					element={
						// <ProtectedRoute>
						<Blogs />
						// </ProtectedRoute>
					}
				/>
				<Route
					path="/mind-ease"
					element={
						// <ProtectedRoute>
						<MindeaseForm />
						// </ProtectedRoute>
					}
				/>				
			</Routes>
		</>
	);
};

export default User;
