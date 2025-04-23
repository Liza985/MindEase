import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { SocketProvider } from "./context/SocketContext";
import store from "./redux/store";
import Admin from "./routes/admin/Admin";
import User from "./routes/user/User";
import Volunteer from "./routes/volunteer/Volunteer";

function App() {
	return (
		<Provider store={store}>
			<SocketProvider>
				<ToastContainer />
				<Volunteer />
				<User />
				<Admin />
			</SocketProvider>
		</Provider>
	);
}

export default App;
