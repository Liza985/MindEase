
import Admin from "./routes/admin/Admin";
import User from "./routes/user/User";
import Volunteer from "./routes/volunteer/Volunteer";

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
