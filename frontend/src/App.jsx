import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
// import { path } from 'path';
import Home from './pages/Home';
import HowItWorks from "./pages/HowItWorks";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Auth />} />
				<Route path="/signup" element={<Auth />} />
				<Route path="/how-it-works" element={<HowItWorks/>} />
			</Routes>
		</>
	);
}

export default App;
