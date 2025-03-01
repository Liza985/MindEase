import { Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/admin/admin";
import User from "./routes/user/User";
import Volunteer from "./routes/volunteer/Volunteer";

function App() {
	return (
		<>
			<User />
			<Volunteer />
			<Routes>
				<Route path="/admin" element={<AdminDashboard />} />
			</Routes>
		</>
	);
}

export default App;
