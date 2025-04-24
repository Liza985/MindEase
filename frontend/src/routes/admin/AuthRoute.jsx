import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children}) => {
    const { isadminAuthenticated } = useSelector(state => state.user);

    if (isadminAuthenticated) {
        return <Navigate to="/admin"/>
    }
    return children;
}

export default AuthRoute