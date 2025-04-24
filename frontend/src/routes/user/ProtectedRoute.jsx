import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, error } = useSelector((state) => state.user);
    const { isVolAuthenticated } = useSelector((state) => state.volunteer);
    const { isAdminAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error, toastOptions);
            dispatch({ type: "CLEAR_USER_ERROR" });
        }
    }, [error]);

    if (isAuthenticated) {
        return children;
    }
    if (isVolAuthenticated) {
        return <Navigate to="/volunteer/dashboard" />;
    }
    if (isAdminAuthenticated) {
        return <Navigate to="/admin" />;
    }
    return <Navigate to="/login" />;
};

export default ProtectedRoute;