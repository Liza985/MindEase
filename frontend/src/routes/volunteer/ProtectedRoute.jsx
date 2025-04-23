import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, error } = useSelector((state) => state.user);
	const {isVolAuthenticated}=useSelector(state=>state.volunteer);
	const dispatch = useDispatch();
	useEffect(() => {
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_AUTH_ERROR" });
		}
	}, [error]);

	return (
		isVolAuthenticated ? children : isAuthenticated ? <Navigate to="/"/>:<Navigate to="/login"/>
	)
};

export default ProtectedRoute;