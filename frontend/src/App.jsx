import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
// import { path } from 'path';
import Home from './pages/Home';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Auth />} />
				<Route path="/signup" element={<Auth />} />
			</Routes>
		</>
	);
}

export default App;
