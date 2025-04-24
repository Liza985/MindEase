import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children}) => {
    const {isAuthenticated} = useSelector(state => state.user)
    const {isVolAuthenticated} = useSelector(state => state.volunteer)

    if (isAuthenticated) {
        return <Navigate to="/"/>
    }
    if (isVolAuthenticated) {
        return <Navigate to="/volunteer/dashboard"/>
    }
    return children;
}

export default AuthRoute