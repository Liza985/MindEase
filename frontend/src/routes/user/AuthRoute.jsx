import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children}) => {
    const {isAuthenticated} = useSelector(state => state.user)
    const {isVolAuthenticated} = useSelector(state => state.volunteer)
    const {isAdminAuthenticated} = useSelector(state => state.user)

    if (isAuthenticated) {
        return <Navigate to="/"/>
    }
    if (isVolAuthenticated) {
        return <Navigate to="/volunteer/dashboard"/>
    }
    if (isAdminAuthenticated) {
        return <Navigate to="/admin"/>
    }
    return children;
}

export default AuthRoute