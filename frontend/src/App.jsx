import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
// import { path } from 'path';
import Home from './pages/Home';
import HowItWorks from "./pages/HowItWorks";
import WellnessHub from "./pages/WellnesaHub";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Auth />} />
				<Route path="/register" element={<Auth />} />
				<Route path="/how-it-works" element={<HowItWorks/>} />
				<Route path="/wellness-hub" element={<WellnessHub/>}/>
				
			</Routes>
		</>
	);
}

export default App;
