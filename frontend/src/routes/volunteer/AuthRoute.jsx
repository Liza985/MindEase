import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children}) => {
    const {isVolAuthenticated} = useSelector(state => state.volunteer)
    const {isAuthenticated} = useSelector(state => state.user)
    const {isAdminAuthenticated} = useSelector(state => state.user)

    if (isVolAuthenticated) {
        return <Navigate to="/volunteer/dashboard"/>
    }
    if (isAuthenticated) {
        return <Navigate to="/"/>
    }
    if (isAdminAuthenticated) {
        return <Navigate to="/admin"/>
    }
    return children;
}

export default AuthRoute