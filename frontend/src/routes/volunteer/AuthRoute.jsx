import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children}) => {
    const {isVolAuthenticated} =useSelector(state=>state.volunteer)

    return !isVolAuthenticated?children:<Navigate to="/retailerDashboard"/>;
}

export default AuthRoute