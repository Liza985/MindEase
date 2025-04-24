import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const { isVolAuthenticated, error } = useSelector((state) => state.volunteer);
    const { isAdminAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error, toastOptions);
            dispatch({ type: "CLEAR_VOLUNTEER_ERROR" });
        }
    }, [error]);

    if (isVolAuthenticated) {
        return children;
    }
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }
    if (isAdminAuthenticated) {
        return <Navigate to="/admin" />;
    }
    return <Navigate to="/volunteer/login" />;
};

export default ProtectedRoute;