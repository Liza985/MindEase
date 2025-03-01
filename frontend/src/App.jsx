import { Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/admin/admin";
import User from "./routes/user/User";
import Volunteer from "./routes/volunteer/Volunteer";
import Admin from "./routes/admin/Admin";

function App() {
	return (
		<>
			<User />
			<Volunteer />
			<Admin/>
			
		</>
	);
}

export default App;
