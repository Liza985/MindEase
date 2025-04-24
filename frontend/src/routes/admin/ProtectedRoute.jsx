import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

const ProtectedRoute = ({ children }) => {
    const { isadminAuthenticated, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error, toastOptions);
            dispatch({ type: "clearError" });
        }
    }, [error]);

    if (isadminAuthenticated) {
        return children;
    }
    return <Navigate to="/admin/login" />;
};

export default ProtectedRoute;