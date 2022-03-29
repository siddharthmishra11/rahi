import React,{useContext} from 'react'
import { Navigate ,Outlet} from 'react-router-dom';
import {AuthContext} from '../Context/AuthContext'
function PrivateRoute({redirectPath = "/login"}) {
    const {user} = useContext(AuthContext);
    if(!user){
        return <Navigate to={redirectPath} replace />
    }
    return  <Outlet/> 
}

export default PrivateRoute
