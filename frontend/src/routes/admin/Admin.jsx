import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import AdminLogin from "../../pages/admin/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import Chats from "./../../pages/admin/Chats";
import Users from "./../../pages/admin/Users";
import Content from "./../../pages/admin/Content";
import Volunteers from "./../../pages/admin/Volunteers";
import Setting from "./../../pages/admin/Setting";
import Feedback from "../../pages/admin/Feedback";

const Admin = () => {
	return (
		<>
			<Routes>
				<Route
					path="/admin/login"
					element={
						//<AuthRoute>
						<AdminLogin />
						//</AuthRoute>
					}
				/>
				<Route
					path="/admin"
					element={
						//<ProtectedRoute>
						<AdminDashboard />
						//</ProtectedRoute>
					}
				/>

				<Route
					path="/admin/chats"
					element={
						//<ProtectedRoute>
						<Chats />
						//</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/users"
					element={
						//<ProtectedRoute>
						<Users />
						//</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/content"
					element={
						//<ProtectedRoute>
						<Content />
						//</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/volunteers"
					element={
						//<ProtectedRoute>
						<Volunteers />
						//</ProtectedRoute>
					}
				/>

				<Route
					path="/admin/settings"
					element={
						//<ProtectedRoute>
						<Setting />
						//</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/feedback"
					element={
						//<ProtectedRoute>
						<Feedback />
						//</ProtectedRoute>
					}
				/>				
			</Routes>
		</>
	);
};

export default Admin;
